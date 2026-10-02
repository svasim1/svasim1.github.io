import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import style from "./styles/hero.scss";

export interface HeroLink {
  label: string;
  href: string;
  /**
   * "primary" renders a filled button, "subtle" a small muted link
   * (e.g. for a CV), anything else an underlined text link
   */
  style?: "primary" | "secondary" | "subtle";
  /** Open the link in a new tab */
  newTab?: boolean;
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
                {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                class={`hero-button ${link.style === "primary" || link.style === "subtle" ? link.style : "secondary"}`}
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

    // TL;DR toggle: a "> [!short]" and a "> [!story]" callout on the same page
    // are shown one at a time (full story by default), with a switch above
    // them. Without JavaScript
    // both stay visible.
    function setupBioToggle() {
      const article = document.querySelector("article");
      const short = article && article.querySelector(".callout.short");
      const story = article && article.querySelector(".callout.story");
      if (!short || !story || article.querySelector(".bio-toggle")) return;

      const toggle = document.createElement("div");
      toggle.className = "bio-toggle";
      toggle.setAttribute("role", "group");
      toggle.setAttribute("aria-label", "Bio length");
      const options = [["short", "TL;DR"], ["story", "Full story"]];
      const buttons = options.map(([mode, label]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.dataset.mode = mode;
        button.addEventListener("click", () => setMode(mode));
        toggle.appendChild(button);
        return button;
      });

      function setMode(mode) {
        article.dataset.bio = mode;
        buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
        try { localStorage.setItem("bio-mode", mode); } catch {}
      }

      const first = short.compareDocumentPosition(story) & Node.DOCUMENT_POSITION_FOLLOWING ? short : story;
      first.before(toggle);
      let saved = null;
      try { saved = localStorage.getItem("bio-mode"); } catch {}
      setMode(saved === "short" ? "short" : "story");
    }
    document.addEventListener("nav", setupBioToggle);
    setupBioToggle();

    // The graph sizes its canvas once, from its box's width at load time.
    // When the width changes (window resize, rotating a phone), ask the
    // page to re-render so the graph redraws at the new size.
    let lastWidth = window.innerWidth;
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth === lastWidth) return;
        lastWidth = window.innerWidth;
        document.dispatchEvent(new CustomEvent("render"));
      }, 250);
    });
  `;
  return Hero;
}) satisfies QuartzComponentConstructor;
