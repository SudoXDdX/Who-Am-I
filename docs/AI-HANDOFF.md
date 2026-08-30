# AI Handoff (Claude → GLM → next)

Read this first. It tells you where the project stands and what to do
next, without needing to reconstruct context from scratch.

## Current state: post-GLM-review build

- `npm run build` succeeds — static export via `output: "export"`, all
  22 routes prerender cleanly (2 locales × 11 routes: home, about,
  timeline, projects, 2 project detail pages, stack, lab, contact, root
  redirect, 404).
- `npm run lint` passes with 2 harmless warnings (`_locale` unused param
  in two content helper functions — intentional, kept for API symmetry
  with `getProjects(locale)` in case per-locale filtering is needed
  later; safe to ignore or silence).
- No TypeScript errors.
- GitHub Actions workflow (`.github/workflows/deploy.yml`) is written and
  should work as-is once the repo has GitHub Pages set to "GitHub
  Actions" as the source, but **has not been tested against a live
  GitHub Pages deployment** — that's the first thing worth verifying.

## Features complete

- Bilingual (PT-BR default at `/pt/`, English at `/en/`) routing, nav,
  footer, metadata (title template, description, `hreflang` alternates,
  Open Graph, Twitter card) per locale.
- Pages: Home (hero + terminal prompt + 4 section preview cards), About,
  Timeline (9-stage narrative), Projects (list + detail pages for the 2
  projects with a full story), Stack (4 categories), Lab (3 experiments),
  Contact (minimal — links to GitHub profile).
- Dark/editorial design system, single accent color (`#6ee7d8`), IBM
  Plex Mono for structural/technical elements, one deliberate animated
  moment (the homepage terminal prompt), reduced-motion respected via
  `@media (prefers-reduced-motion: reduce)` in `globals.css`.
- Mobile nav via a zero-JS `<details>/<summary>` disclosure (no
  hamburger JS needed).
- 404 handling both inside a locale (bilingual message) and outside one.

## Features NOT done / known gaps

1. **~~Fonts aren't actually loaded.~~** RESOLVED by GLM pass (2025-07-15).
   `next/font/google` now loads IBM Plex Sans and IBM Plex Mono with
   CSS variable integration in root layout.
2. **No OG image.** `openGraph`/`twitter` metadata has title+description
   but no image. A generated 1200×630 OG image (could reuse the terminal
   hero visual) would meaningfully improve link previews.
3. **`src/app/icon.svg` is a placeholder** (a plain `>_` glyph on a dark
   rounded square). Fine as a stand-in, worth a real design pass.
4. **`docs/CONTENT.md` "Pending content" section** — five projects
   (ghostSu, GhostLock, m3q, ConvertIt, JalepOS) are stubbed with no
   story. Don't invent their narratives; wait for real input from the
   site owner, then follow the pattern in `projects.ts`.
5. **No automated tests.** Nothing to break yet, but if page count grows,
   worth adding basic route-existence / build smoke tests in CI.
6. **~~`Footer.tsx` links to placeholder.~~** RESOLVED by GLM pass.
   Now links to `https://github.com/SudoXDdX/Who-Am-I`.
7. **No sitemap.xml.** Skipped because the final domain (custom domain
   vs `*.github.io/<repo>/`) wasn't known at build time. Easy to add
   once the domain is fixed — either a static `public/sitemap.xml` or a
   small generation script.
8. **`<html lang>` is static at the root**, not per-locale — see
   "`<html lang>` caveat" in `docs/ARCHITECTURE.md`. Acceptable trade-off
   for a fully static export; flag it if it becomes a real a11y blocker.

## Architectural decisions to respect

See `docs/DECISIONS.md` for the full log. The two that matter most if
you're touching content:

- **Security research content is under NDA** — never add specific
  vulnerable code paths, CWE/CVE/ticket numbers, or exploitation steps to
  the `mobile-memory-safety-research` project (or anywhere else in the
  repo). This is a hard constraint from the site owner's own bug bounty
  agreement, not a style preference.
- **No invented project narratives.** If you're tempted to flesh out one
  of the five pending/placeholder projects, don't guess — ask the site
  owner for real context first.

## Suggested next steps, in order

1. Verify the GitHub Actions deploy against a real Pages environment;
   fix `NEXT_PUBLIC_BASE_PATH` handling if the actual repo name changes
   anything.
2. Add real web fonts via `next/font`.
3. Generate and wire up an OG image.
4. Review copy for tone once more with the site owner — it was written
   from provided material but hasn't had a human proofread pass yet.
5. Once real content exists for any of the five pending projects, add
   their `story` and flip `pending` off.
6. Add a sitemap once the domain is final.

## Where things live (quick index)

- Content: `src/content/*.ts`
- Pages: `src/app/[locale]/**`
- Shared UI: `src/components/*.tsx`
- Design tokens: `src/app/globals.css` (`@theme` block)
- Deploy: `.github/workflows/deploy.yml`
- Docs: `docs/ARCHITECTURE.md`, `docs/CONTENT.md`, `docs/DECISIONS.md`,
  `docs/TODO.md`, `docs/REVIEW.md`, this file
