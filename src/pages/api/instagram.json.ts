import type { APIRoute } from 'astro';
import { getCachedPosts } from '../../lib/instagram';

export const prerender = false;

export const GET: APIRoute = async () => {
  const posts = await getCachedPosts(120);

  return new Response(
    JSON.stringify({
      posts,
      source: posts.length > 0 ? 'instagram' : 'empty',
      count: posts.length,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    },
  );
};
