---
publish: true
title: Cubeium
description: A seed map mod for Minecraft
created: 2024-11-25
modified: 2026-09-30
tags:
  - game-dev
cssclasses: ""
---

![Cubeium](https://raw.githubusercontent.com/svasim1/cubeium/main/docs/banner.png)

An in-game seed map for Minecraft, like [Chunkbase](https://www.chunkbase.com/apps/seed-map) or [mcseedmap](https://mcseedmap.net/) but without leaving the game. Press **M** to see your world's biomes, structures and slime chunks.

Cubeium started in November 2024 as an idea for my final school project, and I kept working on it in my spare time, mainly to learn Java. After putting it aside for a while I picked it back up, ported it to Minecraft 26.3, rebuilt the map in a vanilla style and released version 2.0.

## Features

- Biome map for the Overworld, Nether and End, with search and highlighting
- Structure markers with vanilla icons, including End City ships and End gateways
- Waypoints, slime chunks, region grid and go-to-coordinates
- Your position shown on the linked Overworld/Nether map
- Seed filled in automatically in singleplayer; type it in on servers
- Optional dark mode

## Accuracy

An automated in-game test compares the map with Minecraft's own world generation. Biomes, strongholds and slime chunks match exactly, and structures that depend on terrain height, like villages, match for 97-99% of the checked spots.

## About AI use

Most of Cubeium's code was written with AI. I decided what the mod should do and how it should look, and tested it in game. The accuracy tests are there so you don't have to take the AI's word for it.

## Links

- [GitHub Repository](https://github.com/svasim1/cubeium)
- [Download](https://modrinth.com/mod/cubeium)