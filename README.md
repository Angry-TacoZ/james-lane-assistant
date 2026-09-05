# James AI

[James AI](https://james-lane-web-resume.web.app/) is James Lane's source-grounded living resume and portfolio. It gives visitors a way to explore his work, writing, projects, work-design context, and current resume through a bounded assistant instead of a static page alone.

The site is an employer-facing portfolio artifact. It is not a general web-search chatbot and does not claim knowledge beyond the approved public source corpus in this repository.

## What Visitors Can Do

- Ask source-backed questions about James's experience, working style, role fit, projects, writing, and accessibility context.
- Browse AI Engineering, Design, Writing, Health, Contact, and resume views.
- Open live projects, GitHub repositories, public writing, hosted portfolio media, and a downloadable resume PDF.
- Review the evidence used for the most recent assistant answer.
- Use an optional audio guide with play, pause, replay, close, and reopen controls on desktop and mobile.

## How Answers Work

1. The browser performs deterministic retrieval over the local corpus in `src/data/resumeCorpus.js`, the `docs/` source files, and curated portfolio data modules.
2. It selects a small set of approved excerpts and shows the matching evidence in the interface.
3. In the deployed site, the browser sends only those selected references and approved excerpts to the `synthesize` Firebase Function for Claude-backed conversational synthesis.
4. The Function validates every submitted reference, title, label, and excerpt against `functions/approved-source-allowlist.json` before calling the provider.
5. If synthesis is unavailable or rejected, the client returns a readable deterministic answer from the retrieved excerpts.

This design separates retrieval and access control from generative wording. Claude can make an answer easier to read, but it cannot retrieve arbitrary documents or use a browser-provided API key.

## Boundaries And Safeguards

- No general web browsing or external search is used for assistant answers.
- The Anthropic key is a Firebase Secret Manager secret named `ANTHROPIC_API_KEY`; it is not shipped to the browser.
- The Function accepts `POST` requests only from the deployed site origins, checks same-site fetch metadata and host, validates request size and shape, and limits requests with an in-memory per-instance rate limit.
- The Function restricts synthesis to approved source references and their exact allowlisted items.
- Published writing is treated as public writing and analysis, not hidden cognition or profile truth beyond what the text itself establishes.
- The assistant refuses questions that are outside the approved corpus rather than filling gaps with unsupported claims.

The per-instance rate limit is a lightweight abuse control, not a substitute for account-level quota, budget alerts, or global rate limiting if this site is expanded into a higher-traffic public service.

## Stack

- Vite and vanilla JavaScript
- Tailwind CSS
- Firebase Hosting and a Firebase Functions v2 HTTPS endpoint
- Anthropic Claude Haiku for server-side synthesis
- Vitest and Node's built-in test runner
- Playwright responsive browser checks
- GitHub Actions verification

## Local Setup

Requirements: Node.js 22 and npm.

```powershell
npm ci
npm --prefix functions ci
npx playwright install chromium
npm run verify:all
npm run dev
```

Local development intentionally uses the deterministic response path. A deployed synthesis endpoint is configured through `VITE_SYNTHESIZE_URL`; do not put an Anthropic key in any `VITE_*` variable.

## Verification

```powershell
npm run test
npm run test:functions
npm run build
npm run verify
npm run verify:responsive
npm run verify:all
```

`verify:all` regenerates the Functions allowlist, runs application and Functions tests, builds the site, exercises the retrieval evaluation set, and checks all primary routes plus the audio-guide flow at desktop and mobile viewports. GitHub Actions runs the same verification workflow on pull requests and pushes to `main`.

When changes affect the source corpus, commit the regenerated `functions/approved-source-allowlist.json` alongside the source change. It is part of the Function's server-side validation contract.

## Firebase Deployment

The Firebase project mapping is intentionally excluded from source control. For a new project:

```powershell
Copy-Item .firebaserc.example .firebaserc
# Replace the placeholder project ID in .firebaserc.
firebase functions:secrets:set ANTHROPIC_API_KEY
```

For a production release from reviewed `main`:

```powershell
npm run verify:all
powershell -ExecutionPolicy Bypass -File C:\Users\angry\.codex\sessions\scripts\predeploy-secret-scan.ps1 -Path <project-root>
firebase deploy --only "hosting,functions:synthesize"
```

Deploy Hosting and `synthesize` together when the approved corpus or allowlist changes. After deployment, verify the live site and its primary assistant flow before calling the release complete.

## Public Resources

- Live site: [james-lane-web-resume.web.app](https://james-lane-web-resume.web.app/)
- Custom domain: [jamesai.space](https://jamesai.space/)
- AI-readable summary: [`/llms.txt`](https://jamesai.space/llms.txt)
- Expanded AI-readable context: [`/llms-full.txt`](https://jamesai.space/llms-full.txt)
- Resume PDF: [`/resume/James-Lane-Resume.pdf`](https://jamesai.space/resume/James-Lane-Resume.pdf)
- Privacy notice: [`/privacy.html`](https://jamesai.space/privacy.html)
