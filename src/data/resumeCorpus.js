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

const RESUME_SOURCE_LABEL = "James_Lane_AI_Product_UX_Functional.docx";

export const approvedSources = [
  {
    id: "resume-pdf",
    label: RESUME_SOURCE_LABEL,
    path: "C:\\Users\\angry\\Downloads\\James_Lane_AI_Product_UX_Functional.docx"
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
    aliases: ["headline", "roles", "title", "position", "ai product", "ux engineer", "design engineer", "interactive prototyping"],
    items: ["AI Product & UX Engineer | Design Engineer | Interactive Prototyping"]
  },
  {
    id: "p1-summary",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 1",
    page: 1,
    title: "Product Design Profile",
    aliases: ["summary", "overview", "background", "profile", "about"],
    items: [
      "Career-changing AI product builder focused on user-facing systems for decisions, AI output, and complex workflows.",
      "Combines product thinking, interaction design, responsive frontend implementation, and AI system design across React, TypeScript, Vite, Firebase, FastAPI, and LLM-enabled workflows.",
      "Turns ambiguous operational problems into clear interaction models, evidence-rich interfaces, human review paths, and working prototypes."
    ]
  },
  {
    id: "p1-functional-capabilities",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 1",
    page: 1,
    title: "Functional Capabilities",
    aliases: ["capabilities", "product design", "interaction design", "ai experience design", "rapid prototyping", "validation", "workflow translation"],
    items: [
      "AI Product & Interaction Design: user flows, interaction models, decision-support UX, progressive disclosure, human-in-the-loop design, explainability, inspectable memory, and workflow states.",
      "Frontend Product Engineering: React, TypeScript, JavaScript, Vite, Framer Motion, responsive interfaces, component-based UI, local state, Firebase Hosting, and accessible interaction patterns.",
      "AI Experience Design: LLM-assisted workflows, retrieval-backed interfaces, deterministic and generative hybrid systems, source grounding, bounded automation, review and override loops, visible evidence, and constraints.",
      "Rapid Prototyping & Validation: linting, type checks, tests, builds, browser inspection, Playwright, and deployment checks.",
      "Systems & Workflow Translation: maps business rules, dependencies, edge cases, and user decisions into understandable product experiences."
    ]
  },
  {
    id: "p1-tools-and-platforms",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 1",
    page: 1,
    title: "Tools & Technologies",
    aliases: ["skills", "core strengths", "strengths", "competencies", "technical stack", "tools", "platforms", "enterprise context"],
    items: [
      "Design / Frontend: React, TypeScript, JavaScript, Vite, Framer Motion, responsive UI, component systems, HTML/CSS.",
      "AI / Product Systems: ChatGPT, Claude, Codex, Gemini, prompt/RAG design, retrieval, agent workflows, memory UX, evaluation, and human review.",
      "Backend / Platform: Firebase Hosting, Functions, Auth, App Check, FastAPI, Python, PostgreSQL, pgvector, SQLite, Cloudflare Workers, and REST/JSON APIs.",
      "Delivery / Quality: Git, GitHub, pull requests, GitHub Actions, CI/CD, Vitest, Playwright, ESLint, pytest, secret scanning, and deployment verification."
    ]
  },
  {
    id: "p1-project-blue-shopping-agent",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 1",
    page: 1,
    title: "Blue - Ambient AI Shopping Agent Concept",
    aliases: ["blue", "best buy blue", "ambient shopping agent", "shopping agent", "retail ai", "inspectable memory", "product recommendations", "curated laptop", "checkout simulation"],
    items: [
      "Public GitHub repo and live concept: https://github.com/Angry-TacoZ/best-buy-blue-concept and https://angry-tacoz.github.io/best-buy-blue-concept/.",
      "Designed an ambient retail AI interaction model that accompanies product browsing instead of forcing a shopper into a separate chat panel.",
      "Built inspectable, editable, reversible browser-local memory and a comparison control that shows how remembered needs change recommendations.",
      "Designed three understandable tradeoff directions rather than claiming one opaque best answer.",
      "The public concept uses fictional data, deterministic local scoring, no external APIs, no authentication, no real checkout, and no tracking."
    ]
  },
  {
    id: "p1-project-delivery-composer",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 1",
    page: 1,
    title: "Delivery Composer - AI-Assisted Consulting Staffing Workflow",
    aliases: ["delivery composer", "consulting staffing", "delivery team", "candidate comparison", "human approval", "staffing workflow"],
    items: [
      "Public GitHub repo and live demo: https://github.com/Angry-TacoZ/delivery-composer and https://composer.jamesai.space/.",
      "Designed a multi-stage workflow that turns an unstructured client brief into requirements, candidate evidence, recommendation review, override, revision, and re-evaluation.",
      "Created candidate comparison UX that exposes score deltas, evidence, eligibility gates, considerations, and tradeoffs while keeping the final decision with a human delivery leader.",
      "The public demo uses synthetic data and deterministic portfolio mode; the planned PostgreSQL, pgvector, and Gemini path is an architectural extension point, not a verified public capability."
    ]
  },
  {
    id: "p2-additional-product-evidence",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 2",
    page: 2,
    title: "Additional Product & AI Build Evidence",
    aliases: ["cogfit jobs", "james ai", "living resume", "pdf equipment checker", "responsible vibe coding", "playbook"],
    items: [
      "CogFit Jobs: explainable AI work-fit interface with visible fit dimensions, confidence, evidence, and improvement guidance.",
      "James AI Living Resume: recruiter-facing portfolio assistant built with React/Vite, Firebase Hosting/Functions, verified resume data, and voice guidance.",
      "PDF Equipment Checker: deterministic document-validation tool and hosted upload flow for comparing equipment schedules against plan drawings.",
      "Responsible Vibe Coding Playbook: published AI-assisted development workflow centered on inspect-before-edit, explicit trust boundaries, scoped implementation, verification, and traceable deployment."
    ]
  },
  {
    id: "p2-exp-ai-product-builder",
    group: "resume-pdf",
    referenceLabel: "Page 2",
    page: 2,
    sourceLabel: RESUME_SOURCE_LABEL,
    title: "AI Product Builder - JamesLaneAI.com | 2025-Present",
    aliases: ["current role", "current job", "ai product builder", "jameslaneai", "james lane ai", "consulting"],
    items: [
      "Designs and builds AI-enabled products, workflow tools, frontend concepts, and portfolio prototypes from problem framing through working implementation.",
      "Translates business problems into user-facing workflows, explicit decision points, bounded automation, and reviewable product behavior."
    ]
  },
  {
    id: "p2-project-pdf-equipment-checker",
    group: "projects-catalog",
    sourceLabel: "Public GitHub repo and hosted demo",
    referenceLabel: "Angry-TacoZ/pdf-equipment-checker",
    title: "PDF Equipment Checker",
    aliases: ["pdf equipment checker", "pdf checker", "equipment schedules", "blueprints", "plan drawings", "pdf parsing"],
    items: [
      "Public GitHub repo and live demo: https://github.com/Angry-TacoZ/pdf-equipment-checker and https://pdf-checker-fcd6c.web.app/.",
      "Deterministic document-validation tool for comparing equipment schedule rows against plan-drawing tags.",
      "The documented public demo limits uploads to PDFs and 20 MB, applies a lightweight per-client rate limit, deletes uploaded files after each check, and reports generic parser errors to visitors."
    ]
  },
  {
    id: "p2-exp-capital-blue-cross",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 2",
    page: 2,
    title: "Claims Examiner I - Capital Blue Cross | 2025-2026",
    aliases: ["capital blue cross", "cbc", "claims examiner", "claims examiner i", "claims", "facets", "phi-safe claims ai pilot"],
    items: [
      "Designed a PHI-safe AI assistant pilot for complex claims workflows, including source grounding, linked-step navigation, human review, governance boundaries, and structured A/B evaluation."
    ]
  },
  {
    id: "p2-exp-randstad-icu-medical",
    group: "resume-pdf",
    sourceLabel: RESUME_SOURCE_LABEL,
    referenceLabel: "Page 2",
    page: 2,
    title: "Help Desk Analyst L1.5 / Enterprise Systems Support - ICU Medical via Randstad | 2018-2025",
    aliases: ["randstad", "icu medical", "help desk analyst", "enterprise systems support", "enterprise it", "oracle ebs", "active directory", "azure ad"],
    items: [
      "Supported more than 3,000 enterprise users across Microsoft 365, Active Directory, Azure AD, Oracle EBS, VPN/VDI, and ServiceNow.",
      "Converted recurring support friction into scripts, macros, technical documentation, escalation templates, and workflow improvements."
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
      "Blue - Ambient AI Shopping Agent Concept: https://angry-tacoz.github.io/best-buy-blue-concept/ and https://github.com/Angry-TacoZ/best-buy-blue-concept",
      "Delivery Composer: https://composer.jamesai.space/ and https://github.com/Angry-TacoZ/delivery-composer",
      "PDF Equipment Checker: https://pdf-checker-fcd6c.web.app/ and https://github.com/Angry-TacoZ/pdf-equipment-checker",
      "Personal Job Discovery: public local-first tool at https://github.com/Angry-TacoZ/personal-job-discovery",
      "Fieldline AEC concept: public local-only product exercise at https://github.com/Angry-TacoZ/ai-native-aec-product-design",
      "Race Telemetry Simulator: public local-only dashboard at https://github.com/Angry-TacoZ/race-telemetry",
      "Legitimate Question Response Index: https://lqri.web.app/ and public GitHub repo at https://github.com/Angry-TacoZ/lqri-site",
      "CAA 2026 PBM Regulatory Assistant: older source-grounded healthcare policy demo that is now offline; formerly hosted at https://caademoweb.web.app/.",
      "BLKVue AI Security Intake Bot: https://blkvueai.web.app/",
      "JamesLaneAI.com: https://jameslaneai.com/",
      "CogFit Jobs: https://cogfit-jobs.web.app/",
      "Cruis'n PA: https://cruisnpa.fun/",
      "Masters of Metal playable demo: https://iron-shores.web.app/",
      "Vast Lands: public GitHub repo at https://github.com/Angry-TacoZ/vast-lands",
      "X'TIGE: https://xtige-app.web.app/",
      "Iron Horizon WW2 Battleship Prototype: public GitHub repo at https://github.com/Angry-TacoZ/ww2-battleship-prototype",
      "Composio Dependency Graph: public GitHub repo at https://github.com/Angry-TacoZ/dep-graph"
    ]
  },
  {
    id: "github-project-blue-curated-journey",
    group: "projects-catalog",
    sourceLabel: "Public GitHub README",
    referenceLabel: "Angry-TacoZ/best-buy-blue-concept",
    title: "Blue Curated Laptop Journey",
    aliases: ["blue curated journey", "curated laptop", "curated collection", "blue checkout", "blue checkout simulation", "rebuild from current memory", "memory snapshot"],
    items: [
      "Public GitHub repo and live concept: https://github.com/Angry-TacoZ/best-buy-blue-concept and https://angry-tacoz.github.io/best-buy-blue-concept/.",
      "Blue now includes a local vertical slice from product browsing to a generated curated shortlist, selected laptop, labeled checkout simulation, and a no-purchase completion state.",
      "Each curated collection copies the current browser-local memory into an immutable snapshot, so later preference edits do not silently rewrite an already-generated selection. Rebuild from current memory creates a new collection.",
      "The journey uses fictional data and deterministic local logic. It does not connect to Best Buy, analytics, model APIs, authentication, inventory, payment, reservation, or purchasing systems."
    ]
  },
  {
    id: "github-project-personal-job-discovery",
    group: "projects-catalog",
    sourceLabel: "Public GitHub README",
    referenceLabel: "Angry-TacoZ/personal-job-discovery",
    title: "Personal Job Discovery",
    aliases: ["personal job discovery", "job discovery", "ats monitor", "greenhouse", "lever", "ashby", "local job monitor"],
    items: [
      "Public GitHub repo: https://github.com/Angry-TacoZ/personal-job-discovery.",
      "Local-first, single-user Python application that monitors public Greenhouse, Lever, and Ashby listings, normalizes them into SQLite, and applies explainable deterministic scoring.",
      "It binds to 127.0.0.1 by default, validates untrusted public ATS responses before persistence, and does not bypass authentication, scrape private pages, apply to jobs, send paid notifications, or use an LLM."
    ]
  },
  {
    id: "github-project-fieldline-aec",
    group: "projects-catalog",
    sourceLabel: "Public GitHub README",
    referenceLabel: "Angry-TacoZ/ai-native-aec-product-design",
    title: "Fieldline - Decision Continuity Artifact",
    aliases: ["fieldline", "aec", "architecture engineering construction", "decision continuity", "3d handoff", "product manager exercise"],
    items: [
      "Public GitHub repo: https://github.com/Angry-TacoZ/ai-native-aec-product-design.",
      "Speculative, local-only product exercise for an AI-native AEC platform that records simulated approvals and moves a proposed change into a simulated 3D handoff.",
      "All content and integrations are simulated; the project has no external APIs or data stores."
    ]
  },
  {
    id: "github-project-race-telemetry",
    group: "projects-catalog",
    sourceLabel: "Public GitHub README",
    referenceLabel: "Angry-TacoZ/race-telemetry",
    title: "Race Telemetry Simulator",
    aliases: ["race telemetry", "telemetry simulator", "vehicle telemetry", "engineer dashboard", "satellite link"],
    items: [
      "Public GitHub repo: https://github.com/Angry-TacoZ/race-telemetry.",
      "Presentation-ready, engineer-facing race telemetry dashboard driven entirely by deterministic mock data and a fixed simulated scenario.",
      "It is not connected to a vehicle, backend, database, remote transport, or external API and is not suitable for operational decisions."
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
      "Public GitHub repo: https://github.com/Angry-TacoZ/vast-lands",
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
      "Public GitHub repo: https://github.com/Angry-TacoZ/dep-graph",
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

  const PROHIBITION_LEADS = new Set([
    "Do not summarize these tradeoffs with statements like:",
    "Do not explain it like this:"
  ]);
  const PROHIBITION_CLOSERS = new Set([
    "Those summaries are too crude and often false.",
    "That is nonsense seasoning."
  ]);

  function parseBufferedLines(rawLines) {
    const items = [];
    const boundaries = [];
    let activeBoundary = null;

    for (const rawLine of rawLines) {
      const trimmed = rawLine.trim();

      if (!trimmed) {
        continue;
      }

      if (PROHIBITION_LEADS.has(trimmed)) {
        activeBoundary = {
          instruction: trimmed,
          prohibitedClaims: []
        };
        boundaries.push(activeBoundary);
        continue;
      }

      const bulletMatch = /^[-*]\s+(.+)$/.exec(trimmed);
      if (activeBoundary && bulletMatch) {
        activeBoundary.prohibitedClaims.push(bulletMatch[1].trim());
        continue;
      }

      if (activeBoundary && PROHIBITION_CLOSERS.has(trimmed)) {
        activeBoundary.explanation = trimmed;
        activeBoundary = null;
        continue;
      }

      activeBoundary = null;
      items.push(trimmed.replace(/^[-*]\s+/, "").trim());
    }

    return { items, boundaries };
  }

  function flushBuffer() {
    const { items, boundaries } = parseBufferedLines(buffer);

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
      items,
      boundaries
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



