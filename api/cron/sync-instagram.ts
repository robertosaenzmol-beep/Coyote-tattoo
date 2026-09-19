import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

interface InstagramPost {
  id: string;
  media_url: string;
  media_type: string;
  thumbnail_url?: string;
  timestamp: string;
  permalink: string;
  caption?: string;
}

const KV_TOKEN_KEY = 'instagram_access_token';
const KV_TOKEN_EXPIRES_KEY = 'instagram_token_expires_at';
const TOKEN_TTL_DAYS = 55; // Refresh margin: token lasts 60d, we store for 55d

async function getToken(): Promise<string | null> {
  const kvToken = await kv.get<string>(KV_TOKEN_KEY);
  return kvToken || process.env.INSTAGRAM_ACCESS_TOKEN || null;
}

async function getTokenExpiresAt(): Promise<string | null> {
  return await kv.get<string>(KV_TOKEN_EXPIRES_KEY);
}

interface RefreshResult {
  refreshed: boolean;
  token: string;
  expiresAt: string | null;
  skipped?: string;
  error?: string;
}

async function tryRefreshToken(currentToken: string): Promise<RefreshResult> {
  const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`;

  let res: Response;
  try {
    res = await fetch(url);
  } catch (err) {
    return {
      refreshed: false,
      token: currentToken,
      expiresAt: await getTokenExpiresAt(),
      error: `Network error: ${err instanceof Error ? err.message : String(err)}`,
    };
  }

  if (!res.ok) {
    const body = await res.text();

    // Meta returns 400 if token is < 24h old — expected on first run
    const is24hRule = res.status === 400 && body.includes('long-lived');
    return {
      refreshed: false,
      token: currentToken,
      expiresAt: await getTokenExpiresAt(),
      skipped: is24hRule ? 'Token is less than 24h old (Meta 24h rule) — will refresh tomorrow' : undefined,
      error: is24hRule ? undefined : `Refresh failed ${res.status}: ${body}`,
    };
  }

  const data = await res.json();
  const newToken: string | undefined = data.access_token;
  const expiresIn: number | undefined = data.expires_in; // seconds

  // Only write to KV if we actually got a valid token back
  if (!newToken || typeof newToken !== 'string' || newToken.length < 10) {
    return {
      refreshed: false,
      token: currentToken,
      expiresAt: await getTokenExpiresAt(),
      error: 'Refresh response missing valid access_token — kept current token',
    };
  }

  const expiresAt = expiresIn
    ? new Date(Date.now() + expiresIn * 1000).toISOString()
    : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(); // assume 60d

  await kv.set(KV_TOKEN_KEY, newToken, { ex: TOKEN_TTL_DAYS * 24 * 60 * 60 });
  await kv.set(KV_TOKEN_EXPIRES_KEY, expiresAt, { ex: TOKEN_TTL_DAYS * 24 * 60 * 60 });

  return { refreshed: true, token: newToken, expiresAt };
}

async function fetchInstagramPosts(token: string, limit: number = 120): Promise<InstagramPost[]> {
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!userId) return [];

  const fields = 'id,media_type,media_url,thumbnail_url,timestamp,permalink,caption';
  const fetchLimit = Math.min(limit * 2, 200);
  const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=${fetchLimit}&access_token=${token}`;

  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Instagram API error ${response.status}: ${body}`);
  }

  const data = await response.json();
  const posts: InstagramPost[] = data.data ?? [];

  return posts
    .filter((post) => post.media_type === 'IMAGE')
    .filter((post) => post.caption?.toLowerCase().includes('#web'))
    .slice(0, limit);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret) {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${cronSecret}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  try {
    const token = await getToken();
    if (!token) {
      console.log('Cron: no Instagram token found in KV or env vars');
      return res.status(200).json({ synced: 0, reason: 'no_token' });
    }

    // Attempt token refresh (never overwrites KV on failure)
    const refresh = await tryRefreshToken(token);

    if (refresh.refreshed) {
      console.log(`Cron: token refreshed, expires ${refresh.expiresAt}`);
    } else if (refresh.skipped) {
      console.log(`Cron: refresh skipped — ${refresh.skipped}`);
    } else if (refresh.error) {
      console.error(`Cron: refresh error — ${refresh.error}`);
    }

    // Sync posts using whichever token we have (refreshed or current)
    const posts = await fetchInstagramPosts(refresh.token, 120);

    if (posts.length > 0) {
      await kv.set('instagram_posts', posts, { ex: 90000 });
    }

    return res.status(200).json({
      synced: posts.length,
      token: {
        refreshed: refresh.refreshed,
        expiresAt: refresh.expiresAt,
        ...(refresh.skipped && { skipped: refresh.skipped }),
        ...(refresh.error && { error: refresh.error }),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Cron sync-instagram error:', error);
    return res.status(500).json({ error: message });
  }
}
