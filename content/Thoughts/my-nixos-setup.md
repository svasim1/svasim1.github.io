---
publish: true
title: My NixOS Setup
description: How I configure my desktop and laptop with a single NixOS flake.
created: 2026-07-11
modified: 2026-10-02T12:39:46.983+02:00
tags:
  - thoughts
  - linux
cssclasses: ""
---

My computers run [NixOS](https://nixos.org/), a Linux distribution where the whole system is described in configuration files. My config lives on [GitHub](https://github.com/svasim1/nixos), and with one command I can rebuild any of my machines from it. I've tried a few Linux distros before, with Arch being my favorite, but then I heard about the structured and declarative aspect of NixOS which led me to test it and now daily-drive it.

### One flake, multiple machines

The config is a flake built on `nixos-unstable`. Each machine (right now my desktop and laptop) gets its own folder in `hosts/` with only its hardware-specific settings. Everything else is shared through modules in `modules/`: boot, desktop, networking, packages, users and so on. Adding a new machine is mostly generating a hardware config and registering it.

### Desktop and apps

I use KDE Plasma 6, configured declaratively with [plasma-manager](https://github.com/nix-community/plasma-manager), even down to the wallpaper. [Home Manager](https://github.com/nix-community/home-manager) handles my user setup: Firefox, Zsh, Neovim, SSH and apps like Alacritty, VSCodium, Spotify and Prism Launcher for Minecraft.

For gaming, Steam is set up with Proton-GE and GameMode.

### Secure Boot and secrets

Secure Boot works through [Lanzaboote](https://github.com/nix-community/lanzaboote) with my own keys. Secrets like my SSH key are encrypted with [agenix](https://github.com/ryantm/agenix), so they can live in the public repo without being readable.

I keep Secure Boot on since I dual-boot Windows on my PC.

### Keeping it clean

Old system generations are garbage collected automatically every three days, and the Nix store optimises itself, so the disk doesn't fill up with old versions.

### What I think

The best part of NixOS is that my whole system lives in one config I can rebuild anywhere, but the learning curve is steep and errors can be cryptic, so I'd recommend it to people who enjoy tinkering rather than someone who just wants a computer that works.