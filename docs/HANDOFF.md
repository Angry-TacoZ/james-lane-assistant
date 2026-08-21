# Goal

Keep James AI's public portfolio and source-bound assistant aligned with the supplied resume and verified public GitHub work.

# Current status

PR #7 is an open draft based on `main` at `fda8be5`. Its branch includes the post-PR #7 Blue curated-journey release at `06e3e01`.

# Decisions

- Use public repository documentation and commits as the evidence source for post-resume project changes.
- Describe Blue's checkout as a labeled local simulation, never as commerce or payment capability.

# Changed files

- Updated Blue's project card, static fallbacks, AI-readable portfolio, and LLM context with the curated-shortlist-to-checkout-simulation flow.
- Added a dedicated approved-source corpus entry for the current public Blue README and a retrieval regression question.
- Regenerated the Firebase Functions approved-source allowlist.

# Verification

- Canonical project verification passed on 2026-08-20: 55 application tests, 4 Functions tests, production build, corpus smoke checks, and mobile/desktop responsive browser checks.
- Public-artifact secret/API exposure scan passed.
- GitHub Actions Verify passed for the PR branch at `06e3e01` on 2026-08-21.

# Next task

- Review and merge PR #7 when the portfolio update is approved. Deploy only after merge.

# Risks or blockers

- Blue's checkout is a labeled local simulation. Do not describe it as a payment, reservation, inventory, or commerce integration.
- No newly created public repositories were found after the last PR #7 update. Blue is the only confirmed substantive public project change.
