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
import cruisnPaProjectRaw from "../../docs/cruisn-pa-project.md?raw";
import healthAndNeurodivergenceRaw from "../../docs/health-and-neurodivergence-context.md?raw";
import { supportingAnalysis, writingPortfolio } from "./writingPortfolio.js";
import { artDesignPortfolio } from "./artDesignPortfolio.js";
import { healthProfileCorpus } from "./healthProfile.js";

export const assistantName = "James AI";

export const refusalMessage =
  "That question is outside the scope of the approved source documents. Please contact tiburo13@gmail.com or James Lane on LinkedIn.";

const PROJECT_ROOT = "C:\\Users\\angry\\.codex\\sessions\\projects\\james-lane-assistant";

const markdownSources = [
  {
    id: "profile-ingestion-rules",
    label: "profile-ingestion-rules.md",
    path: `${PROJECT_ROOT}\\docs\\profile-ingestion-rules.md`,
    raw: profileIngestionRulesRaw
  },
  {
    id: "cognitive-profile",
    label: "cognitive-profile.md",
    path: `${PROJECT_ROOT}\\docs\\cognitive-profile.md`,
    raw: cognitiveProfileRaw
  },
  {
    id: "friction-points-and-tradeoffs",
    label: "friction-points-and-tradeoffs.md",
    path: `${PROJECT_ROOT}\\docs\\friction-points-and-tradeoffs.md`,
    raw: frictionPointsRaw
  },
  {
    id: "environment-fit-model",
    label: "environment-fit-model.md",
    path: `${PROJECT_ROOT}\\docs\\environment-fit-model.md`,
    raw: environmentFitModelRaw
  },
  {
    id: "communication-rules",
    label: "communication-rules.md",
    path: `${PROJECT_ROOT}\\docs\\communication-rules.md`,
    raw: communicationRulesRaw
  },
  {
    id: "core-identity",
    label: "core-identity.md",
    path: `${PROJECT_ROOT}\\docs\\core-identity.md`,
    raw: coreIdentityRaw
  },
  {
    id: "role-fit-model",
    label: "role-fit-model.md",
    path: `${PROJECT_ROOT}\\docs\\role-fit-model.md`,
    raw: roleFitModelRaw
  },
  {
    id: "evidence-and-projects",
    label: "evidence-and-projects.md",
    path: `${PROJECT_ROOT}\\docs\\evidence-and-projects.md`,
    raw: evidenceAndProjectsRaw
  },
  {
    id: "portfolio-media-index",
    label: "portfolio-media-index.md",
    path: `${PROJECT_ROOT}\\docs\\portfolio-media-index.md`,
    raw: portfolioMediaIndexRaw
  },
  {
    id: "work-location-preference",
    label: "work-location-preference.md",
    path: `${PROJECT_ROOT}\\docs\\work-location-preference.md`,
    raw: workLocationPreferenceRaw
  },
  {
    id: "health-and-neurodivergence",
    label: "health-and-neurodivergence-context.md",
    path: `${PROJECT_ROOT}\\docs\\health-and-neurodivergence-context.md`,
    raw: healthAndNeurodivergenceRaw
  },
  {
    id: "cruisn-pa-project",
    label: "cruisn-pa-project.md",
    path: `${PROJECT_ROOT}\\docs\\cruisn-pa-project.md`,
    raw: cruisnPaProjectRaw
  }
];

const supplementalApprovedSources = [
  {
    id: "public-writing-index",
    label: "public-writing-index.md",
    path: `${PROJECT_ROOT}\\docs\\public-writing-index.md`
  },
  {
    id: "supporting-analysis-index",
    label: "supporting-analysis-index.md",
    path: `${PROJECT_ROOT}\\docs\\supporting-analysis-index.md`
  },
  {
    id: "health-accommodations",
    label: "Health & Accessibility Lens",
    path: `${PROJECT_ROOT}\\src\\data\\healthProfile.js`
  }
];

const artDesignCatalogCorpus = {
  id: "art-design-catalog",
  group: "projects-catalog",
  sourceLabel: "Art & Design portfolio page",
  referenceLabel: "Art & Design Lens",
  title: "Art and Design Work",
  aliases: [
    "art and design",
    "art design",
    "design work",
    "artwork",
    "visual design",
    "graphic design",
    "logo design",
    "motion design",
    "logo animation",
    "defillama",
    "cruisn pa art",
    "cruis'n pa art",
    "car club art"
  ],
  items: [
    "James has an Art & Design Lens in the James AI site that showcases AI-assisted visual explorations, technical diagrams, brand marks, event posters, community graphics, logo concepts, and motion-design work.",
    ...artDesignPortfolio.map((entry) => {
      const medium = entry.mediaType === "video" ? "motion/video artifact" : "visual artifact";
      return `${entry.title} — ${entry.category} — ${medium}. ${entry.description}`;
    })
  ]
};

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
  })),
  ...supplementalApprovedSources.map(({ id, label, path }) => ({
    id,
    label,
    path
  }))
];

export const starterQuestions = [
  "How should James Lane be described to employers?",
  "What live projects can I review?",
  "What has James Lane written on Medium?",
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
  artDesignCatalogCorpus,
  {
    id: "live-project-links-index",
    group: "projects-catalog",
    sourceLabel: "Live project artifact index",
    referenceLabel: "Artifacts / GitHub live-link sweep",
    title: "Project Artifact Links",
    aliases: [
      "live projects",
      "project links",
      "artifacts",
      "github repos with live links",
      "public demos",
      "showcase projects",
      "portfolio links"
    ],
    items: [
      "Living Resume AI: https://james-lane-web-resume.web.app/",
      "CAA 2026 PBM Regulatory Assistant: https://caademoweb.web.app/",
      "BLKVue AI Security Intake Bot: https://blkvueai.web.app/",
      "JamesLaneAI.com: https://jameslaneai.com/",
      "Cruis'n PA: https://cruisnpa.fun/",
      "Masters of Metal playable demo: https://iron-shores.web.app/",
      "Vast Lands: private GitHub repo at https://github.com/Angry-TacoZ/vast-lands",
      "X'TIGE: https://xtige-app.web.app/",
      "Iron Horizon WW2 Battleship Prototype: public GitHub repo at https://github.com/Angry-TacoZ/ww2-battleship-prototype",
      "Composio Dependency Graph: private GitHub repo at https://github.com/Angry-TacoZ/dep-graph"
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
    id: "p2-project-cruisn-pa",
    group: "projects-catalog",
    sourceLabel: "cruisn-pa-project.md",
    referenceLabel: "Cruis'n PA / Project Summary",
    title: "Cruis'n PA",
    aliases: ["cruisn pa", "cruis'n pa", "cruisnpa", "cruisnpa.fun", "driving club", "car club site", "club website"],
    items: [
      "Live link: https://cruisnpa.fun/",
      "Built a Pennsylvania driving-club site for enthusiasts who want the road to be the main attraction rather than a parking-lot meetup.",
      "Packages the club around custom weekly routes, top-tier gas-station starts, a mystery dessert stop, scenic photo spots, and a restaurant finish.",
      "Demonstrates public-facing community branding, multi-page site structure, and clear packaging of a recurring local event format."
    ]
  },
  {
    id: "p2-project-iron-shores-playable-demo",
    group: "projects-catalog",
    sourceLabel: "James_Lane_General_Tech_Analysis_Builder_Resume_2026-03.pdf",
    referenceLabel: "Page 2",
    page: 2,
    title: "Masters of Metal",
    aliases: ["masters of metal", "iron shores playable demo", "iron shores", "playable demo", "iron-shores.web.app"],
    items: [
      "Live link: https://iron-shores.web.app/",
      "Designed and deployed Masters of Metal, a browser-based tank roguelite and bullet-hell demo with 1 level and 10 waves; used by players and refined through real feedback rather than static mockups."
    ]
  },
  {
    id: "github-project-vast-lands",
    group: "projects-catalog",
    sourceLabel: "GitHub repo and local README",
    referenceLabel: "Angry-TacoZ/vast-lands",
    title: "Vast Lands",
    aliases: ["vast lands", "babylon city builder", "isometric city builder", "anno style", "civ style"],
    items: [
      "Private GitHub repo: https://github.com/Angry-TacoZ/vast-lands",
      "Babylon.js isometric prototype for a modern city-state builder with Anno-style production and resident needs plus Civ-style civic progression.",
      "Current gameplay includes placement of residential, logistics, production, commerce, and civic districts; resource balancing; satisfaction-linked income; civic unlocks; and export/import of map, economy, and civic state."
    ]
  },
  {
    id: "github-project-xtige",
    group: "projects-catalog",
    sourceLabel: "GitHub repo and local README",
    referenceLabel: "Angry-TacoZ/xtige",
    title: "X'TIGE",
    aliases: ["xtige", "x'tige", "car social app", "garage", "bounties", "crew", "live map"],
    items: [
      "Live link: https://xtige-app.web.app/",
      "Private GitHub repo: https://github.com/Angry-TacoZ/xtige",
      "Car-first social app for drivers to discover nearby enthusiasts, build a Garage identity, complete Bounties, organize Crews, and test live map presence.",
      "Stack includes React, Vite, TypeScript, Leaflet, Firebase Hosting, Firebase Auth scaffolding, Firestore rules, and Capacitor for a future Android path."
    ]
  },
  {
    id: "github-project-iron-horizon-ww2-battleship",
    group: "projects-catalog",
    sourceLabel: "GitHub repo and local README",
    referenceLabel: "Angry-TacoZ/ww2-battleship-prototype",
    title: "Iron Horizon WW2 Battleship Prototype",
    aliases: ["iron horizon", "ww2 battleship prototype", "ww2 horde survival", "naval combat", "battleship combat"],
    items: [
      "Public GitHub repo: https://github.com/Angry-TacoZ/ww2-battleship-prototype",
      "Playable top-down WW2-inspired battleship combat prototype built with Vite, TypeScript, and Phaser 3.",
      "Implemented surfaces include main menu, nation select, battle scenario, enemy ships, periodic aircraft threats, manual main battery fire, auto-firing secondaries and AA, torpedoes, fires, flooding, repair party, reloads, health bars, and zoom.",
      "Verifier coverage checks damage loops, enemy damage, secondaries, priority targeting, AA, torpedoes, fire/flood DOT, and win/loss conditions."
    ]
  },
  {
    id: "github-project-composio-dependency-graph",
    group: "projects-catalog",
    sourceLabel: "GitHub repo and local README",
    referenceLabel: "Angry-TacoZ/dep-graph",
    title: "Composio Dependency Graph",
    aliases: ["benchmarking tool", "benchmark tool", "composio dependency graph", "dependency graph", "tool routing", "agent workflow graph"],
    items: [
      "Private GitHub repo: https://github.com/Angry-TacoZ/dep-graph",
      "Builds a dependency graph for Composio Google Super and GitHub toolkits, focused on prerequisite inputs, precursor tools, user-input fallbacks, and risk-confirmation edges.",
      "Primary reviewer artifact is graph/dependency_graph.html with workflow view, full graph mode, debug edge auditing, filters, and a right-side inspector.",
      "The implementation uses deterministic TypeScript generation, Mermaid/HTML output, confidence-ranked edges, and risk-aware routing labels."
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

const writingCatalogCorpus = [
  {
    id: "writing-boundary",
    group: "writing-catalog",
    sourceLabel: "public-writing-index.md",
    referenceLabel: "public-writing-index.md",
    title: "Public Writing Boundary and Interpretation Rules",
    aliases: [
      "writing",
      "public writing",
      "medium",
      "articles",
      "essays",
      "opinion pieces",
      "published opinions",
      "published writing",
      "internal thoughts",
      "internal cognition",
      "cognition",
      "private beliefs"
    ],
    items: [
      "These entries are published public writing by James Earl Lane.",
      "Treat them as authored essays, commentary, and analysis that James chose to publish publicly.",
      "Do not treat them as hidden internal cognition, diagnostic profile material, or private thoughts beyond what the writing explicitly says.",
      "Use them to answer questions about public writing, themes, voice, argument style, and stated public positions in the essays themselves.",
      "The linked ChatGPT transcript is supporting analysis and research context, not a James-authored Medium article."
    ]
  },
  {
    id: "writing-catalog",
    group: "writing-catalog",
    sourceLabel: "public-writing-index.md",
    referenceLabel: "public-writing-index.md",
    title: "Writing Catalog",
    aliases: [
      "medium writing",
      "writing catalog",
      "published essays",
      "published articles",
      "writing archive",
      "headlines"
    ],
    items: writingPortfolio.map((article) =>
      `${article.title}${article.headline ? ` — ${article.headline}` : ""} — ${article.category} — ${article.url}`
    )
  }
];

const writingArticleCorpus = writingPortfolio.map((article) => ({
  id: `writing-${article.id}`,
  group: "writing-corpus",
  sourceLabel: "public-writing-index.md",
  referenceLabel: `${article.publication} | ${article.dateLabel}`,
  title: article.title,
  aliases: [
    article.title.toLowerCase(),
    article.headline?.toLowerCase(),
    article.category.toLowerCase(),
    ...article.aliases
  ].filter(Boolean),
  items: [
    `Type: Published ${article.category.toLowerCase()} by James Earl Lane in ${article.publication}.`,
    article.headline ? `Headline: ${article.headline}` : null,
    `URL: ${article.url}`,
    `Date: ${article.dateLabel}`,
    `Summary: ${article.description}`,
    ...article.corpusItems,
    `Demonstrates: ${article.demonstrates.join(", ")}.`
  ].filter(Boolean)
}));

const supportingAnalysisCorpus = supportingAnalysis.map((entry) => ({
  id: `writing-support-${entry.id}`,
  group: "writing-supporting-analysis",
  sourceLabel: "supporting-analysis-index.md",
  referenceLabel: "supporting-analysis-index.md",
  title: entry.title,
  aliases: [entry.title.toLowerCase(), ...entry.aliases],
  items: [
    `Type: ${entry.category}.`,
    `Summary: ${entry.description}`,
    ...entry.corpusItems
  ]
}));

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

export const sourceCorpus = [
  ...resumeSourceCorpus,
  ...writingCatalogCorpus,
  ...writingArticleCorpus,
  ...supportingAnalysisCorpus,
  ...healthProfileCorpus,
  ...markdownCorpus
];


