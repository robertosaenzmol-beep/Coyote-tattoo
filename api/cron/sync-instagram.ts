import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

interface InstagramPost {
  id: string;
  media_url: string;
  media_type: string;
  thumbnail_url?: string;
  timestamp: string;
  permalink: string;
}

async function fetchInstagramPosts(limit: number = 120): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return [];
  }

  const fields = 'id,media_type,media_url,thumbnail_url,timestamp,permalink';
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
    const posts = await fetchInstagramPosts(120);

    if (posts.length > 0) {
      await kv.set('instagram_posts', posts, { ex: 90000 });
    }

    return res.status(200).json({
      synced: posts.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Cron sync-instagram error:', error);
    return res.status(500).json({ error: message });
  }
}
