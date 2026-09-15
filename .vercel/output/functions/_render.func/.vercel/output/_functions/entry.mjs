import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CljoZK62.mjs';
import { manifest } from './manifest_BxpkT86x.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/instagram.json.astro.mjs');
const _page2 = () => import('./pages/aviso-legal.astro.mjs');
const _page3 = () => import('./pages/contacto.astro.mjs');
const _page4 = () => import('./pages/cookies.astro.mjs');
const _page5 = () => import('./pages/galeria.astro.mjs');
const _page6 = () => import('./pages/marta.astro.mjs');
const _page7 = () => import('./pages/privacidad.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/instagram.json.ts", _page1],
    ["src/pages/aviso-legal.astro", _page2],
    ["src/pages/contacto.astro", _page3],
    ["src/pages/cookies.astro", _page4],
    ["src/pages/galeria.astro", _page5],
    ["src/pages/marta.astro", _page6],
    ["src/pages/privacidad.astro", _page7],
    ["src/pages/index.astro", _page8]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "489c47d8-1f44-4829-a74f-f018f03bc1af",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
