import fs from 'fs/promises';
import path from 'path';

// src/index.tsx
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/index.tsx
function siteUrl(ctx) {
  const baseUrl = ctx.cfg.configuration.baseUrl ?? "";
  return `https://${baseUrl.replace(/\/+$/, "")}`;
}
function canonicalPath(slug) {
  if (slug === "index") return "/";
  if (slug.endsWith("/index")) return `/${slug.slice(0, -"index".length)}`;
  return `/${slug}`;
}
var headOwner = null;
var toJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");
function Seo(opts) {
  const person = opts?.person;
  const self = {};
  return {
    name: "Seo",
    // nothing to transform; this plugin only adds tags to <head>
    htmlPlugins() {
      return [];
    },
    externalResources(ctx) {
      headOwner ??= self;
      if (headOwner !== self) return {};
      const site = siteUrl(ctx);
      return {
        additionalHead: [
          (page) => {
            if (page.slug !== "index" || !opts?.googleSiteVerification) return null;
            return /* @__PURE__ */ u2("meta", { name: "google-site-verification", content: opts.googleSiteVerification });
          },
          (page) => {
            if (!page.slug || page.slug === "404") return null;
            return /* @__PURE__ */ u2("link", { rel: "canonical", href: site + canonicalPath(page.slug) });
          },
          (page) => {
            if (page.slug !== "index" || !person) return null;
            const data = {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${site}/#person`,
                  name: person.name,
                  url: `${site}/`,
                  ...person.jobTitle && { jobTitle: person.jobTitle },
                  ...person.worksFor && {
                    worksFor: { "@type": "Organization", name: person.worksFor }
                  },
                  ...person.location && {
                    address: { "@type": "PostalAddress", addressLocality: person.location }
                  },
                  ...person.email && { email: person.email },
                  ...person.sameAs?.length && { sameAs: person.sameAs }
                },
                {
                  "@type": "WebSite",
                  "@id": `${site}/#website`,
                  url: `${site}/`,
                  name: person.name,
                  author: { "@id": `${site}/#person` }
                }
              ]
            };
            return /* @__PURE__ */ u2(
              "script",
              {
                type: "application/ld+json",
                dangerouslySetInnerHTML: { __html: toJsonLd(data) }
              }
            );
          }
        ]
      };
    },
    // robots.txt pointing crawlers at the sitemap
    async emit(ctx) {
      const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl(ctx)}/sitemap.xml
`;
      const file = path.join(ctx.argv.output, "robots.txt");
      await fs.writeFile(file, robots);
      return [file];
    },
    async *partialEmit() {
    }
  };
}

export { Seo as default };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map