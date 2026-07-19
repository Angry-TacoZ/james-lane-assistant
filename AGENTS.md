# James Memory Workflow

## Default Skill

Use the `james-memory` skill by default for work in this repository. Treat it as the standing collaboration profile for James Lane unless the user explicitly overrides it.

## Memory Maintenance

When new information appears that is durable, cross-project relevant, and likely to improve future collaboration or representation, update the relevant file under `C:\Users\angry\.codex\memories\james-lane\` and keep `C:\Users\angry\.codex\memories\james-lane-memory-index.md` accurate if the structure changes.

Use `C:\Users\angry\.codex\memories\james-lane-memory-pack.md` as the preserved full archive, not the default update target.

Do not store temporary project trivia, speculative claims, secrets, or one-off conversational details as memory.

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
