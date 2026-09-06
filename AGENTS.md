# James Memory Workflow

## Default Skill

Use the `james-memory` skill by default for work in this repository. Treat it as the standing collaboration profile for James Lane unless the user explicitly overrides it.

## Memory Maintenance

When new information appears that is durable, cross-project relevant, and likely to improve future collaboration or representation, update the relevant file under `C:\Users\angry\.codex\memories\james-lane\` and keep `C:\Users\angry\.codex\memories\james-lane-memory-index.md` accurate if the structure changes.

Use `C:\Users\angry\.codex\memories\james-lane-memory-pack.md` as the preserved full archive, not the default update target.

Do not store temporary project trivia, speculative claims, secrets, or one-off conversational details as memory.

## Project Coordination

Use GitHub as the shared source of truth for project coordination. Track meaningful work in focused pull requests, and keep the PR description current with scope, validation, risks, and deployment status. Treat commits, pull-request review state, and GitHub Actions checks as the authoritative record of what changed and what is ready to merge. After a PR merges, fast-forward local `main` to match `origin/main` before beginning follow-up work.

## Claude Synthesis Operational Check

Maintain one open GitHub issue titled `Claude Synthesis Operational Log` in this repository. It is the authoritative record for whether the public assistant can currently use the secured Claude synthesis path.

At the beginning of every new task, read the most recent successful check in that issue before making changes:

- If it is less than 14 days old, continue the task without repeating the live check.
- If it is 14 days old or older, or the latest result is failed, missing, or inconclusive, run a safe end-to-end production check before continuing the task.
- A check is end-to-end only when it uses the deployed public site, sends a fixed non-sensitive question that is eligible for synthesis, confirms the browser calls the same-origin `/api/synthesize` route, and confirms the response is synthesized rather than the deterministic fallback. Function unit tests, a direct function health check, a local preview, or a successful build do not satisfy this requirement.
- After every live check, add a comment to the operational-log issue with the timestamp in America/New_York time, deployed site URL and release/commit when known, pass/fail result, concise evidence, and any changes made. Record no API keys, secrets, personal prompts, raw response bodies, or sensitive error details.
- If the check fails, do not claim Claude synthesis is active. Diagnose the browser build configuration, Hosting rewrite, Function deployment, secret availability, CORS/origin controls, and provider response path before deploying or describing the feature as working.

## Verification Workflow

For UI changes, run the responsive verification before considering the task done:

```powershell
npm run build
npm run verify:responsive
```

For deploys or broad changes, run the full local gate:

```powershell
npm run verify:all
```

`verify:responsive` loads every major route in mobile and desktop viewports, checks expected navigation, catches horizontal overflow, and verifies the audio guide access flow on both viewport classes.
