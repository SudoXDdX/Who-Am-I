# whoami // SuXD

A bilingual (PT-BR / EN-US) personal technical site answering one
question: **who is SuXD?** Built with Next.js (static export), TypeScript
and Tailwind CSS, deployed to GitHub Pages via GitHub Actions.

This is not a system-info dashboard or a generic portfolio template — it's
a personal narrative: trajectory, projects, a lab notebook of experiments,
and an honest account of what's been built (and what's still an idea).

## Quick start

```bash
npm install
npm run dev       # http://localhost:3000 → redirects to /pt/
```

## Build

```bash
npm run build      # static export to ./out
```

To preview the exported site locally with a base path (mimicking a
GitHub Pages project page), e.g. `/whoami-suxd/`:

```bash
NEXT_PUBLIC_BASE_PATH=/whoami-suxd npm run build
npx serve out
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds
and publishes to GitHub Pages automatically. In the repo settings, set
**Settings → Pages → Source → GitHub Actions** once, and it's hands-off
after that.

## Project docs

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — how the app is put
  together (routing, i18n, content system, styling, deployment).
- [`docs/CONTENT.md`](docs/CONTENT.md) — content rules, where each page's
  copy lives, and what's still pending real input.
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — why things were built the
  way they were.
- [`docs/AI-HANDOFF.md`](docs/AI-HANDOFF.md) — current status, known
  gaps, and suggested next steps for continued work.

## Stack

Next.js (App Router, static export) · TypeScript · Tailwind CSS v4 ·
zero i18n dependencies · zero CMS.
