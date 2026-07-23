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
    "cogfit animation",
    "cogfit cog animation",
    "cogfit logo motion",
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

const RESUME_SOURCE_LABEL = "Profres072026.pdf";

export const approvedSources = [
  {
    id: "resume-pdf",
    label: RESUME_SOURCE_LABEL,
    path: "C:\\Users\\angry\\Downloads\\Profres072026.pdf"
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
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 1",
    page: 1,
    title: "Contact",
    aliases: ["contact", "email", "phone", "telephone", "linkedin", "living resume", "location", "remote", "based"],
    items: [
      "Carlisle, Pennsylvania",
      "717-701-7089",
      "tiburo13@gmail.com",
      "LinkedIn: https://www.linkedin.com/in/james-lane-1051291a9",
      "GitHub: https://github.com/Angry-TacoZ",
      "Living Resume: https://jamesai.space"
    ]
  },
  {
    id: "p1-headline",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 1",
    page: 1,
    title: "Professional Headline",
    aliases: ["headline", "roles", "title", "position", "ai systems", "automation builder", "internal tools", "python", "react", "firebase"],
    items: ["AI Systems & Automation Builder | Internal Tools | Python, React, Firebase, Microsoft 365"]
  },
  {
    id: "p1-summary",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 1",
    page: 1,
    title: "Professional Summary",
    aliases: ["summary", "overview", "background", "profile", "about"],
    items: [
      "Self-taught AI systems and automation builder with 8 years of enterprise IT and healthcare operations experience.",
      "Proven track record of building and deploying full-stack workflow automation using Python, React/Vite, Firebase, and Cloudflare Workers.",
      "Recently designed a PHI-safe enterprise AI pilot that advanced through enterprise governance review and received approval to begin pilot planning.",
      "The proposed mid-case efficiency model projected approximately 40,000 annual labor hours saved."
    ]
  },
  {
    id: "p2-tools-and-platforms",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 1",
    page: 1,
    title: "Core Skills",
    aliases: ["skills", "core strengths", "strengths", "capabilities", "competencies", "technical stack", "tools", "platforms", "enterprise context"],
    items: [
      "AI Systems & Workflow Tooling: Codex, ChatGPT, Claude, Gemini API, Prompt/RAG design, retrieval-backed assistants, agentic workflows, and model integration orchestration.",
      "Software Build & Deployment: React, Vite, JavaScript, TypeScript, Firebase Hosting, Firebase Functions, Firebase Auth, Cloudflare Workers, Wrangler, Git, and GitHub.",
      "Automation & Data Pipelines: Python, CLI tools, JSON, APIs, webhooks, PDF parsing, SQLite, SQL, Power BI, DAX, Zapier, and Airtable.",
      "Enterprise Systems & Operations: ServiceNow, Microsoft 365, Active Directory, Azure AD, Oracle E-Business Suite support, and FACETS.",
      "Reliability & Security Habits: Trust-boundary review, server-side validation, secret scanning, deployment gates, source-vs-deployed parity checks, and audit-ready documentation."
    ]
  },
  {
    id: "p1-project-living-resume-ai",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 1",
    page: 1,
    title: "James AI Living Resume",
    aliases: ["james ai living resume", "living resume", "interactive resume", "jamesai.space"],
    items: [
      "Live link: https://jamesai.space",
      "Engineered and deployed a full-stack web application using a React/Vite frontend, Firebase Hosting, and cloud functions to allow recruiters to safely query verified resume data via source-grounded retrieval patterns.",
      "Integrated ElevenLabs voice synthesis for voice guidance while enforcing security habits including secret-scan deployment gates and automated bundle integrity checks."
    ]
  },
  {
    id: "p1-project-cogfit-jobs",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 1",
    page: 1,
    title: "CogFit Jobs",
    aliases: ["cogfit jobs", "cogfit", "job fit", "cognitive fit", "work style constraints"],
    items: [
      "Live link: https://cogfit-jobs.web.app",
      "Built a secured job-fit web application with React, TypeScript, and Firebase to programmatically evaluate job descriptions against custom cognitive-fit parameters and operational work-style constraints.",
      "Implemented server-side Gemini LLM API connections, Firestore-backed rate-limiting controls, and Firebase App Check to prevent unauthorized resource abuse and protect API usage and user data."
    ]
  },
  {
    id: "p2-project-pdf-equipment-checker",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 2",
    page: 2,
    title: "PDF Equipment Checker",
    aliases: ["pdf equipment checker", "pdf checker", "equipment schedules", "blueprints", "pdf parsing"],
    items: [
      "Live link: https://pdf-checker-fcd6c.web.app",
      "Developed and packaged a deterministic Python data parsing application designed to automate cross-referencing complex engineering equipment schedules against blueprint plan drawings.",
      "Replaced manual comparison pipelines with structured multi-page CLI/JSON parsing diagnostics, error-handling heuristics, and a local Windows execution wrapper to avoid unsupported LLM extraction."
    ]
  },
  {
    id: "p2-exp-james-lane-ai-consulting",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 2",
    page: 2,
    title: "AI Consultant and Owner - James Lane AI Consulting | Apr 2026-Present | Carlisle, PA",
    aliases: ["current role", "current job", "ai consultant", "owner", "james lane ai consulting", "consulting"],
    items: [
      "Customized and deployed open-source projects, full-stack workflow MVPs, and automated portfolio assistants using LLM APIs, cloud infrastructure, and JavaScript/Python frameworks.",
      "Used AI coding tools for repository inspection, scoped implementation, debugging, testing, build verification, and deployment secret scanning."
    ]
  },
  {
    id: "p1-exp-capital-blue-cross",
    group: "resume-pdf",
    referenceLabel: "Page 2",
    page: 2,
    sourceLabel: RESUME_SOURCE_LABEL,
    title: "Claims Examiner I - Capital Blue Cross | Nov 2025-May 2026 | Remote",
    aliases: ["capital blue cross", "cbc", "claims examiner", "claims examiner i", "claims", "facets", "phi-safe claims ai pilot"],
    items: [
      "Designed and pitched a PHI-safe claims AI assistant pilot that advanced through enterprise AI governance review and received approval to begin pilot planning.",
      "Engineered source-grounding, compliance boundaries, and a 50/50 A/B evaluation matrix projecting 40,000 hours of annual labor savings.",
      "Maintained 99% audit quality while processing accuracy-sensitive claim workflows within FACETS and created markdown job aids to standardize high-variation claim scenarios for training queues."
    ]
  },
  {
    id: "p1-exp-randstad-icu-medical",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 2",
    page: 2,
    title: "Help Desk Analyst L1.5 / Enterprise Systems Support - ICU Medical via Randstad | Jul 2018-Aug 2025 | Mechanicsburg, PA",
    aliases: ["randstad", "icu medical", "help desk analyst", "enterprise systems support", "enterprise it", "oracle ebs", "active directory", "azure ad"],
    items: [
      "Programmed custom scripts, macros, and automated workflow aids to eliminate repetitive identity verification tasks and streamline multi-step provisioning.",
      "Administered Active Directory, Azure AD, Microsoft 365, and Oracle EBS access management workflows for 3,000+ global enterprise users using ServiceNow.",
      "Translated recurring incident patterns into technical documentation and escalation templates, reducing ticket rediscovery cycles and tier-2 routing leakage."
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
      "lqri",
      "legitimate question response index",
      "showcase projects",
      "portfolio links"
    ],
    items: [
      "Living Resume AI: https://james-lane-web-resume.web.app/",
      "Legitimate Question Response Index: https://lqri.web.app/ and public GitHub repo at https://github.com/Angry-TacoZ/lqri-site",
      "CAA 2026 PBM Regulatory Assistant: older source-grounded healthcare policy demo that is now offline; formerly hosted at https://caademoweb.web.app/.",
      "BLKVue AI Security Intake Bot: https://blkvueai.web.app/",
      "JamesLaneAI.com: https://jameslaneai.com/",
      "CogFit Jobs: https://cogfit-jobs.web.app/",
      "Cruis'n PA: https://cruisnpa.fun/",
      "Masters of Metal playable demo: https://iron-shores.web.app/",
      "Vast Lands: private GitHub repo at https://github.com/Angry-TacoZ/vast-lands",
      "X'TIGE: https://xtige-app.web.app/",
      "Iron Horizon WW2 Battleship Prototype: public GitHub repo at https://github.com/Angry-TacoZ/ww2-battleship-prototype",
      "Composio Dependency Graph: private GitHub repo at https://github.com/Angry-TacoZ/dep-graph"
    ]
  },
  {
    id: "project-lqri",
    group: "projects-catalog",
    sourceLabel: "Public GitHub repo and LQRI methodology files",
    referenceLabel: "LQRI / Legitimate Question Response Index",
    title: "Legitimate Question Response Index",
    aliases: ["lqri", "lqri v2", "legitimate question response index", "lqri-site", "lqri.web.app", "model benchmark", "llm benchmark"],
    items: [
      "Live link: https://lqri.web.app/",
      "Public GitHub repo: https://github.com/Angry-TacoZ/lqri-site",
      "Public React/Vite dashboard for the Legitimate Question Response Index, a benchmark for evaluating how LLMs handle lawful, non-operational, sensitive, ambiguous, and self-referential questions.",
      "LQRI v2 uses a low-scaffold five-question chain, preserved transcripts, 100-point aggregate scoring, six scored dimensions, diagnostic flags, model reports, and data-quality caveats.",
      "The project demonstrates benchmark design, research-log discipline, static publication workflow, and transparent model-evaluation artifacts."
    ]
  },
  {
    id: "p2-project-caa-2026-pbm-regulatory-assistant",
    group: "projects-catalog",
    sourceLabel: "Curated project catalog",
    referenceLabel: "Portfolio project archive",
    title: "CAA 2026 PBM Regulatory Assistant",
    aliases: ["caa 2026 pbm regulatory assistant", "pbm regulatory assistant", "caa 2026", "caademoweb"],
    items: [
      "CAA 2026 PBM Regulatory Assistant is an older demo that is now offline; formerly hosted at https://caademoweb.web.app/.",
      "Built a source-grounded assistant focused on how recent legislation affects healthcare relationships with PBMs, translating dense policy content into practical answers.",
      "Created for a healthcare business-analysis interview context to show domain understanding and applied AI execution."
    ]
  },
  {
    id: "p2-project-blkvue-ai-security-intake-bot",
    group: "projects-catalog",
    sourceLabel: "Curated project catalog",
    referenceLabel: "Portfolio project archive",
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
    sourceLabel: "Curated project catalog",
    referenceLabel: "Portfolio project archive",
    title: "JamesLaneAI.com",
    aliases: ["jameslaneai.com", "james lane ai dot com", "consulting site"],
    items: [
      "Live link: https://jameslaneai.com/",
      "Created a public-facing AI consulting site with working business email infrastructure to package AI capabilities into client-understandable services and offerings."
    ]
  },
  {
    id: "project-cogfit-jobs",
    group: "projects-catalog",
    sourceLabel: "Live Firebase site",
    referenceLabel: "CogFit Jobs",
    title: "CogFit Jobs",
    aliases: ["cogfit jobs", "cogfit", "cogfit-jobs.web.app", "job fit evaluator", "job ad evaluator", "job fit tool"],
    items: [
      "Live link: https://cogfit-jobs.web.app/",
      "CogFit Jobs evaluates job ads against how James actually works.",
      "The tool reframes hiring language into a clearer cognitive-fit, work-style-fit, and environment-fit signal instead of relying only on title matching."
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
    sourceLabel: "Curated project catalog",
    referenceLabel: "Portfolio project archive",
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
    id: "p2-education",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 2",
    page: 2,
    title: "Education and Certification",
    aliases: ["education", "school", "diploma", "schooling", "academic", "certification", "certifications", "anthropic", "databricks"],
    items: [
      "High School Diploma | Hephzibah High School",
      "AI Fluency: Framework & Foundations (Anthropic)",
      "Academy Accreditation: Generative AI Fundamentals (Databricks)",
      "Business Analysis Foundations"
    ]
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



