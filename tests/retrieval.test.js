import { describe, expect, it } from "vitest";
import { refusalMessage, sourceCorpus } from "../src/data/resumeCorpus.js";
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

  it("answers vague example follow-ups from recent context instead of refusing", () => {
    const response = askAssistant(
      "give me an example",
      [
        {
          role: "user",
          content: "Who is James Lane as a candidate?"
        },
        {
          role: "assistant",
          content:
            "James is a nontraditional candidate whose strongest value appears in reasoning-heavy, improvement-oriented work."
        }
      ],
      {
        modeId: "profile",
        preferredIntent: "identity"
      }
    );

    expect(response.refused).toBe(false);
    expect(response.effectiveQuestion).toMatch(/Who is James Lane as a candidate\?.*give me an example/s);
    expect(response.answer).toMatch(/proposal|assistant|workflow|project|artifact|process|build/i);
    expect(response.answer).not.toBe(refusalMessage);
  });

  it("uses concrete approved work examples for broad example requests", () => {
    const response = askAssistant("Give me a concrete example of James applying systems thinking to a problem.", [], {
      modeId: "evidence",
      preferredIntent: "evidence"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/proposal|assistant|workflow|legislation|LQRI|CogFit|artifact/i);
    expect(response.answer).not.toMatch(/need.*source material|specific example|meaningful example/i);
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
  const response = askAssistant("What can you tell me about Masters of Metal?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });

    expect(response.refused).toBe(false);
  expect(response.answer).toMatch(/Masters of Metal|playable demo|bullet-hell|tank roguelite/i);
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

  it("answers questions about James's design and artwork portfolio", () => {
    const response = askAssistant("Does James have any design work or logo animation examples?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/Art & Design|DeFiLlama|CogFit|logo animation|Cruis'?n PA|visual/i);
    expect(response.answer).toContain("[art-design-catalog]");
    expect(response.answer).not.toContain("[live-project-links-index]");
  });

  it("uses self-disclosed AuDHD context for strengths and weaknesses when relevant", () => {
    const response = askAssistant("How do James's AuDHD diagnoses affect his strengths and weaknesses?", [], {
      modeId: "fit",
      preferredIntent: "healthContext"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/AuDHD|autism|ADHD|executive-function|sensory|social-cue/i);
    expect(response.answer).toMatch(/strength|weakness|friction|systems|pattern/i);
    expect(response.answer).toContain("[health-and-neurodivergence");
  });

  it("uses physical health context for remote and onsite role-fit questions", () => {
    const response = askAssistant("Why does James prefer remote or hybrid roles instead of fully onsite jobs?", [], {
      modeId: "fit",
      preferredIntent: "workLocation"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/remote|hybrid/i);
    expect(response.answer).toMatch(/diabetic neuropathy|collapsed diaphragm|commut|onsite|physical/i);
    expect(response.answer).toContain("[work-location-preference");
    expect(response.answer).toContain("[health-and-neurodivergence");
  });

  it("answers specific physical-health accommodation questions from the health lens", () => {
    const response = askAssistant("What accommodations would help James with Charcot foot and peripheral neuropathy?", [], {
      modeId: "fit",
      preferredIntent: "healthContext"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/Charcot foot|peripheral neuropathy|standing|walking|remote|hybrid|accessible/i);
    expect(response.answer).toContain("[health-accommodations-charcot-foot]");
  });

  it("answers diabetes and insulin accommodation questions from the health lens", () => {
    const response = askAssistant("What workplace accommodations help James manage insulin-dependent Type 2 diabetes?", [], {
      modeId: "fit",
      preferredIntent: "healthContext"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/Type 2 diabetes|insulin|glucose|breaks|food|medication|supplies/i);
    expect(response.answer).toContain("[health-accommodations-type-2-diabetes-insulin]");
  });

  it("uses the ADHD perceptual-load versus cognitive-load framing when asked", () => {
    const response = askAssistant("How does ADHD executive dysfunction affect James at work?", [], {
      modeId: "fit",
      preferredIntent: "healthContext"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/ADHD|executive-function|perceptual-load|cognitive-load|context switching|single source of truth/i);
    expect(response.answer).toContain("[health-accommodations-adhd-executive-dysfunction]");
  });

  it("answers cancer remission accommodation questions without turning them into medical advice", () => {
    const response = askAssistant("How should an employer accommodate James's colon cancer remission?", [], {
      modeId: "fit",
      preferredIntent: "healthContext"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/colon cancer|remission|appointments|restroom|confidential|current ability/i);
    expect(response.answer).toContain("[health-accommodations-colon-cancer-remission]");
    expect(response.answer).not.toMatch(/treatment plan|prognosis/i);
  });

  it("recommends source links for condition-specific health questions", () => {
    const charcotResponse = askAssistant("What sources support James's Charcot foot accommodations?", [], {
      modeId: "health",
      preferredIntent: "healthContext"
    });
    const diabetesResponse = askAssistant("Recommend sources for insulin-dependent Type 2 diabetes workplace accommodations.", [], {
      modeId: "health",
      preferredIntent: "healthContext"
    });

    expect(charcotResponse.refused).toBe(false);
    expect(charcotResponse.answer).toContain("https://my.clevelandclinic.org/health/diseases/15836-charcot-foot");
    expect(charcotResponse.answer).toContain("https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/nerve-damage-diabetic-neuropathies");
    expect(diabetesResponse.refused).toBe(false);
    expect(diabetesResponse.answer).toContain("https://diabetes.org/advocacy/know-your-rights/reasonable-accommodations");
    expect(diabetesResponse.answer).toContain("https://www.cdc.gov/diabetes/about/about-type-2-diabetes.html");
  });

  it("supports health-lens follow-up resource questions", () => {
    const history = [
      {
        role: "user",
        content: "What health accommodations should employers discuss with James early?"
      }
    ];

    const response = askAssistant("What sources back that up?", history, {
      modeId: "health",
      preferredIntent: "healthContext"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/CDC|JAN|American Diabetes Association|EEOC|NIDDK|https:\/\//i);
    expect(response.answer).toContain("[health-accommodations");
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
    const lqriResponse = askAssistant("What can you tell me about LQRI?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });
    const cogfitResponse = askAssistant("What can you tell me about CogFit Jobs?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });
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

    expect(lqriResponse.refused).toBe(false);
    expect(lqriResponse.answer).toMatch(/Legitimate Question Response Index|LQRI v2|100-point|diagnostic flags/i);
    expect(lqriResponse.answer).toContain("[project-lqri]");
    expect(cogfitResponse.refused).toBe(false);
    expect(cogfitResponse.answer).toMatch(/CogFit Jobs|job ads|cognitive-fit|work-style-fit|environment-fit/i);
    expect(cogfitResponse.answer).toContain("[project-cogfit-jobs]");
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

  it("keeps the older PBM demo as offline historical evidence", () => {
    const response = askAssistant("What happened to the CAA 2026 PBM Regulatory Assistant?", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/older demo|offline|formerly hosted/i);
    expect(response.answer).toContain("[p2-project-caa-2026-pbm-regulatory-assistant]");
  });

  it("treats GitHub repo and project artifact prompts as project-link requests", () => {
    const repoResponse = askAssistant("Show me James's GitHub repos.", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });
    const artifactResponse = askAssistant("Show me James's project artifacts.", [], {
      modeId: "projects",
      preferredIntent: "projects"
    });

    expect(repoResponse.refused).toBe(false);
    expect(repoResponse.answer).toContain("[live-project-links-index]");
    expect(repoResponse.answer).toContain("https://github.com/Angry-TacoZ/lqri-site");
    expect(repoResponse.answer).toContain("https://cogfit-jobs.web.app/");
    expect(repoResponse.answer).toContain("https://github.com/Angry-TacoZ/vast-lands");
    expect(repoResponse.answer).not.toContain("[portfolio-media-index-portfolio-media-index-iron-tides-battleship-gameplay-demo]");

    expect(artifactResponse.refused).toBe(false);
    expect(artifactResponse.answer).toContain("[live-project-links-index]");
    expect(artifactResponse.answer).toContain("https://github.com/Angry-TacoZ/dep-graph");
    expect(artifactResponse.answer).not.toContain("[evidence-and-projects-core-evidence-themes]");
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
    expect(response.answer).toMatch(/\[(cognitive-profile|core-identity|p2-tools-and-platforms|evidence-and-projects)-?/) ;
  });

  it("uses the corrected current CBC title in retrieval answers", () => {
    const response = askAssistant("What is James Lane's current role at Capital Blue Cross?");

    expect(response.refused).toBe(false);
    expect(response.answer).toContain("Claims Workflow Intelligence Analyst");
    expect(response.answer).toContain("Embedded Claims Examiner");
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
    expect(response.answer).toMatch(/\[(p2-tools-and-platforms|p2-tools|p1-summary|core-identity|role-fit-model)-/);
  });

  it("handles adjacent hiring-manager phrasing for analyst-style work", () => {
    const response = askAssistant("Would James be a good fit for work focused on requirements, workflow design, and reporting?", [], {
      modeId: "profile",
      preferredIntent: "identity"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/requirements|workflow|reporting|process mapping/i);
    expect(response.answer).toMatch(/Power BI|SQL|analytics|documentation/i);
    expect(response.answer).toMatch(/\[(p1-summary|p2-tools-and-platforms|p2-tools|p1-exp-capital-blue-cross|p1-exp-randstad-icu-medical|core-identity|environment-fit-model|role-fit-model)-/);
  });

  it("handles broader job-fit questions for roles without a custom keyword pack", () => {
    const response = askAssistant("Would James be good at developer relations?", [], {
      modeId: "fit",
      preferredIntent: "roleFit"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/technical, analytical, and presentation layers|communication fit is good|gets to the point|source-grounded|workflow|implementation/i);
    expect(response.answer).toMatch(/\[(p1-summary|p2-tools-and-platforms|core-identity|evidence-and-projects|writing-p-doom-or-big-boon|cognitive-profile|role-fit-model)-/);
  });

  it("handles generic engineering-title fit questions with conditional evidence instead of refusing", () => {
    const response = askAssistant("How would James be as a software engineer 1?", [], {
      modeId: "fit",
      preferredIntent: "roleFit"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).toMatch(/prototype|deployment|React|Vite|Phaser|Firebase|build|technical troubleshooting|software engineering breadth/i);
    expect(response.answer).toMatch(/\[(p1-summary|p2-tools-and-platforms|p2-tools|evidence-and-projects|core-identity|cognitive-profile|role-fit-model)-/);
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

  it("preserves prohibited representation claims as boundary metadata, not answer evidence", () => {
    const prohibitedClaims = sourceCorpus.flatMap((section) =>
      (section.boundaries ?? []).flatMap((boundary) => boundary.prohibitedClaims)
    );
    const answerEvidence = sourceCorpus.flatMap((section) => section.items);

    expect(prohibitedClaims).toContain('"He is secretly a perfect fit."');
    expect(prohibitedClaims).toContain("James is anti-authority");
    expect(answerEvidence).not.toContain('"He is secretly a perfect fit."');
    expect(answerEvidence).not.toContain("James is anti-authority");
    expect(answerEvidence).not.toContain("Those summaries are too crude and often false.");
    expect(answerEvidence).not.toContain("That is nonsense seasoning.");
  });

  it("does not turn prohibited stretch-fit language into affirmative evidence", () => {
    const response = askAssistant("What roles look like a strong fit versus a stretch fit for James Lane?", [], {
      modeId: "fit",
      preferredIntent: "roleFit"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).not.toMatch(/secretly a perfect fit|can do anything if given a chance|credentials do not matter/i);
  });

  it("does not return misleading tradeoff labels as evidence", () => {
    const response = askAssistant("What are James Lane's main tradeoffs or friction points?", [], {
      modeId: "fit",
      preferredIntent: "tradeoffs"
    });

    expect(response.refused).toBe(false);
    expect(response.answer).not.toMatch(/James is (difficult|negative|anti-authority)|cannot handle ambiguity|summaries are too crude/i);
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
