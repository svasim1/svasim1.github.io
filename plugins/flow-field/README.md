# flow-field

Interactive background for svasim.se: particles drift along a wave-shaped flow field and swirl around the cursor, in the theme's `--secondary` color.

Draws on a fixed canvas behind the page and hides the static CSS wave background (`body::before`) while running. Does not start when the visitor prefers reduced motion, and pauses while the tab is hidden.

Rebuild after editing `src/`: `npm install && npm run build` (the built `dist/` is committed).
