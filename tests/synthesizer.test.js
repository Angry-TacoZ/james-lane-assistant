import { describe, expect, it } from "vitest";
import { formatFallbackAnswer } from "../src/lib/synthesizer.js";

describe("synthesis fallback formatting", () => {
  it("keeps internal source references out of visitor-facing fallback copy", () => {
    const answer = formatFallbackAnswer([
      {
        ref: "core-identity-career-direction",
        title: "Career Direction",
        items: ["Workflow design", "Supporting resources:"]
      }
    ]);

    expect(answer).toBe("Career Direction: Workflow design");
    expect(answer).not.toContain("core-identity-career-direction");
    expect(answer).not.toMatch(/\[[^\]]+\]/);
  });
});
