# Goal

Keep James AI's public portfolio and source-bound assistant aligned with the supplied resume and verified public GitHub work.

# Current status

PR #7 merged into `main` at `fe39e36` on 2026-08-21. It includes the post-PR #7 Blue curated-journey release and the Capital Blue Cross retrieval disambiguation.

# Decisions

- Use public repository documentation and commits as the evidence source for post-resume project changes.
- Describe Blue's checkout as a labeled local simulation, never as commerce or payment capability.
- Treat `Capital Blue Cross` as an experience-only phrase. Its shared `Blue` token must not route to or retrieve the Blue shopping project.

# Changed files

- Updated Blue's project card, static fallbacks, AI-readable portfolio, and LLM context with the curated-shortlist-to-checkout-simulation flow.
- Added a dedicated approved-source corpus entry for the current public Blue README and a retrieval regression question.
- Regenerated the Firebase Functions approved-source allowlist.
- Narrowed the Blue entity matcher and excluded Blue project sections from Capital Blue Cross questions; added a regression test for intent and source selection.

# Verification

- Canonical project verification passed on 2026-08-20: 56 application tests, 4 Functions tests, production build, corpus smoke checks, and mobile/desktop responsive browser checks.
- Public-artifact secret/API exposure scan passed.
- GitHub Actions Verify passed for the reviewed PR head `0d5e6e8` on 2026-08-21.
- After merge, local `main` was fast-forwarded and matches `origin/main` at `fe39e36`.

# Next task

- Deploy only when explicitly requested, then verify the live site separately from the merged source state.

# Risks or blockers

- Blue's checkout is a labeled local simulation. Do not describe it as a payment, reservation, inventory, or commerce integration.
- No newly created public repositories were found after the last PR #7 update. Blue is the only confirmed substantive public project change.
- No merge blocker remains for PR #7. Deployment has not been requested or performed.
