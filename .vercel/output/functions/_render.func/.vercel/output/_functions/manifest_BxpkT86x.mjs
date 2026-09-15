import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_B_Xql679.mjs';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_DGgZnAoN.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/bachillerato/Desktop/CoyoteTattoo/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"aviso-legal/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/aviso-legal","isIndex":false,"type":"page","pattern":"^\\/aviso-legal\\/?$","segments":[[{"content":"aviso-legal","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/aviso-legal.astro","pathname":"/aviso-legal","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"contacto/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contacto","isIndex":false,"type":"page","pattern":"^\\/contacto\\/?$","segments":[[{"content":"contacto","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contacto.astro","pathname":"/contacto","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"cookies/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cookies","isIndex":false,"type":"page","pattern":"^\\/cookies\\/?$","segments":[[{"content":"cookies","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cookies.astro","pathname":"/cookies","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"galeria/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/galeria","isIndex":false,"type":"page","pattern":"^\\/galeria\\/?$","segments":[[{"content":"galeria","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/galeria.astro","pathname":"/galeria","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"marta/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/marta","isIndex":false,"type":"page","pattern":"^\\/marta\\/?$","segments":[[{"content":"marta","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/marta.astro","pathname":"/marta","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"privacidad/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacidad","isIndex":false,"type":"page","pattern":"^\\/privacidad\\/?$","segments":[[{"content":"privacidad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacidad.astro","pathname":"/privacidad","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/instagram.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/instagram\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"instagram.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/instagram.json.ts","pathname":"/api/instagram.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://coyote-tattoo.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/bachillerato/Desktop/CoyoteTattoo/src/pages/aviso-legal.astro",{"propagation":"none","containsHead":true}],["/Users/bachillerato/Desktop/CoyoteTattoo/src/pages/contacto.astro",{"propagation":"none","containsHead":true}],["/Users/bachillerato/Desktop/CoyoteTattoo/src/pages/cookies.astro",{"propagation":"none","containsHead":true}],["/Users/bachillerato/Desktop/CoyoteTattoo/src/pages/galeria.astro",{"propagation":"none","containsHead":true}],["/Users/bachillerato/Desktop/CoyoteTattoo/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/bachillerato/Desktop/CoyoteTattoo/src/pages/marta.astro",{"propagation":"none","containsHead":true}],["/Users/bachillerato/Desktop/CoyoteTattoo/src/pages/privacidad.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/api/instagram.json@_@ts":"pages/api/instagram.json.astro.mjs","\u0000@astro-page:src/pages/aviso-legal@_@astro":"pages/aviso-legal.astro.mjs","\u0000@astro-page:src/pages/contacto@_@astro":"pages/contacto.astro.mjs","\u0000@astro-page:src/pages/cookies@_@astro":"pages/cookies.astro.mjs","\u0000@astro-page:src/pages/galeria@_@astro":"pages/galeria.astro.mjs","\u0000@astro-page:src/pages/marta@_@astro":"pages/marta.astro.mjs","\u0000@astro-page:src/pages/privacidad@_@astro":"pages/privacidad.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/bachillerato/Desktop/CoyoteTattoo/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_BxpkT86x.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.DfcqZBzy.js","/astro/hoisted.js?q=1":"_astro/hoisted.Dk1wfaO2.js","/astro/hoisted.js?q=2":"_astro/hoisted.as0iTUaT.js","/astro/hoisted.js?q=4":"_astro/hoisted.CWEXAPTW.js","/astro/hoisted.js?q=3":"_astro/hoisted.CG2EEK9j.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/aviso-legal.C4ln1Y_d.css","/_astro/index.Fkl_o4lB.css","/favicon.svg","/robots.txt","/_astro/hoisted.CG2EEK9j.js","/_astro/hoisted.CWEXAPTW.js","/_astro/hoisted.DfcqZBzy.js","/_astro/hoisted.Dk1wfaO2.js","/_astro/hoisted.as0iTUaT.js","/admin/config.yml","/admin/index.html","/images/logo.webp","/images/marta-tattooing.webp","/images/marta-working.webp","/images/gallery/tattoo-01.webp","/images/gallery/tattoo-02.webp","/images/gallery/tattoo-03.webp","/images/gallery/tattoo-04.webp","/images/gallery/tattoo-05.webp","/images/gallery/tattoo-06.webp","/images/gallery/tattoo-07.webp","/images/gallery/tattoo-08.webp","/images/gallery/tattoo-09.webp","/images/gallery/tattoo-10.webp","/images/gallery/tattoo-11.webp","/images/gallery/tattoo-12.webp","/images/gallery/tattoo-13.webp","/images/gallery/tattoo-14.webp","/images/gallery/tattoo-15.webp","/images/gallery/tattoo-16.webp","/images/gallery/tattoo-17.webp","/images/gallery/tattoo-18.webp","/images/gallery/tattoo-19.webp","/images/gallery/tattoo-20.webp","/images/gallery/tattoo-21.webp","/images/gallery/tattoo-22.webp","/images/gallery/tattoo-23.webp","/images/gallery/tattoo-24.webp","/images/gallery/tattoo-25.webp","/images/gallery/tattoo-26.webp","/aviso-legal/index.html","/contacto/index.html","/cookies/index.html","/galeria/index.html","/marta/index.html","/privacidad/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"f44aFl+fQ/Wb/XPl8TnTu08qOCKWjjt5mOhQMi1m5Dw=","experimentalEnvGetSecretEnabled":false});

export { manifest };
