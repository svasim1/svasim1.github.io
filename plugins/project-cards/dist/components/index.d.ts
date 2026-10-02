import { QuartzComponent } from '@quartz-community/types';

interface ProjectCardsOptions {
    /** Show the year the note was last modified in the card footer */
    showDate: boolean;
    /** Maximum number of tags per card */
    maxTags: number;
}
declare const _default: (opts?: Partial<ProjectCardsOptions>) => QuartzComponent;

export { _default as ProjectCards, type ProjectCardsOptions };
