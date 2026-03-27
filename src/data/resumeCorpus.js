import cognitiveProfileRaw from "../../docs/cognitive-profile.md?raw";
import communicationRulesRaw from "../../docs/communication-rules.md?raw";
import coreIdentityRaw from "../../docs/core-identity.md?raw";
import environmentFitModelRaw from "../../docs/environment-fit-model.md?raw";
import evidenceAndProjectsRaw from "../../docs/evidence-and-projects.md?raw";
import frictionPointsRaw from "../../docs/friction-points-and-tradeoffs.md?raw";
import portfolioMediaIndexRaw from "../../docs/portfolio-media-index.md?raw";
import profileIngestionRulesRaw from "../../docs/profile-ingestion-rules.md?raw";
import roleFitModelRaw from "../../docs/role-fit-model.md?raw";
import workLocationPreferenceRaw from "../../docs/work-location-preference.md?raw";

export const assistantName = "James AI";

export const refusalMessage =
  "That question is outside the scope of the approved source documents. Please contact tiburo13@gmail.com or James Lane on LinkedIn.";

const markdownSources = [
  {
    id: "profile-ingestion-rules",
    label: "profile-ingestion-rules.md",
    path: "C:\\Users\\angry\\.codex\\sessions\\james-lane-assistant\\docs\\profile-ingestion-rules.md",
    raw: profileIngestionRulesRaw
  },
  {
    id: "cognitive-profile",
    label: "cognitive-profile.md",
    path: "C:\\Users\\angry\\.codex\\sessions\\james-lane-assistant\\docs\\cognitive-profile.md",
    raw: cognitiveProfileRaw
  },
  {
    id: "friction-points-and-tradeoffs",
    label: "friction-points-and-tradeoffs.md",
    path: "C:\\Users\\angry\\.codex\\sessions\\james-lane-assistant\\docs\\friction-points-and-tradeoffs.md",
    raw: frictionPointsRaw
  },
  {
    id: "environment-fit-model",
    label: "environment-fit-model.md",
    path: "C:\\Users\\angry\\.codex\\sessions\\james-lane-assistant\\docs\\environment-fit-model.md",
    raw: environmentFitModelRaw
  },
  {
    id: "communication-rules",
    label: "communication-rules.md",
    path: "C:\\Users\\angry\\.codex\\sessions\\james-lane-assistant\\docs\\communication-rules.md",
    raw: communicationRulesRaw
  },
  {
    id: "core-identity",
    label: "core-identity.md",
    path: "C:\\Users\\angry\\.codex\\sessions\\james-lane-assistant\\docs\\core-identity.md",
    raw: coreIdentityRaw
  },
  {
    id: "role-fit-model",
    label: "role-fit-model.md",
    path: "C:\\Users\\angry\\.codex\\sessions\\james-lane-assistant\\docs\\role-fit-model.md",
    raw: roleFitModelRaw
  },
  {
    id: "evidence-and-projects",
    label: "evidence-and-projects.md",
    path: "C:\\Users\\angry\\.codex\\sessions\\james-lane-assistant\\docs\\evidence-and-projects.md",
    raw: evidenceAndProjectsRaw
  },
  {
    id: "portfolio-media-index",
    label: "portfolio-media-index.md",
    path: "C:\\Users\\angry\\.codex\\sessions\\james-lane-assistant\\docs\\portfolio-media-index.md",
    raw: portfolioMediaIndexRaw
  },
  {
    id: "work-location-preference",
    label: "work-location-preference.md",
    path: "C:\\Users\\angry\\.codex\\sessions\\james-lane-assistant\\docs\\work-location-preference.md",
    raw: workLocationPreferenceRaw
  }
];

export const approvedSources = [
  {
    id: "resume-pdf",
    label: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    path: "C:\\Users\\angry\\Downloads\\James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf"
  },
  ...markdownSources.map(({ id, label, path }) => ({
    id,
    label,
    path
  }))
];

export const starterQuestions = [
  "How should James Lane be described to employers?",
  "What live projects can I review?",
  "What kinds of environments are the best fit for James Lane?",
  "What are James Lane's main tradeoffs or friction points?",
  "What evidence shows how James Lane works?",
  "What roles look like a strong fit versus a stretch fit for James Lane?"
];

const resumeSourceCorpus = [
  {
    id: "p1-contact",
    group: "resume-pdf",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 1",
    page: 1,
    title: "Contact",
    aliases: ["contact", "email", "phone", "telephone", "linkedin", "living resume", "location", "remote", "based"],
    items: [
      "Carlisle, Pennsylvania",
      "717-701-7089",
      "tiburo13@gmail.com",
      "LinkedIn: https://www.linkedin.com/in/james-lane-1051291a9",
      "Living Resume: https://james-lane-web-resume.web.app/"
    ]
  },
  {
    id: "p1-headline",
    group: "resume-pdf",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 1",
    page: 1,
    title: "Headline",
    aliases: ["headline", "roles", "title", "position", "ai product operations", "business analysis", "workflow automation"],
    items: ["AI Product Operations | Business Analysis | Workflow Automation"]
  },
  {
    id: "p1-summary",
    group: "resume-pdf",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 1",
    page: 1,
    title: "Professional Summary",
    aliases: ["summary", "overview", "background", "profile", "about"],
    items: [
      "Enterprise workflow analyst and builder with live AI prototypes, stakeholder-facing tools, and an approved internal pilot.",
      "Systems-first analyst and applied AI builder with 7+ years in enterprise IT operations and current healthcare claims experience at Capital Blue Cross.",
      "Known for translating ambiguous workflows into clear requirements, repeatable guidance, and working prototypes.",
      "Built multiple live AI and web applications for stakeholder review, decision support, and hiring workflows.",
      "Advanced a PHI-safe claims AI assistant from concept through committee review to approved pilot launch."
    ]
  },
  {
    id: "p1-core-strengths",
    group: "resume-pdf",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 1",
    page: 1,
    title: "Core Strengths",
    aliases: ["skills", "core strengths", "strengths", "capabilities", "competencies", "technical stack", "enterprise context"],
    items: [
      "Business analysis: Requirements discovery, process mapping, workflow clarification, acceptance thinking, and operational documentation.",
      "AI product work: Prompt design, grounded assistants, FAQ tools, intake flows, interactive demos, and rapid prototype-to-deployment execution.",
      "Change support: Job aids, stakeholder explanations, rollout support, training-oriented documentation, and feedback-driven iteration.",
      "Technical stack: ChatGPT, Claude, Gemini APIs, Codex, Firebase Hosting, Zapier, Airtable, Power BI, SQL, ServiceNow, Microsoft 365.",
      "Enterprise context: Healthcare operations, PHI-safe boundaries, audit-sensitive workflows, identity and access support, and escalation discipline."
    ]
  },
  {
    id: "p1-exp-capital-blue-cross",
    group: "resume-pdf",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 1",
    page: 1,
    title: "Claims Examiner I - Capital Blue Cross | Nov 2025-Present | Remote",
    aliases: ["capital blue cross", "cbc", "claims examiner", "claims examiner i", "claims", "current role", "facets"],
    items: [
      "Maintained 99% audit quality during ramp while learning FACETS and high-accuracy claims workflows under production constraints.",
      "Submitted process-improvement recommendations that were accepted and implemented before finishing training.",
      "Created quick-reference job aids and decision notes to reduce ambiguity in high-variation scenarios and improve repeatability.",
      "Developed a PHI-safe claims AI assistant proposal that was presented to the CBC AI Innovation Committee and Governance Committee and approved to begin pilot launch."
    ]
  },
  {
    id: "p1-exp-randstad-icu-medical",
    group: "resume-pdf",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 1",
    page: 1,
    title: "Help Desk Analyst L1.5 - ICU Medical (Randstad Digital contractor) | Jul 2018-Aug 2025",
    aliases: ["randstad", "icu medical", "help desk analyst", "enterprise it", "it analyst", "oracle e-business suite", "active directory", "azure ad"],
    items: [
      "Translated user and business needs into reproducible resolution steps, escalation packets, and audit-ready documentation.",
      "Administered Active Directory and Azure AD access for 3,000+ users; verified permissions, licensing, and least-privilege alignment.",
      "Supported Oracle E-Business Suite user access administration and Java launch troubleshooting; documented repeatable fixes for reuse.",
      "Reduced repetitive handling time through ServiceNow templates, macros, and Python automation while preserving quality and consistency."
    ]
  },
  {
    id: "p1-exp-go-wireless",
    group: "resume-pdf",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 1",
    page: 1,
    title: "Sales and Device Support Associate - Go Wireless | Jul 2016-Jun 2018",
    aliases: ["go wireless", "verizon", "sales and device support associate"],
    items: [
      "Gathered customer requirements, diagnosed device issues, and explained solutions clearly while documenting outcomes and escalations.",
      "Balanced technical troubleshooting with inventory, warranty, and operational accuracy responsibilities."
    ]
  },
  {
    id: "p1-exp-office-depot",
    group: "resume-pdf",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 1",
    page: 1,
    title: "PC Technician - Office Depot | Jan 2016-Jul 2016",
    aliases: ["office depot", "pc technician"],
    items: [
      "Performed diagnostics, malware removal, reinstalls, and post-repair validation with clear repair documentation."
    ]
  },
  {
    id: "p1-project-cbc-proposal-faq-assistant",
    group: "projects-catalog",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 1",
    page: 1,
    title: "CBC Proposal FAQ Assistant",
    aliases: ["cbc proposal faq assistant", "proposal faq assistant", "cbc faq assistant", "claims ai faq"],
    items: [
      "Live link: https://cbc-proposal-faq-assistant.web.app/",
      "Built a live FAQ assistant to answer stakeholder questions about the CBC claims AI pilot, reducing friction around proposal review and clarifying scope, guardrails, and pilot logic.",
      "Extended the main proposal with an interactive artifact designed for internal decision support rather than a static document alone."
    ]
  },
  {
    id: "p2-project-living-resume-ai",
    group: "projects-catalog",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 2",
    page: 2,
    title: "Living Resume AI",
    aliases: ["living resume ai", "living resume", "interactive resume", "james ai"],
    items: [
      "Live link: https://james-lane-web-resume.web.app/",
      "Designed and deployed an interactive resume experience that lets employers explore experience, projects, and work style through conversation.",
      "Used as a hiring artifact to demonstrate product thinking, AI implementation, and a better alternative to low-bandwidth static resumes."
    ]
  },
  {
    id: "p2-project-caa-2026-pbm-regulatory-assistant",
    group: "projects-catalog",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 2",
    page: 2,
    title: "CAA 2026 PBM Regulatory Assistant",
    aliases: ["caa 2026 pbm regulatory assistant", "pbm regulatory assistant", "caa 2026", "caademoweb"],
    items: [
      "Live link: https://caademoweb.web.app/",
      "Built a source-grounded assistant focused on how recent legislation affects healthcare relationships with PBMs, translating dense policy content into practical answers.",
      "Created for a healthcare business-analysis interview context to show domain understanding and applied AI execution."
    ]
  },
  {
    id: "p2-project-blkvue-ai-security-intake-bot",
    group: "projects-catalog",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 2",
    page: 2,
    title: "BLKVue AI Security Intake Bot",
    aliases: ["blkvue ai security intake bot", "blkvue", "security intake bot"],
    items: [
      "Live link: https://blkvueai.web.app/",
      "Built with Codex and deployed to Firebase Hosting as a client intake workflow that produces AI-assisted risk assessments.",
      "Grounded the assessment criteria in information taken from the target security company's own website to align outputs with its service model."
    ]
  },
  {
    id: "p2-project-jameslaneai-com",
    group: "projects-catalog",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 2",
    page: 2,
    title: "JamesLaneAI.com",
    aliases: ["jameslaneai.com", "james lane ai dot com", "consulting site"],
    items: [
      "Live link: https://jameslaneai.com/",
      "Created a public-facing AI consulting site with working business email infrastructure to package AI capabilities into client-understandable services and offerings."
    ]
  },
  {
    id: "p2-project-iron-shores-playable-demo",
    group: "projects-catalog",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 2",
    page: 2,
    title: "Iron Shores playable demo",
    aliases: ["iron shores playable demo", "iron shores", "playable demo", "iron-shores.web.app"],
    items: [
      "Live link: https://iron-shores.web.app/",
      "Designed and deployed a browser-based tank roguelite and bullet-hell demo with 1 level and 10 waves; used by players and refined through real feedback rather than static mockups."
    ]
  },
  {
    id: "p2-tools",
    group: "resume-pdf",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 2",
    page: 2,
    title: "Tools",
    aliases: ["tools", "tool stack", "build and deployment", "data and operations", "ai tools"],
    items: [
      "AI: ChatGPT, Claude, Gemini, Perplexity, Grok, Meta AI, Codex, Claude Code, Gemini APIs.",
      "Build and deployment: Firebase Hosting, Vite, React, Phaser, Zapier, Airtable, Google Workspace.",
      "Data and operations: Power BI, SQL, Excel, ServiceNow, Microsoft 365, Active Directory, Azure AD, FACETS."
    ]
  },
  {
    id: "p2-education",
    group: "resume-pdf",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 2",
    page: 2,
    title: "Education",
    aliases: ["education", "school", "diploma", "schooling", "academic"],
    items: ["Hephzibah High School - High School Diploma"]
  }
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function extractAliases(headings, items) {
  const aliasSet = new Set();
  const headingText = headings.join(" ");

  for (const heading of headings) {
    aliasSet.add(heading.toLowerCase());
  }

  for (const match of headingText.match(/\b[A-Z][A-Za-z-]+\b/g) ?? []) {
    aliasSet.add(match.toLowerCase());
  }

  if (/fit/i.test(headingText)) {
    aliasSet.add("fit");
    aliasSet.add("best fit");
    aliasSet.add("mismatch");
  }

  if (/tradeoff|friction/i.test(headingText)) {
    aliasSet.add("tradeoffs");
    aliasSet.add("friction");
    aliasSet.add("weaknesses");
  }

  if (/communication/i.test(headingText)) {
    aliasSet.add("communication");
    aliasSet.add("communication style");
  }

  if (/identity/i.test(headingText)) {
    aliasSet.add("identity");
    aliasSet.add("background");
  }

  if (/evidence|projects/i.test(headingText)) {
    aliasSet.add("evidence");
    aliasSet.add("projects");
    aliasSet.add("portfolio");
  }

  if (/location/i.test(headingText)) {
    aliasSet.add("location preference");
    aliasSet.add("remote");
    aliasSet.add("hybrid");
    aliasSet.add("relocate");
  }

  for (const line of items.slice(0, 3)) {
    const words = line.match(/\b[a-zA-Z][a-zA-Z0-9-]+\b/g) ?? [];
    for (const word of words.slice(0, 6)) {
      aliasSet.add(word.toLowerCase());
    }
  }

  return [...aliasSet];
}

function parseMarkdownSource(doc) {
  const lines = doc.raw.replace(/\r/g, "").split("\n");
  const sections = [];
  const headingStack = [];
  let buffer = [];

  function flushBuffer() {
    const items = buffer
      .map((line) => line.trimEnd())
      .filter((line) => line.trim())
      .map((line) => line.replace(/^\s*[-*]\s+/, "").trim());

    buffer = [];

    if (headingStack.length === 0 || items.length === 0) {
      return;
    }

    const headingTitles = headingStack.map((entry) => entry.text);
    const title = headingTitles.join(" / ");
    const id = `${doc.id}-${slugify(title)}`;

    sections.push({
      id,
      group: doc.id,
      sourceLabel: doc.label,
      referenceLabel: doc.label,
      title,
      aliases: extractAliases(headingTitles, items),
      items
    });
  }

  for (const line of lines) {
    const headingMatch = /^(#{1,6})\s+(.*)$/.exec(line);

    if (headingMatch) {
      flushBuffer();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();

      while (headingStack.length > 0 && headingStack[headingStack.length - 1].level >= level) {
        headingStack.pop();
      }

      headingStack.push({ level, text });
      continue;
    }

    buffer.push(line);
  }

  flushBuffer();

  return sections;
}

const markdownCorpus = markdownSources.flatMap(parseMarkdownSource);

export const sourceCorpus = [...resumeSourceCorpus, ...markdownCorpus];


