---
publish: true
title: RiksdagsTracker UF
description: A website that makes the Swedish parliament's work easy to follow, with data from the Riksdag's open API and an AI chat.
created: 2024-09-01
modified: 2026-10-02T16:12:14.782+02:00
tags:
  - web
  - collaboration
  - ai
  - javascript
  - python
cssclasses: ""
---

![[Attachments/riksdagstracker-home.webp|RiksdagsTracker homepage]]

RiksdagsTracker UF was a Junior Achievement (UF) company and our final project at Hitachigymnasiet in 2024/2025. We built a website that makes the Swedish parliament's work easier to follow, to make politics more accessible, especially for young people. We placed 4th in JA company of the year in Västmanland 2025.

## What it did

All data came live from the Riksdag's open database. The site had pages for:

- **Parties**: seats, gender distribution over time and how loyally each party's members vote
- **Members**: every member of parliament, filterable by party, gender, committee and constituency, with their voting record and written questions
- **Written questions**: searchable, with the minister's answer
- **AI chat**: ask questions and get answers based on retrieved documents

![[Attachments/riksdagstracker-members.webp|Member list with filters]]

We followed the WCAG accessibility guidelines and chose purple as the main color, since no party in the Riksdag uses it.

## My role

There were four of us on the development team, and three more on the business side. I was the webmaster:

- **Hosting**: a self-hosted server, managed over SSH, with the Nuxt app and the API running in Docker behind an Nginx reverse proxy, with HTTPS through Let's Encrypt.
- **AI chat**: the API behind it is a fork of my [[School Projects/llm-testing\|LLM-testing]] project: a Python RAG backend using GPT-4o, with login via OAuth2/JWT and an SQLite database.

## Tech stack

Nuxt (with server-side rendering), Vue, Tailwind CSS, Node.js, Docker, Nginx and Python for the AI API. I've written more about Nuxt in [[Thoughts/web-frameworks\|Web Frameworks]].

## Result

The site launched publicly at prototyp.riksdagstracker.se and had **136 unique visitors** in its first five weeks.

![[Attachments/riksdagstracker-charts.webp|Charts of men and women in the Riksdag over time]]

Not everything made it into the launch. The votes page only worked locally, and the AI chat ended up based on a narrower set of documents than planned. The biggest lessons were working with a complicated API and handling merge conflicts in a team. The website is no longer online and the code is private.