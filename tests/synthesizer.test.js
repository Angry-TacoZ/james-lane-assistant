import { describe, expect, it } from "vitest";
import {
  SYNTHESIS_ENDPOINT,
  canUseRemoteSynthesis,
  formatFallbackAnswer
} from "../src/lib/synthesizer.js";

describe("synthesis endpoint routing", () => {
  it("uses the same-origin endpoint for deployed hosts while preserving local deterministic preview behavior", () => {
    expect(SYNTHESIS_ENDPOINT).toBe("/api/synthesize");
    expect(canUseRemoteSynthesis("jamesai.space")).toBe(true);
    expect(canUseRemoteSynthesis("james-lane-web-resume.web.app")).toBe(true);
    expect(canUseRemoteSynthesis("localhost")).toBe(false);
    expect(canUseRemoteSynthesis("127.0.0.1")).toBe(false);
  });
});

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
