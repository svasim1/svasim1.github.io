import * as preact from 'preact';
import { BuildCtx } from '@quartz-community/types';

interface Person {
    name: string;
    jobTitle?: string;
    worksFor?: string;
    location?: string;
    email?: string;
    /** Profile URLs that are also you (LinkedIn, GitHub, ...) */
    sameAs?: string[];
}
interface SeoOptions {
    /** Described as structured data on the homepage */
    person?: Person;
    /** Google Search Console "HTML tag" verification code, added to the homepage */
    googleSiteVerification?: string;
}
type PageData = {
    slug?: string;
};
declare function Seo(opts?: SeoOptions): {
    name: string;
    htmlPlugins(): never[];
    externalResources(ctx: BuildCtx): {
        additionalHead?: undefined;
    } | {
        additionalHead: (preact.JSX.Element | ((page: PageData) => preact.JSX.Element | null))[];
    };
    emit(ctx: BuildCtx): Promise<string[]>;
    partialEmit(): AsyncGenerator<never, void, unknown>;
};

export { type Person, type SeoOptions, Seo as default };
