import { describe, expect, it } from "vitest";
import { askAssistant } from "../src/lib/retrieval.js";
import { retrievalEvaluationCases } from "../scripts/retrieval-evaluation-cases.mjs";

describe("retrieval evaluation cases", () => {
  it.each(retrievalEvaluationCases)("routes $name to the expected approved sources", (evaluationCase) => {
    const response = askAssistant(evaluationCase.question, [], evaluationCase.options);
    const refs = response.matches.map((match) => match.ref);

    expect(response.refused).toBe(false);
    expect(response.intent).toBe(evaluationCase.expectedIntent);
    expect(refs[0]).toBe(evaluationCase.expectedFirstRef);

    for (const ref of evaluationCase.requiredRefs) {
      expect(refs).toContain(ref);
    }

    for (const ref of evaluationCase.forbiddenRefs) {
      expect(refs).not.toContain(ref);
    }
  });
});
