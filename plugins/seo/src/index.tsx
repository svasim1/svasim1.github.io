import fs from "node:fs/promises";
import path from "node:path";
import type { BuildCtx } from "@quartz-community/types";

export interface Person {
  name: string;
  jobTitle?: string;
  worksFor?: string;
  location?: string;
  email?: string;
  /** Profile URLs that are also you (LinkedIn, GitHub, ...) */
  sameAs?: string[];
}

export interface SeoOptions {
  /** Described as structured data on the homepage */
  person?: Person;
  /** Google Search Console "HTML tag" verification code, added to the homepage */
  googleSiteVerification?: string;
}

type PageData = { slug?: string };

function siteUrl(ctx: BuildCtx): string {
  const baseUrl = (ctx.cfg.configuration as { baseUrl?: string }).baseUrl ?? "";
  return `https://${baseUrl.replace(/\/+$/, "")}`;
}

// "index" -> "/", "school-projects/index" -> "/school-projects/", others unchanged
function canonicalPath(slug: string): string {
  if (slug === "index") return "/";
  if (slug.endsWith("/index")) return `/${slug.slice(0, -"index".length)}`;
  return `/${slug}`;
}

// The plugin is loaded twice (as transformer and as emitter) and Quartz
// collects head tags from both instances; only the first one adds them.
let headOwner: object | null = null;

// JSON inside <script> must not be able to close the tag
const toJsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export default function Seo(opts?: SeoOptions) {
  const person = opts?.person;
  const self = {};

  return {
    name: "Seo",

    // nothing to transform; this plugin only adds tags to <head>
    htmlPlugins() {
      return [];
    },

    externalResources(ctx: BuildCtx) {
      headOwner ??= self;
      if (headOwner !== self) return {};
      const site = siteUrl(ctx);
      return {
        additionalHead: [
          // icon used when the site is saved to an iPhone/iPad home screen
          <link rel="apple-touch-icon" href={`${site}/static/icon.png`} />,
          (page: PageData) => {
            if (page.slug !== "index" || !opts?.googleSiteVerification) return null;
            return <meta name="google-site-verification" content={opts.googleSiteVerification} />;
          },
          (page: PageData) => {
            if (!page.slug || page.slug === "404") return null;
            return <link rel="canonical" href={site + canonicalPath(page.slug)} />;
          },
          (page: PageData) => {
            if (page.slug !== "index" || !person) return null;
            const data = {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${site}/#person`,
                  name: person.name,
                  url: `${site}/`,
                  ...(person.jobTitle && { jobTitle: person.jobTitle }),
                  ...(person.worksFor && {
                    worksFor: { "@type": "Organization", name: person.worksFor },
                  }),
                  ...(person.location && {
                    address: { "@type": "PostalAddress", addressLocality: person.location },
                  }),
                  ...(person.email && { email: person.email }),
                  ...(person.sameAs?.length && { sameAs: person.sameAs }),
                },
                {
                  "@type": "WebSite",
                  "@id": `${site}/#website`,
                  url: `${site}/`,
                  name: person.name,
                  author: { "@id": `${site}/#person` },
                },
              ],
            };
            return (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(data) }}
              />
            );
          },
        ],
      };
    },

    // robots.txt pointing crawlers at the sitemap
    async emit(ctx: BuildCtx) {
      const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl(ctx)}/sitemap.xml\n`;
      const file = path.join(ctx.argv.output, "robots.txt");
      await fs.writeFile(file, robots);
      return [file];
    },

    async *partialEmit() {},
  };
}
