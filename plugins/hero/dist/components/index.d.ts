import { QuartzComponent } from '@quartz-community/types';

interface HeroLink {
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
interface HeroOptions {
    /** Small line above the name */
    kicker: string;
    name: string;
    tagline: string;
    location?: string;
    links: HeroLink[];
}
declare const _default: (opts?: Partial<HeroOptions>) => QuartzComponent;

export { _default as Hero, type HeroLink, type HeroOptions };
