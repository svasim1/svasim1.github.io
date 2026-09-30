import { QuartzComponent } from '@quartz-community/types';

interface HeroLink {
    label: string;
    href: string;
    /** "primary" renders a filled button, anything else an outlined one */
    style?: "primary" | "secondary";
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
