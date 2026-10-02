# seo

Search engine extras for svasim.se:

- `<link rel="canonical">` on every page (the homepage is `/`, folder pages end in `/`)
- Google Search Console verification tag on the homepage (`googleSiteVerification` option)
- schema.org structured data (Person + WebSite) on the homepage, from the `person` option
- `robots.txt` pointing to the sitemap

Rebuild after editing `src/`: `npm install && npm run build` (the built `dist/` is committed).
