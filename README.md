# James Lane Assistant

A Firebase-hosted living-resume assistant that answers only from the approved local source corpus.

Current resume source:

- `C:\Users\angry\Downloads\Resumes Job Search and Consulting\James_Lane_Resume_dy_Full_t_v2.pdf`

Additional approved sources are bundled as Markdown/data files in this repository, including:

- condensed cognitive/profile guidance in `docs/cognitive-profile.md`
- representation and communication rules in `docs/communication-rules.md`
- role-fit and environment-fit models in `docs/role-fit-model.md` and `docs/environment-fit-model.md`
- evidence/project context in `docs/evidence-and-projects.md`
- health, accessibility, and work-design context in `docs/health-and-neurodivergence-context.md`
- public writing, art/design, live-project, and portfolio indexes

## Guarantees

- No web browsing or external search.
- Answers come only from approved resume excerpts, Markdown profile files, and curated local data modules stored in the source corpus.
- If an answer is not explicitly supported, the assistant refuses with the required exact message.
- Each answer includes stable internal references such as `p1-summary`, `cognitive-profile-*`, or `p2-tools`.

## Commands

```powershell
npm install
npx playwright install chromium
npm run test
npm run test:functions
npm run verify
npm run build
npm run verify:responsive
npm run verify:all
```

- `verify:responsive` builds on the current `dist` output by starting a local preview and checking each major route on mobile and desktop viewports.
- `verify:all` runs the source allowlist generation, unit tests, function tests, build, answer smoke check, and responsive browser check.
- Playwright-managed Chromium must be installed once with `npx playwright install chromium`. CI installs Chromium and its Linux system dependencies before running the full gate.

## Firebase

1. Copy `.firebaserc.example` to `.firebaserc`.
2. Replace the placeholder project ID with a new Firebase project.
3. Run `firebase deploy --only hosting`.
