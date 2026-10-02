// node_modules/github-slugger/index.js

// node_modules/@quartz-community/utils/dist/path.js
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"), true);
  return res.length === 0 ? "/" : res;
}
function joinSegments(...args) {
  if (args.length === 0) {
    return "";
  }
  let joined = args.filter((segment) => segment !== "" && segment !== "/").map((segment) => stripSlashes(segment)).join("/");
  const first = args[0];
  const last = args[args.length - 1];
  if (first?.startsWith("/")) {
    joined = "/" + joined;
  }
  if (last?.endsWith("/")) {
    joined = joined + "/";
  }
  return joined;
}
function endsWith(s2, suffix) {
  return s2 === suffix || s2.endsWith("/" + suffix);
}
function trimSuffix(s2, suffix) {
  if (endsWith(s2, suffix)) {
    s2 = s2.slice(0, -suffix.length);
  }
  return s2;
}
function stripSlashes(s2, onlyStripPrefix) {
  if (s2.startsWith("/")) {
    s2 = s2.substring(1);
  }
  if (!onlyStripPrefix && s2.endsWith("/")) {
    s2 = s2.slice(0, -1);
  }
  return s2;
}
function pathToRoot(slug2) {
  let rootPath = slug2.split("/").filter((x2) => x2 !== "").slice(0, -1).map((_2) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}
function resolveRelative(current, target) {
  const res = joinSegments(pathToRoot(current), simplifySlug(target));
  return res;
}

// src/components/styles/project-cards.scss
var project_cards_default = `body:has(.project-cards) .page-listing {
  display: none;
}

.project-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1rem;
  margin: 0.5rem 0 2rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  background-color: var(--light);
  color: var(--darkgray);
  font-weight: normal;
  text-decoration: none;
  transition: border-color 0.15s ease;
}
.project-card:hover {
  border-color: var(--secondary);
}
.project-card:hover .project-card-title {
  color: var(--secondary);
}
.project-card:hover .project-card-cover img {
  transform: scale(1.04);
}

.project-card-cover {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-bottom: 1px solid var(--lightgray);
  background: var(--lightgray);
}
.project-card-cover:not(.placeholder)::before {
  content: "";
  position: absolute;
  inset: -24px;
  background: var(--cover) center/cover no-repeat;
  filter: blur(18px) brightness(0.75);
}
.project-card-cover img {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0.75rem 1rem;
  object-fit: contain;
  border-radius: 0;
  transition: transform 0.3s ease;
}
.project-card-cover.placeholder {
  background: radial-gradient(circle at 20% 15%, color-mix(in srgb, var(--c1) 45%, transparent), transparent 60%), linear-gradient(135deg, var(--c2), var(--light));
}
.project-card-cover.placeholder::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: var(--c1);
  opacity: 0.25;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Cg fill='none' stroke='white' stroke-width='1.2'%3E%3Cpath d='M0 45 C 55 15, 105 15, 160 45 C 215 75, 265 75, 320 45'/%3E%3Cpath d='M0 90 C 55 60, 105 60, 160 90 C 215 120, 265 120, 320 90'/%3E%3Cpath d='M0 135 C 55 105, 105 105, 160 135 C 215 165, 265 165, 320 135'/%3E%3C/g%3E%3C/svg%3E");
  mask-size: cover;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Cg fill='none' stroke='white' stroke-width='1.2'%3E%3Cpath d='M0 45 C 55 15, 105 15, 160 45 C 215 75, 265 75, 320 45'/%3E%3Cpath d='M0 90 C 55 60, 105 60, 160 90 C 215 120, 265 120, 320 90'/%3E%3Cpath d='M0 135 C 55 105, 105 105, 160 135 C 215 165, 265 165, 320 135'/%3E%3C/g%3E%3C/svg%3E");
  -webkit-mask-size: cover;
}

.project-card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0.9rem 1rem 1rem;
}

.project-card-title {
  margin: 0;
  font-size: 1.1rem;
  color: var(--dark);
  transition: color 0.15s ease;
}

.project-card-desc {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0.4rem 0 0;
  font-size: 0.92rem;
  line-height: 1.5;
}

.project-card-footer {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.8rem;
  font-size: 0.82rem;
  color: var(--gray);
}

.project-card-tags {
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (prefers-reduced-motion: reduce) {
  .project-card:hover .project-card-cover img {
    transform: none;
  }
}
.featured-cards-source {
  display: none;
}

.callout.featured {
  padding: 0;
  border: none;
  background: none;
  box-shadow: none;
  overflow: visible;
}
.callout.featured > .callout-title {
  display: none;
}
.callout.featured > .callout-content {
  padding: 0;
  background: none;
  overflow: visible;
}
.callout.featured > .callout-content.has-cards > ul {
  display: none;
}
.callout.featured > .callout-content .project-cards {
  margin: 0.75rem 0 1rem;
}`;
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

// src/components/ProjectCards.tsx
var defaultOptions = {
  showDate: false,
  maxTags: 3
};
var PALETTES = [
  ["#c87a5a", "#6b3a2a"],
  ["#8aa39b", "#34463f"],
  ["#a58bb0", "#43354a"],
  ["#c9a45c", "#5a4724"]
];
function hash(text) {
  let h2 = 0;
  for (let i2 = 0; i2 < text.length; i2++) {
    h2 = h2 * 31 + text.charCodeAt(i2) >>> 0;
  }
  return h2;
}
function pageDate(page) {
  const dates = page.dates;
  return dates?.modified ?? dates?.created;
}
function firstImageSrc(node) {
  if (!node) return void 0;
  if (node.type === "element" && node.tagName === "img") {
    const src = node.properties?.src;
    if (typeof src === "string" && src) return src;
  }
  for (const child of node.children ?? []) {
    const found = firstImageSrc(child);
    if (found) return found;
  }
  return void 0;
}
var prop = (node, camel, dashed) => node.properties?.[camel] ?? node.properties?.[dashed];
function featuredLinks(root) {
  const slugs = [];
  const collect = (node) => {
    const linked = prop(node, "dataSlug", "data-slug");
    if (node.tagName === "a" && typeof linked === "string" && !slugs.includes(linked)) {
      slugs.push(linked);
    }
    node.children?.forEach(collect);
  };
  const find = (node) => {
    if (!node) return;
    if (node.tagName === "blockquote" && prop(node, "dataCallout", "data-callout") === "featured") {
      collect(node);
      return;
    }
    node.children?.forEach(find);
  };
  find(root);
  return slugs;
}
var isAbsolute = (src) => /^[a-z][a-z0-9+.-]*:/i.test(src) || src.startsWith("//");
function coverFor(page, fm, folderSlug) {
  const toRoot = pathToRoot(folderSlug);
  const fromFrontmatter = fm.cover ?? fm.image;
  if (fromFrontmatter) {
    return isAbsolute(fromFrontmatter) ? fromFrontmatter : `${toRoot}/${fromFrontmatter.replace(/^\/+/, "")}`;
  }
  const src = firstImageSrc(page.htmlAst);
  if (!src) return void 0;
  if (isAbsolute(src)) return src;
  const sitePath = new URL(src, `https://site/${page.slug}`).pathname;
  return `${toRoot}${sitePath}`;
}
var ProjectCards_default = ((opts) => {
  const options = { ...defaultOptions, ...opts };
  const renderCard = (page, fromSlug) => {
    const fm = page.frontmatter ?? {};
    const title = fm.title ?? page.slug;
    const href = resolveRelative(fromSlug, page.slug);
    const tags = (fm.tags ?? []).slice(0, options.maxTags);
    const date = pageDate(page);
    const image = coverFor(page, fm, fromSlug);
    const [c1, c2] = PALETTES[hash(title) % PALETTES.length];
    return /* @__PURE__ */ u2("a", { href, class: "project-card", children: [
      /* @__PURE__ */ u2(
        "div",
        {
          class: `project-card-cover${image ? "" : " placeholder"}`,
          style: image ? `--cover: url("${image}");` : `--c1: ${c1}; --c2: ${c2};`,
          children: image && /* @__PURE__ */ u2("img", { src: image, alt: "", loading: "lazy" })
        }
      ),
      /* @__PURE__ */ u2("div", { class: "project-card-body", children: [
        /* @__PURE__ */ u2("h3", { class: "project-card-title", children: title }),
        fm.description && /* @__PURE__ */ u2("p", { class: "project-card-desc", children: fm.description }),
        /* @__PURE__ */ u2("div", { class: "project-card-footer", children: [
          tags.length > 0 && /* @__PURE__ */ u2("span", { class: "project-card-tags", children: tags.map((tag) => `#${tag}`).join("  ") }),
          options.showDate && date && /* @__PURE__ */ u2("span", { class: "project-card-date", children: date.getFullYear() })
        ] })
      ] })
    ] });
  };
  const ProjectCards = ({ fileData, allFiles }) => {
    const slug2 = fileData.slug;
    if (!slug2) return null;
    const featuredSlugs = featuredLinks(fileData.htmlAst);
    if (featuredSlugs.length > 0) {
      const featured = featuredSlugs.map((s2) => allFiles.find((page) => page.slug === s2)).filter((page) => page !== void 0);
      if (featured.length === 0) return null;
      return /* @__PURE__ */ u2("div", { class: "project-cards featured-cards-source", children: featured.map((page) => renderCard(page, slug2)) });
    }
    if (slug2 === "index" || !slug2.endsWith("/index")) {
      return null;
    }
    const folder = slug2.slice(0, -"index".length);
    const pages = allFiles.filter((page) => {
      const pageSlug = page.slug;
      if (!pageSlug || !pageSlug.startsWith(folder) || pageSlug === slug2) return false;
      return !pageSlug.slice(folder.length).includes("/");
    }).sort((a2, b2) => (pageDate(b2)?.getTime() ?? 0) - (pageDate(a2)?.getTime() ?? 0));
    if (pages.length === 0) {
      return null;
    }
    return /* @__PURE__ */ u2("div", { class: "project-cards", children: pages.map((page) => renderCard(page, slug2)) });
  };
  ProjectCards.css = project_cards_default;
  ProjectCards.afterDOMLoaded = `
    function placeFeaturedCards() {
      const cards = document.querySelector(".featured-cards-source");
      const target = document.querySelector(".callout.featured > .callout-content");
      if (!cards || !target) return;
      cards.classList.remove("featured-cards-source");
      target.appendChild(cards);
      target.classList.add("has-cards");
    }
    document.addEventListener("nav", placeFeaturedCards);
    placeFeaturedCards();
  `;
  return ProjectCards;
});

export { ProjectCards_default as ProjectCards };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map