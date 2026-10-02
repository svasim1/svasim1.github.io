# project-cards

Shows the notes in a folder as a grid of cards on folder pages (e.g. /school-projects/) and hides the default list there.

Each card uses the note's `title`, `description` and `tags`. The cover is the `cover:`/`image:` frontmatter field (a URL or a path from the site root) or, if that is missing, the first image in the note. Notes without any image get a generated cover.

Options: `showDate` (default false), `maxTags` (default 3).

Rebuild after editing `src/`: `npm install && npm run build` (the built `dist/` is committed).
