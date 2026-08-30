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

---

## GLM Pass 2 — 2026-08-31

### Changes made

1. **Fixed root redirect basePath handling** — `src/app/page.tsx` used `window.location.replace(\`/${defaultLocale}/\`)` without respecting `NEXT_PUBLIC_BASE_PATH`. When deployed as a GitHub Pages project page (e.g. `/Who-Am-I/`), the redirect would send users to the wrong path. Now prepends `basePath` to both the JS redirect and the no-JS fallback link. Verified with `NEXT_PUBLIC_BASE_PATH=/Who-Am-I npm run build` — the inlined HTML correctly contains `Who-Am-I/pt/`.

### Review summary

Full codebase audit performed: all components, pages, content files, config, and GitHub Actions workflow inspected.

**What's solid:**
- Build: 22 routes, 0 errors, 0 new warnings
- Lint: 0 errors, 2 pre-existing intentional warnings
- Bilingual content: all pt/en pairs complete, no placeholders
- Accessibility: skip-to-content, aria labels, focus-visible, reduced-motion, semantic HTML all correct
- Security: NDA constraint respected, no exploitation details
- SEO: metadata, hreflang, OG/Twitter cards per locale
- Deployment: GitHub Actions workflow is correct
- `next/link` automatically handles `basePath` — all `<Link>` components are correct

**Known gaps (unchanged, documented in TODO.md):**
- No OG image
- No sitemap (domain not final)
- No automated tests
- Favicon is placeholder
- `<html lang>` is static at root (documented trade-off)

### Not changed (deliberate)

- 404 pages — use `next/link` `<Link>` which auto-handles basePath; no fix needed
- `_locale` unused params — intentional for API symmetry
- Mobile nav `<details>` auto-close — zero-JS trade-off, acceptable
- All architectural decisions from Claude's original implementation respected