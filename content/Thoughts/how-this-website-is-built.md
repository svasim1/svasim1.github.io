---
publish: true
title: How This Website Is Built
description: The setup behind svasim.se, from notes in Obsidian to a published website.
created: 2026-10-02
modified: 2026-10-02T13:16:58.386+02:00
tags:
  - thoughts
  - web
cssclasses: ""
---

I write everything on this site as notes in [Obsidian](https://obsidian.md/), and a few tools turn those notes into the website you're reading. Here's how it fits together.

### Obsidian

All pages start as Markdown notes in my Obsidian vault. Notes I want online get `publish: true` in their properties, everything else stays private. Obsidian is a great tool for writing documents with Markdown formatting, it can be either simple or advanced depending on how you want to use it.

### Quartz

[Quartz](https://quartz.jzhao.xyz/) is a static site generator made for Obsidian notes. It turns wikilinks, callouts and tags into a website, and gives me things like the graph view, backlinks and search for free. I recently upgraded from Quartz 4 to Quartz 5, which moved everything to a plugin system and made customizing much easier.

### Publishing

The [Quartz Syncer](https://github.com/saberzero1/quartz-syncer) plugin pushes my published notes from Obsidian straight to the site's GitHub repository. A GitHub Actions workflow then builds the site and deploys it to GitHub Pages, on my own domain. From pressing publish to the change being live takes about a minute.

### Making it my own

On top of Quartz I've added a few custom parts:

- The intro at the top of the homepage
- The animated background, which reacts to your cursor
- Timeline and contact sections that I write as normal callouts in Obsidian
- My own icon and social preview images
