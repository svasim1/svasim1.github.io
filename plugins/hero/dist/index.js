// src/components/styles/hero.scss
var hero_default = 'body[data-slug=index] .article-title,\nbody[data-slug=index] .page-header .content-meta,\nbody[data-slug=index] .page-header .tags {\n  display: none;\n}\n\n.hero {\n  position: relative;\n  padding: 2.5rem 0 2.75rem;\n  margin-bottom: 1.5rem;\n  border-bottom: 1px solid var(--lightgray);\n}\n.hero::before {\n  content: "";\n  position: absolute;\n  top: 0.5rem;\n  left: -3rem;\n  width: 22rem;\n  height: 14rem;\n  background: radial-gradient(closest-side, var(--highlight), transparent);\n  filter: blur(8px);\n  pointer-events: none;\n  z-index: -1;\n}\n.hero > * {\n  animation: hero-rise 0.6s ease-out both;\n}\n.hero > :nth-child(2) {\n  animation-delay: 0.08s;\n}\n.hero > :nth-child(3) {\n  animation-delay: 0.16s;\n}\n.hero > :nth-child(4) {\n  animation-delay: 0.24s;\n}\n.hero > :nth-child(5) {\n  animation-delay: 0.32s;\n}\n\n.hero-kicker {\n  margin: 0 0 0.5rem;\n  color: var(--secondary);\n  font-family: var(--headerFont);\n  font-weight: 600;\n  font-size: 1rem;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.hero-name {\n  margin: 0;\n  font-size: clamp(2.6rem, 7vw, 4.25rem);\n  line-height: 1.02;\n  letter-spacing: -0.03em;\n  color: var(--dark);\n}\n\n.hero-tagline {\n  max-width: 34rem;\n  margin: 1.1rem 0 0;\n  font-size: 1.2rem;\n  line-height: 1.55;\n  color: var(--darkgray);\n}\n\n.hero-location {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  margin: 0.9rem 0 0;\n  font-size: 0.95rem;\n  color: var(--gray);\n}\n\n.hero-links {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1.5rem;\n  margin-top: 1.75rem;\n}\n\n.hero-button {\n  font-family: var(--headerFont);\n  font-weight: 600;\n  font-size: 0.95rem;\n  text-decoration: none;\n}\n.hero-button.primary {\n  padding: 0.6rem 1.1rem;\n  border-radius: 4px;\n  background: var(--secondary);\n  color: var(--light);\n  transition: opacity 0.15s ease;\n}\n.hero-button.primary:hover {\n  opacity: 0.88;\n}\n.hero-button.secondary {\n  color: var(--dark);\n  border-bottom: 1px solid var(--gray);\n  padding-bottom: 1px;\n  transition: border-color 0.15s ease;\n}\n.hero-button.secondary:hover {\n  border-color: var(--secondary);\n}\n\n@keyframes hero-rise {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .hero > * {\n    animation: none;\n  }\n}';
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

// src/components/Hero.tsx
var defaultOptions = {
  kicker: "Hi, I'm",
  name: "Your Name",
  tagline: "",
  links: []
};
var Hero_default = ((opts) => {
  const options = { ...defaultOptions, ...opts };
  const Hero = ({ fileData }) => {
    if (fileData.slug !== "index") {
      return null;
    }
    return /* @__PURE__ */ u2("section", { class: "hero", "aria-label": "Introduction", children: [
      /* @__PURE__ */ u2("p", { class: "hero-kicker", children: options.kicker }),
      /* @__PURE__ */ u2("h1", { class: "hero-name", children: options.name }),
      options.tagline && /* @__PURE__ */ u2("p", { class: "hero-tagline", children: options.tagline }),
      options.location && /* @__PURE__ */ u2("p", { class: "hero-location", children: [
        /* @__PURE__ */ u2(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ u2("path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }),
              /* @__PURE__ */ u2("circle", { cx: "12", cy: "10", r: "3" })
            ]
          }
        ),
        options.location
      ] }),
      options.links.length > 0 && /* @__PURE__ */ u2("div", { class: "hero-links", children: options.links.map((link) => /* @__PURE__ */ u2(
        "a",
        {
          href: link.href,
          class: `hero-button ${link.style === "primary" ? "primary" : "secondary"}`,
          children: link.label
        }
      )) })
    ] });
  };
  Hero.css = hero_default;
  Hero.afterDOMLoaded = `
    function openContactLinksInNewTab() {
      document.querySelectorAll('.callout.contact a[href^="http"]').forEach((a) => {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      });
    }
    document.addEventListener("nav", openContactLinksInNewTab);
    openContactLinksInNewTab();
  `;
  return Hero;
});

export { Hero_default as Hero };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map