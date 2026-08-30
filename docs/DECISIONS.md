# Decisions

Short log of choices made and why, so they aren't re-litigated or
accidentally reverted.

## i18n without a library

Considered `next-intl` / `next-i18next`. Decided against: the site is
small (6 pages × 2 locales), and a locale-typed plain object
(`dictionary.ts`) plus a `[locale]` route segment gives full type safety
with zero extra dependencies and no config surface to get wrong on a
static export. Revisit only if the page count grows a lot.

## Root `/` is a client-side redirect

Static export (`output: "export"`) can't run a server redirect. Chose a
small client component over alternatives:
- **`<meta http-equiv="refresh">`** — works with zero JS but has a visible
  flash/delay and is worse for SEO signal clarity.
- **Duplicating the home page content at `/`** — rejected, it would mean
  maintaining two copies of the homepage (once localized, once not) and
  ambiguous canonical URLs.

Went with `useEffect` + `window.location.replace` plus a plain `<a>`
fallback for no-JS/crawlers.

## Tailwind v4, CSS-first theme

Used `@theme` in `globals.css` instead of a `tailwind.config.ts` file —
this is the current recommended Tailwind v4 pattern and keeps all design
tokens in one readable place.

## Dark, editorial, terminal-as-language (not terminal-as-UI)

The brief explicitly warned against "hacker movie UI" and a fully fake
terminal interface. The terminal motif is used in exactly one place (the
homepage hero prompt) as a single deliberate visual moment, not as page
chrome. Everywhere else uses ordinary web typography and layout.

## No skill bars / percentages

The brief explicitly asked to avoid "porcentagens falsas" (fake skill
percentages). The Stack page lists tools as plain tags grouped by domain,
with no invented proficiency metric.

## Security research: conceptual disclosure only

The mobile kernel research project is under an active NDA with the vendor
(see CONTENT.md). The site describes *what kind* of research happened and
*what was learned*, never the specific vulnerable code path, CWE/CVE/ticket
numbers, or reproduction steps. This is a hard constraint, not a style
choice — don't relax it even if asked to "add more technical detail" to
that page without confirming the NDA/patch status has changed first.

## Placeholder projects instead of invented ones

`ghostSu`, `GhostLock`, `m3q`, `ConvertIt`, and `JalepOS` were named in the
brief without enough verified detail to write an honest project story.
Rather than invent context/problem/build narratives for them (which the
brief explicitly forbids — "não invente detalhes"), they're listed with a
name, a one-line honest summary, and `status: "idea"`, with no detail page
until real input is available. See CONTENT.md → "Pending content".
