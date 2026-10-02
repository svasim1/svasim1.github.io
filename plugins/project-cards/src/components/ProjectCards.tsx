import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import type { FullSlug } from "@quartz-community/utils/path";
import { pathToRoot, resolveRelative } from "@quartz-community/utils/path";
import style from "./styles/project-cards.scss";

export interface ProjectCardsOptions {
  /** Show the year the note was last modified in the card footer */
  showDate: boolean;
  /** Maximum number of tags per card */
  maxTags: number;
}

const defaultOptions: ProjectCardsOptions = {
  showDate: false,
  maxTags: 3,
};

type PageData = QuartzComponentProps["fileData"];

interface Frontmatter {
  title?: string;
  description?: string;
  tags?: string[];
  image?: string;
  cover?: string;
}

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

// Placeholder palettes (hue pairs) picked per card from the title
const PALETTES = [
  ["#c87a5a", "#6b3a2a"],
  ["#8aa39b", "#34463f"],
  ["#a58bb0", "#43354a"],
  ["#c9a45c", "#5a4724"],
];

function hash(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h * 31 + text.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pageDate(page: PageData): Date | undefined {
  const dates = page.dates as { created?: Date; modified?: Date } | undefined;
  return dates?.modified ?? dates?.created;
}

function firstImageSrc(node: HastNode | undefined): string | undefined {
  if (!node) return undefined;
  if (node.type === "element" && node.tagName === "img") {
    const src = node.properties?.src;
    if (typeof src === "string" && src) return src;
  }
  for (const child of node.children ?? []) {
    const found = firstImageSrc(child);
    if (found) return found;
  }
  return undefined;
}

// Plugins store data attributes either camelCased or as written
const prop = (node: HastNode, camel: string, dashed: string) =>
  node.properties?.[camel] ?? node.properties?.[dashed];

// Slugs of the internal links inside a "> [!featured]" callout, in order
function featuredLinks(root: HastNode | undefined): string[] {
  const slugs: string[] = [];
  const collect = (node: HastNode) => {
    const linked = prop(node, "dataSlug", "data-slug");
    if (node.tagName === "a" && typeof linked === "string" && !slugs.includes(linked)) {
      slugs.push(linked);
    }
    node.children?.forEach(collect);
  };
  const find = (node: HastNode | undefined) => {
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

const isAbsolute = (src: string) => /^[a-z][a-z0-9+.-]*:/i.test(src) || src.startsWith("//");

// Cover image: frontmatter `cover`/`image` (path from the site root or a URL),
// otherwise the first image in the note. Returned relative to the folder page.
function coverFor(page: PageData, fm: Frontmatter, folderSlug: FullSlug): string | undefined {
  const toRoot = pathToRoot(folderSlug);
  const fromFrontmatter = fm.cover ?? fm.image;
  if (fromFrontmatter) {
    return isAbsolute(fromFrontmatter)
      ? fromFrontmatter
      : `${toRoot}/${fromFrontmatter.replace(/^\/+/, "")}`;
  }
  const src = firstImageSrc(page.htmlAst as HastNode | undefined);
  if (!src) return undefined;
  if (isAbsolute(src)) return src;
  // in-note image paths are relative to the note itself
  const sitePath = new URL(src, `https://site/${page.slug as string}`).pathname;
  return `${toRoot}${sitePath}`;
}

export default ((opts?: Partial<ProjectCardsOptions>) => {
  const options: ProjectCardsOptions = { ...defaultOptions, ...opts };

  const renderCard = (page: PageData, fromSlug: FullSlug) => {
    const fm = (page.frontmatter ?? {}) as Frontmatter;
    const title = fm.title ?? (page.slug as string);
    const href = resolveRelative(fromSlug, page.slug as FullSlug);
    const tags = (fm.tags ?? []).slice(0, options.maxTags);
    const date = pageDate(page);
    const image = coverFor(page, fm, fromSlug);
    const [c1, c2] = PALETTES[hash(title) % PALETTES.length]!;

    return (
      <a href={href} class="project-card">
        <div
          class={`project-card-cover${image ? "" : " placeholder"}`}
          style={image ? `--cover: url("${image}");` : `--c1: ${c1}; --c2: ${c2};`}
        >
          {image && <img src={image} alt="" loading="lazy" />}
        </div>
        <div class="project-card-body">
          <h3 class="project-card-title">{title}</h3>
          {fm.description && <p class="project-card-desc">{fm.description}</p>}
          <div class="project-card-footer">
            {tags.length > 0 && (
              <span class="project-card-tags">{tags.map((tag) => `#${tag}`).join("  ")}</span>
            )}
            {options.showDate && date && (
              <span class="project-card-date">{date.getFullYear()}</span>
            )}
          </div>
        </div>
      </a>
    );
  };

  const ProjectCards: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    const slug = fileData.slug as FullSlug | undefined;
    if (!slug) return null;

    // Any page with a "> [!featured]" callout: cards for the pages it links to.
    // They're rendered here and moved into the callout by the script below.
    const featuredSlugs = featuredLinks(fileData.htmlAst as HastNode | undefined);
    if (featuredSlugs.length > 0) {
      const featured = featuredSlugs
        .map((s) => allFiles.find((page) => page.slug === s))
        .filter((page): page is PageData => page !== undefined);
      if (featured.length === 0) return null;
      return (
        <div class="project-cards featured-cards-source">
          {featured.map((page) => renderCard(page, slug))}
        </div>
      );
    }

    // Folder pages (e.g. "school-projects/index"), not the site root
    if (slug === "index" || !slug.endsWith("/index")) {
      return null;
    }

    const folder = slug.slice(0, -"index".length);
    const pages = allFiles
      .filter((page) => {
        const pageSlug = page.slug as string | undefined;
        if (!pageSlug || !pageSlug.startsWith(folder) || pageSlug === slug) return false;
        // direct children only
        return !pageSlug.slice(folder.length).includes("/");
      })
      .sort((a, b) => (pageDate(b)?.getTime() ?? 0) - (pageDate(a)?.getTime() ?? 0));

    if (pages.length === 0) {
      return null;
    }

    return <div class="project-cards">{pages.map((page) => renderCard(page, slug))}</div>;
  };

  ProjectCards.css = style;
  // Move the featured cards into their callout (also after page navigation)
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
}) satisfies QuartzComponentConstructor;
