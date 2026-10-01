import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import style from "./styles/hero.scss";

export interface HeroLink {
  label: string;
  href: string;
  /** "primary" renders a filled button, anything else an outlined one */
  style?: "primary" | "secondary";
}

export interface HeroOptions {
  /** Small line above the name */
  kicker: string;
  name: string;
  tagline: string;
  location?: string;
  links: HeroLink[];
}

const defaultOptions: HeroOptions = {
  kicker: "Hi, I'm",
  name: "Your Name",
  tagline: "",
  links: [],
};

export default ((opts?: Partial<HeroOptions>) => {
  const options: HeroOptions = { ...defaultOptions, ...opts };

  // Only rendered on the homepage
  const Hero: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    if (fileData.slug !== "index") {
      return null;
    }

    return (
      <section class="hero" aria-label="Introduction">
        <p class="hero-kicker">{options.kicker}</p>
        <h1 class="hero-name">{options.name}</h1>
        {options.tagline && <p class="hero-tagline">{options.tagline}</p>}
        {options.location && (
          <p class="hero-location">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {options.location}
          </p>
        )}
        {options.links.length > 0 && (
          <div class="hero-links">
            {options.links.map((link) => (
              <a
                href={link.href}
                class={`hero-button ${link.style === "primary" ? "primary" : "secondary"}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </section>
    );
  };

  Hero.css = style;
  // links in the "> [!contact]" callout open in a new tab (not mailto:)
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
}) satisfies QuartzComponentConstructor;
