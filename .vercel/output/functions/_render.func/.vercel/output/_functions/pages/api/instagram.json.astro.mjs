import { g as getCachedPosts } from '../../chunks/instagram_Ct0KaW50.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async () => {
  const posts = await getCachedPosts(120);
  return new Response(
    JSON.stringify({
      posts,
      source: posts.length > 0 ? "instagram" : "empty",
      count: posts.length
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400"
      }
    }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
