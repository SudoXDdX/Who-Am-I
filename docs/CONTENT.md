# Content

## Rules this project follows

These aren't arbitrary — they come directly from the project brief and
should be preserved by anyone (human or AI) editing content:

1. **No invented facts.** Every claim in `timeline.ts`, `projects.ts`,
   and `lab.ts` is based on material that was actually provided. Where
   something wasn't confirmed (exact dates, implementation details of
   unfinished projects), it's phrased loosely ("Em andamento", "2026")
   instead of a fabricated specific.
2. **Project status is honest.** `ProjectStatus` in `projects.ts` is
   `idea | prototype | research | active | delivered | parked`. Don't
   bump a project's status without a real reason — an idea doesn't become
   a prototype because it would look better on the site.
3. **No exploit-level security detail.** The Samsung/mobile kernel
   research project (`mobile-memory-safety-research` in `projects.ts`) is
   intentionally vague on file names, function names, CWE numbers, ticket
   IDs, and reproduction steps. That research is **under an active
   responsible-disclosure agreement (NDA) until a vendor patch ships** —
   do not add ticket IDs, CVE/SVE numbers, PoC code, or exploitation
   steps to this file or anywhere else in the public repo.
4. **No private personal data.** No home address, no precise geolocation,
   no family financial details, no school-issued private records, no
   full legal name tied to "SuXD" without explicit, deliberate confirmation
   from the site owner that they want that link public. Default to the
   pseudonym.
5. **Bilingual means both, fully.** If you add a field to `timeline.ts`,
   `projects.ts`, `lab.ts`, or `dictionary.ts`, TypeScript will error if
   you forget the `en` (or `pt`) counterpart, because these are typed as
   `{ pt: string; en: string }`. Don't work around that by leaving a
   placeholder string like `"TODO"` — either write both or don't add the
   field yet.

## Pending content (needs real input from the site owner)

These projects are named in the original brief but there's no verified
detail to describe them beyond a name — they're stubbed in
`projects.ts` with `status: "idea"` and `pending: true`, no `story`, and
therefore no detail page:

- **ghostSu**
- **GhostLock**
- **m3q**
- **ConvertIt**
- **JalepOS** — the brief is explicit that this should *not* be presented
  as a finished operating system; keep it framed as a conceptual/branding
  extension of JALEP unless there's real implementation to point to.

To flesh one of these out: add a `story` object to its entry in
`projects.ts` (see `jalep` or `mobile-memory-safety-research` for the
shape), update its `status`, and it will automatically get a detail page
at `/projects/<slug>/` and a "view details" link on the projects list —
`generateStaticParams()` in
`src/app/[locale]/projects/[slug]/page.tsx` picks up any project with a
`story` automatically.

## Where each page's copy lives

| Page | File(s) |
|---|---|
| Nav / footer / shared UI strings | `src/content/dictionary.ts` |
| Home hero + section previews | `dictionary.ts` → `home` key |
| About | `dictionary.ts` → `about` key |
| Timeline | `src/content/timeline.ts` |
| Projects list + detail | `src/content/projects.ts` |
| Stack | `src/content/stack.ts` |
| Lab | `src/content/lab.ts` |

## Style/voice notes for future edits

- First person is used inside content (timeline, about), matching how the
  site owner described their own journey — keep that voice.
- Avoid inflated titles ("elite hacker", "expert"). The brief is explicit
  about this: the work should speak for itself.
- Avoid fake precision (percentages, made-up metrics, skill bars).
