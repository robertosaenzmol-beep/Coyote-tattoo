async function fetchInstagramPosts(limit = 120) {
  {
    return [];
  }
}
async function getCachedPosts(limit = 120) {
  try {
    const { kv } = await import('@vercel/kv');
    const cached = await kv.get("instagram_posts");
    if (cached && cached.length > 0) {
      return cached.slice(0, limit);
    }
    return await fetchInstagramPosts(limit);
  } catch {
    return await fetchInstagramPosts(limit);
  }
}

export { getCachedPosts as g };
