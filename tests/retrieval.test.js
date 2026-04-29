import { describe, expect, it } from "vitest";
import { refusalMessage } from "../src/data/resumeCorpus.js";
import { askAssistant } from "../src/lib/retrieval.js";

describe("James AI retrieval", () => {
  it("answers direct factual contact questions from the approved resume", () => {
    const response = askAssistant("What is James Lane's email address?");

    expect(response.refused).toBe(false);
    expect(response.answer).toContain("tiburo13@gmail.com");
    expect(response.answer).toContain("[p1-contact]");
  });

  it("answers environment-fit questions from the markdown docs", () => {
    const response = askAssistant("What kinds of environments are the best fit for James Lane?");

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/environment|fit|manager|latitude|process improvement/i);
    expect(response.answer).toContain("[environment-fit-model-");
  });

  it("answers tradeoff questions from the markdown docs", () => {
    const response = askAssistant("What are James Lane's main tradeoffs or friction points?");

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/ambiguity|precision|friction|intensity/i);
    expect(response.answer).toContain("[friction-points-and-tradeoffs-");
  });

  it("answers evidence-pattern questions", () => {
    const response = askAssistant("What evidence shows how James Lane works?");

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/build|artifact|AI|workflow/i);
    expect(response.answer).toContain("[evidence-and-projects-");
  });

  it("prioritizes business-facing AI and process-improvement evidence over game-dev examples for broad employer-facing questions", () => {
    const response = askAssistant("What projects best show James Lane's AI and process-improvement work?", [], {
      modeId: "evidence",
      preferredIntent: "evidence"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/proposal|pilot|FAQ assistant|regulatory assistant|workflow/i);
    expect(response.answer).not.toMatch(/^Iron Tides is one of James's most developed creative-technical projects\./i);
  });

  it("returns live project links from the new projects lens", () => {
    const response = askAssistant("What live projects can I review?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toContain("https://james-lane-web-resume.web.app/");
    expect(response.answer).toContain("https://iron-shores.web.app/");
    expect(response.answer).toContain("https://cruisnpa.fun/");
    expect(response.answer).toContain("https://xtige-app.web.app/");
    expect(response.answer).toContain("https://github.com/Angry-TacoZ/vast-lands");
    expect(response.answer).toContain("https://github.com/Angry-TacoZ/ww2-battleship-prototype");
    expect(response.answer).toContain("https://github.com/Angry-TacoZ/dep-graph");
    expect(response.answer).toContain("[live-project-links-index]");
  });

  it("lists James's published writing from the writing lens", () => {
    const response = askAssistant("What has James Lane written on Medium?", [], {
      modeId: "writing",
      preferredIntent: "writing"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/P\(doom\) or Big Boon|Ode to Miata|Et tu, Mom|The Constitution needs you/i);
    expect(response.answer).toContain("[writing-catalog]");
  });

  it("retrieves the AI essay as published writing rather than profile cognition", () => {
    const response = askAssistant("What is P(doom) or Big Boon about?", [], {
      modeId: "writing",
      preferredIntent: "writing"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/published public AI-analysis piece|hallucinations|AGI|web-search gaps/i);
    expect(response.answer).toContain("[writing-p-doom-or-big-boon]");
  });

  it("answers the public-writing boundary question explicitly", () => {
    const response = askAssistant("Are these writing samples opinion pieces or internal cognition?", [], {
      modeId: "writing",
      preferredIntent: "writing"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/published public writing|not.*internal cognition|not.*private thoughts/i);
    expect(response.answer).toContain("[writing-boundary]");
  });

  it("surfaces linked supporting analysis without mislabeling it as a Medium article", () => {
    const response = askAssistant("What was the full ChatGPT analysis linked from The Constitution needs you?", [], {
      modeId: "writing",
      preferredIntent: "writing"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/supporting analysis|research memo|denaturalization|Overton window|not a James-authored Medium article/i);
    expect(response.answer).toContain("[writing-support-constitution-linked-denaturalization-analysis]");
  });

  it("handles broad named-project questions for resume-backed deployed projects", () => {
    const response = askAssistant("What can you tell me about Iron Shores?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/Iron Shores|playable demo|bullet-hell|tank roguelite/i);
    expect(response.answer).toContain("[p2-project-iron-shores-playable-demo]");
  });

  it("handles broad named-project questions for hosted portfolio media projects", () => {
    const response = askAssistant("What can you tell me about Iron Tides?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/Iron Tides|Hosted media URL|portfolio video|Godot|animation|wooden decks|battleship/i);
    expect(response.answer).toContain("[portfolio-media-index-");
  });

  it("handles broad named-project questions for the rest of the live project catalog", () => {
    const response = askAssistant("Tell me about the BLKVue AI Security Intake Bot.", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/BLKVue|security intake|risk assessments|target security company's own website/i);
    expect(response.answer).toContain("[p2-project-blkvue-ai-security-intake-bot]");
  });

  it("handles broad named-project questions for Cruis'n PA", () => {
    const response = askAssistant("What can you tell me about Cruis'n PA?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/Cruis'?n PA|driving club|custom weekly routes|mystery dessert|restaurant finish/i);
    expect(response.answer).toContain("[p2-project-cruisn-pa]");
  });

  it("handles named questions for repo-backed showcase artifacts", () => {
    const vastResponse = askAssistant("What can you tell me about Vast Lands?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });
    const xtigeResponse = askAssistant("What can you tell me about X'TIGE?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });
    const ww2Response = askAssistant("What can you tell me about the WW2 horde survival prototype?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });
    const benchmarkResponse = askAssistant("What can you tell me about the benchmarking tool?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });

    expect(vastResponse.refused).toBe(false);
    expect(vastResponse.answer).toMatch(/Vast Lands|Babylon\.js|city-state builder|resident needs/i);
    expect(vastResponse.answer).toContain("[github-project-vast-lands]");
    expect(xtigeResponse.refused).toBe(false);
    expect(xtigeResponse.answer).toMatch(/X'TIGE|car-first social app|Garage|Bounties|Firebase/i);
    expect(xtigeResponse.answer).toContain("[github-project-xtige]");
    expect(ww2Response.refused).toBe(false);
    expect(ww2Response.answer).toMatch(/Iron Horizon|WW2-inspired|naval combat|aircraft threats|torpedoes/i);
    expect(ww2Response.answer).toContain("[github-project-iron-horizon-ww2-battleship]");
    expect(benchmarkResponse.refused).toBe(false);
    expect(benchmarkResponse.answer).toMatch(/Composio Dependency Graph|prerequisite inputs|precursor tools|risk-confirmation/i);
    expect(benchmarkResponse.answer).toContain("[github-project-composio-dependency-graph]");
  });

  it("surfaces hosted Iron Tides media through the projects lens without exposing local file paths", () => {
    const response = askAssistant("What Iron Tides portfolio examples can I watch?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/Iron Tides|Godot|animation|wooden decks|battleship/i);
    expect(response.answer).toContain("[portfolio-media-index-");
    expect(response.answer).toMatch(/https:\/\/james-lane-web-resume\.web\.app\/portfolio\/iron-tides\//i);
    expect(response.answer).not.toMatch(/C:\\Users\\angry/i);
  });

  it("answers broad role-family fit questions with actual role families", () => {
    const response = askAssistant("What roles look like a strong fit versus a stretch fit for James Lane?");

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/process analysis|business analysis|workflow design|operations improvement/i);
    expect(response.answer).toMatch(/strong fit|stretch fit/i);
    expect(response.answer).toContain("[role-fit-model-");
  });

  it("answers work location preference questions", () => {
    const response = askAssistant("What is James Lane's work location preference?");

    expect(response.refused).toBe(false);
    expect(response.answer).toContain("Remote work is generally the best fit");
    expect(response.answer).toContain("[core-identity-work-location-preference]");
  });

  it("answers natural best-at questions from the approved sources", () => {
    const response = askAssistant("What is James best at?");

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/systems|reasoning|process improvement|strength/i);
    expect(response.answer).toMatch(/\[(cognitive-profile|core-identity|p1-core-strengths|evidence-and-projects)-?/) ;
  });

  it("uses the corrected current CBC title in retrieval answers", () => {
    const response = askAssistant("What is James Lane's current role at Capital Blue Cross?");

    expect(response.refused).toBe(false);
    expect(response.answer).toContain("Claims Examiner I");
    expect(response.answer).not.toContain("Claims Operations Analyst");
  });

  it("uses recent user context for follow-up tool questions", () => {
    const history = [
      {
        role: "user",
        content: "Tell me about James Lane's tools and data work."
      }
    ];

    const response = askAssistant("What about SQL and Power BI?", history);

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/Power BI|SQL/i);
    expect(response.answer).toContain("[p2-tools]");
  });

  it("supports broader fit questions when fit mode is active", () => {
    const response = askAssistant("How can James adapt when a role is a stretch fit?", [], {
      modeId: "fit",
      preferredIntent: "roleFit"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/ramp|learning|stretch fit|reasoning/i);
    expect(response.answer).toContain("[role-fit-model-");
  });

  it("pulls concrete BA and analytics evidence for broad business analyst fit questions", () => {
    const response = askAssistant("How would James do in a business analyst job?", [], {
      modeId: "profile",
      preferredIntent: "identity"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/business analysis|requirements|process mapping|workflow/i);
    expect(response.answer).toMatch(/Power BI|SQL|Tableau|analytics|reporting/i);
    expect(response.answer).toMatch(/\[(p1-core-strengths|p2-tools|p1-summary|core-identity|role-fit-model)-/);
  });

  it("handles adjacent hiring-manager phrasing for analyst-style work", () => {
    const response = askAssistant("Would James be a good fit for work focused on requirements, workflow design, and reporting?", [], {
      modeId: "profile",
      preferredIntent: "identity"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/requirements|workflow|reporting|process mapping/i);
    expect(response.answer).toMatch(/Power BI|SQL|analytics|documentation/i);
    expect(response.answer).toMatch(/\[(p1-summary|p1-core-strengths|p2-tools|p1-exp-capital-blue-cross|p1-exp-randstad-icu-medical|core-identity|environment-fit-model|role-fit-model)-/);
  });

  it("handles broader job-fit questions for roles without a custom keyword pack", () => {
    const response = askAssistant("Would James be good at developer relations?", [], {
      modeId: "fit",
      preferredIntent: "roleFit"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/stakeholder explanations|training-oriented documentation|public-facing|published public AI-analysis piece|accessible explanation|writing/i);
    expect(response.answer).toMatch(/\[(p1-summary|p1-core-strengths|core-identity|evidence-and-projects|writing-p-doom-or-big-boon|cognitive-profile|role-fit-model)-/);
  });

  it("handles generic engineering-title fit questions with conditional evidence instead of refusing", () => {
    const response = askAssistant("How would James be as a software engineer 1?", [], {
      modeId: "fit",
      preferredIntent: "roleFit"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/prototype|deployment|React|Vite|Phaser|Firebase|build|technical troubleshooting|software engineering breadth/i);
    expect(response.answer).toMatch(/\[(p1-summary|p1-core-strengths|p2-tools|evidence-and-projects|core-identity|cognitive-profile|role-fit-model)-/);
  });

  it("uses communication and presentation evidence for meeting-leadership questions", () => {
    const response = askAssistant("Can James lead meetings?", [], {
      modeId: "fit",
      preferredIntent: "roleFit"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/communication|leadership|presentation|written|structured|live verbal/i);
    expect(response.answer).not.toMatch(/Assess role fit using the following dimensions/i);
    expect(response.answer).toMatch(/\[(evidence-and-projects|cognitive-profile|friction-points-and-tradeoffs|environment-fit-model|role-fit-model|p1-exp-capital-blue-cross)-/);
  });

  it("keeps workplace politics questions in scope when the sources cover them", () => {
    const response = askAssistant("How does James handle internal workplace politics?", [], {
      modeId: "fit",
      preferredIntent: "environment"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/politics|clarity|environment|mismatch/i);
  });

  it("answers credential-gap hiring questions from the approved sources", () => {
    const response = askAssistant("Why hire James if there are other candidates with college degrees?", [], {
      modeId: "fit",
      preferredIntent: "roleFit"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/nontraditional|credential|degree|reasoning|interaction|work samples|resume/i);
    expect(response.answer).toMatch(/\[(core-identity|role-fit-model)-/);
    expect(response.answer).not.toMatch(/Credentials do not matter|James can do anything if given a chance/i);
  });

  it("refuses unsupported comparison questions", () => {
    const response = askAssistant("How does James Lane compare with other business analysts?");

    expect(response.refused).toBe(true);
    expect(response.answer).toBe(refusalMessage);
  });

  it("refuses unsupported medical questions", () => {
    const response = askAssistant("What medical advice would James Lane give for burnout?");

    expect(response.refused).toBe(true);
    expect(response.answer).toBe(refusalMessage);
  });
});
