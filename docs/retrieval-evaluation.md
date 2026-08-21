# Retrieval Evaluation

James AI uses deterministic intent routing and source selection before optional Claude synthesis.

## Gate

`npm run verify` evaluates the cases in `scripts/retrieval-evaluation-cases.mjs` before printing broader smoke questions. Each case asserts:

- expected intent
- first selected source
- required source IDs
- forbidden source IDs
- no refusal for in-scope prompts

The command exits nonzero on a mismatch, so GitHub Actions Verify blocks a routing or source-selection regression.

## Coverage

The current cases protect the important Blue ambiguity boundary: named Blue prompts must select Blue project evidence even when they also contain broad art or design wording. They also ensure Capital Blue Cross remains experience-only and generic design questions remain in the art and design catalog.

## Performance

The corpus is static during a browser session. Retrieval caches normalized text and expanded keywords for each corpus section, then computes question-specific tokens and entity matches once per request. This keeps matching deterministic while avoiding repeated parsing of the same source entries.

The evaluation set is intentionally small and behavioral, not a claim of a global accuracy percentage. Add a case whenever a real prompt reveals a routing or source-selection defect.
