# Architecture

## Stack

- **Next.js 16** (App Router), TypeScript, Tailwind CSS v4
- `output: "export"` — the whole site is prerendered to static HTML at build
  time. There is no server, no API routes, no middleware. This is required
  for GitHub Pages.
- No content framework (no MDX, no CMS). Bilingual content lives in typed
  TypeScript objects under `src/content/`. This keeps PT/EN content
  structurally in sync — if a field is missing in one language, TypeScript
  will complain at build time.

## Routing / i18n

There's no i18n library. Locale is a plain route segment:

```
src/app/
  page.tsx                → "/" — client redirect to "/pt/" (default locale)
  not-found.tsx            → 404 outside any locale
  [locale]/
    layout.tsx              → validates locale, renders Nav + Footer
    page.tsx                 → home
    about/page.tsx
    timeline/page.tsx
    projects/page.tsx
    projects/[slug]/page.tsx
    stack/page.tsx
    lab/page.tsx
    not-found.tsx            → bilingual 404 inside a locale
```

`src/lib/i18n.ts` defines the two supported locales (`pt`, `en`), a type
guard (`isLocale`), and `localeParams()` used by every page's
`generateStaticParams()` so Next.js knows to prerender both `/pt/...` and
`/en/...` for every route.

Why a client-side redirect at `/`? Static export can't run server
redirects. A `<meta refresh>` or `useEffect` redirect is the standard
workaround for static multi-locale sites. The fallback link inside
`src/app/page.tsx` covers no-JS / crawler cases.

### `<html lang>` caveat

Because there's a single root `layout.tsx` shared by both locales, the
`<html lang="pt-BR">` attribute is set once, statically, at the root. The
actual `lang` for each locale's content is set on a wrapping `<div>` inside
`[locale]/layout.tsx` instead. This is a known limitation of doing i18n in a
fully static export without per-locale HTML documents — it's a reasonable
trade-off for a small bilingual site, but worth knowing about if an a11y
audit flags it.

## Content system

All biographical/project content lives in `src/content/`:

- `dictionary.ts` — UI strings (nav labels, section intros, status labels).
- `profile.ts` — (reserved; currently the About page pulls straight from
  `dictionary.ts`'s `about` key — see CONTENT.md if you want to split it out
  further).
- `timeline.ts` — the "how I got here" timeline entries.
- `projects.ts` — every project, with an optional `story` (the
  Context → Problem → Exploration → Build → Result → Lessons structure)
  used to render `/projects/[slug]`. Projects without a `story` only show
  a summary card and are not linked to a detail page.
- `stack.ts` — technologies grouped by domain.
- `lab.ts` — lab notebook entries (objective / what happened / result /
  lesson).

Every bilingual field follows the same shape: `{ pt: string; en: string }`.

## Styling

Design tokens (colors, fonts) are defined once in `src/app/globals.css`
under `@theme` (Tailwind v4's CSS-first config) and referenced everywhere
as CSS variables (`var(--color-accent)`, etc.) rather than hardcoded hex
values in components. If the palette needs to change, it changes in one
place.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and deploys
to GitHub Pages via `actions/deploy-pages`. It reads the repo's configured
base path from `actions/configure-pages` and passes it to the build as
`NEXT_PUBLIC_BASE_PATH`, which `next.config.ts` uses for `basePath` /
`assetPrefix`. This means the same code works for:

- a project page (`https://<user>.github.io/<repo>/`)
- a user/org page (`https://<user>.github.io/`)

without editing the config by hand — just enable "GitHub Actions" as the
Pages source in the repo settings.
