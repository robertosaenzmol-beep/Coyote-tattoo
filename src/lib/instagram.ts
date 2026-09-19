export interface InstagramPost {
  id: string;
  media_url: string;
  media_type: string;
  thumbnail_url?: string;
  timestamp: string;
  permalink: string;
  caption?: string;
}

async function getToken(): Promise<string | null> {
  try {
    const { kv } = await import('@vercel/kv');
    const kvToken = await kv.get<string>('instagram_access_token');
    if (kvToken) return kvToken;
  } catch { /* KV unavailable, fall back to env */ }
  return import.meta.env.INSTAGRAM_ACCESS_TOKEN || null;
}

export async function fetchInstagramPosts(limit: number = 120): Promise<InstagramPost[]> {
  const token = await getToken();
  const userId = import.meta.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return [];
  }

  try {
    const fields = 'id,media_type,media_url,thumbnail_url,timestamp,permalink,caption';
    const fetchLimit = Math.min(limit * 2, 200);
    const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=${fetchLimit}&access_token=${token}`;

    const response = await fetch(url);

    if (!response.ok) {
      const body = await response.text();
      console.error(`Instagram API error ${response.status}: ${body}`);
      return [];
    }

    const data = await response.json();
    const posts: InstagramPost[] = data.data ?? [];

    return posts
      .filter((post) => post.media_type === 'IMAGE')
      .filter((post) => post.caption?.toLowerCase().includes('#web'))
      .slice(0, limit);
  } catch (error) {
    console.error('Instagram fetch error:', error);
    return [];
  }
}

export async function getCachedPosts(limit: number = 120): Promise<InstagramPost[]> {
  try {
    const { kv } = await import('@vercel/kv');
    const cached = await kv.get<InstagramPost[]>('instagram_posts');

    if (cached && cached.length > 0) {
      return cached.slice(0, limit);
    }

    return await fetchInstagramPosts(limit);
  } catch {
    return await fetchInstagramPosts(limit);
  }
}
