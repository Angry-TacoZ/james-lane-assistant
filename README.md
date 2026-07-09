# James Lane Assistant

A Firebase-hosted living-resume assistant that answers only from a deliberately curated, approved source corpus.

The corpus combines resume material with project evidence, representation guidance, and intentionally public context about working style, accessibility, and work design. That personal context helps explain the environments and tools where I do my best work; it is not a medical assessment or a substitute for evaluating my technical work and experience.

Approved source modules include:

- representation and communication rules
- role-fit, environment-fit, and work-design models
- project and portfolio evidence
- public writing, art/design, and live-project indexes

## Guarantees

- No web browsing or external search.
- Answers come only from approved resume excerpts, Markdown profile files, and curated data modules stored in the source corpus.
- If an answer is not explicitly supported, the assistant refuses with the required exact message.
- Each answer includes stable internal references such as `p1-summary`, `cognitive-profile-*`, or `p2-tools`.

## Commands

```powershell
npm install
npm run test
npm run verify
npm run build
```

## Firebase

1. Copy `.firebaserc.example` to `.firebaserc`.
2. Replace the placeholder project ID with a new Firebase project.
3. Run `firebase deploy --only hosting`.
