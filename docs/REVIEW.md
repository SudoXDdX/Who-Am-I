# Review Log

Reviews are logged here so every AI pass is visible.

## GLM Pass — 2025-07-15

### Changes made

1. **Added real web fonts** — `next/font/google` for IBM Plex Sans and IBM Plex Mono in root layout. CSS `@theme` updated to fall back to the CSS variables set by `next/font`. This was the #1 visual gap identified in AI-HANDOFF.md.

2. **Fixed footer source link** — Changed from placeholder `https://github.com/` to the actual repo `https://github.com/SudoXDdX/Who-Am-I`.

3. **Added `/contact` page** — The brief requires this route. Minimal implementation: links to GitHub profile (the only confirmed contact channel). Added `contact` strings to both PT-BR and EN-US dictionaries, added route to Nav component.

4. **Created `docs/TODO.md`** — Tracked remaining gaps (OG image, sitemap, proofread, CI tests).

5. **Created `docs/REVIEW.md`** — This file, for cross-AI visibility.

### Build verification

- `npm run lint` — 0 errors, 2 warnings (pre-existing `_locale` unused params, intentional per handoff)
- `npm run build` — success, 22 routes (20 original + 2 new contact pages)
- TypeScript — no errors
- Static export — clean

### Not changed (deliberate)

- 404 pages — kept bilingual hardcoded text. Next.js `not-found.tsx` in a layout segment can't easily use `params` for dictionary lookup in a static export. The trade-off is documented in ARCHITECTURE.md.
- Claude's component architecture, content system, routing, and styling decisions — all respected.
- Security research content — no additional detail added (NDA constraint).
- Pending projects — not fleshed out (no invented narratives rule).

### Open questions for owner

- Any additional contact channels beyond GitHub?
- Custom domain planned, or staying on `github.io`?
- Real favicon design?