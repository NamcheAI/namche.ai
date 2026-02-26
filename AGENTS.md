# AGENTS.md — namche.ai

## Project

namche.ai is the central hub for Jodok Batlogg's AI work.
Named after Namche Bazaar, the gateway to the Himalayas.

## Language

Everything in this project is in English: code, content, docs, commit messages.

## Principles

Buddhist-inspired, not religious:

- **Mindfulness** — act deliberately, don't just react
- **Cause and effect** — understand, don't blame
- **Reduction of noise** — less is clearer
- **Beginner's mind** — stay open, even to the familiar
- **Right action** — be useful without causing harm

## Brand

Follows the Mycelia brand system (`docs/Mycelia Styleguide v0.1.pdf`).
Color palette: Slate (primary) + Amber (secondary).
Logos built on the 3x3 block grid. Fonts: Inter / Ginto Nord / Space Mono.

## Scope

This repository contains only the Astro static site generator for:

- `namche.ai`
- `tashi.namche.ai`
- `nima.namche.ai`
- `pema.namche.ai`

Webhook proxy is maintained separately:

- `https://github.com/NamcheAI/webhook-proxy`

## Structure

- `src/` — Astro source (layouts, components, pages)
- `scripts/build-sites.mjs` — build all four sites into `dist/sites/<site>`
- `.github/workflows/deploy.yaml` — CI deploy workflow to `bertrand.batlogg.com`
- `docs/Mycelia Styleguide v0.1.pdf` — design and brand system
- `docs/logos/` — logo assets

## Git Workflow

1. Always `git pull origin main` before starting work.
2. Create a feature branch with prefix `codex/`.
3. Commit and push to that branch.
4. Open or update a PR.
5. Address review feedback on the same branch.
6. Merge only after explicit approval.

Never commit directly to `main`.

## Development

- Dev server: `npm run dev -- --site namche`
- Build all sites: `npm run build:sites`
- Build single site: `npm run build:site -- --site tashi`
- Preview build: `npm start`

## Deployment

On each push/merge to `main`, GitHub Actions builds all sites and deploys via SSH/rsync to:

- `/var/www/html/namche.ai`
- `/var/www/html/tashi.namche.ai`
- `/var/www/html/nima.namche.ai`
- `/var/www/html/pema.namche.ai`

Target directories must already exist and be writable by the deploy user.

Required GitHub secrets:

- `DEPLOY_SSH_KEY`

Required GitHub variables:

- `DEPLOY_KNOWN_HOSTS`

## Tone

- Clear, calm, direct
- No marketing speak
- No pathos, no emojis
- Substance over style
