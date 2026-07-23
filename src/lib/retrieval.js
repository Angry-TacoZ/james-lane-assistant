import {
  assistantName,
  refusalMessage,
  sourceCorpus
} from "../data/resumeCorpus.js";

const SAFE_ALIASES = {
  resume: ["summary", "background", "experience"],
  bio: ["summary", "background", "identity"],
  about: ["summary", "background", "identity"],
  tools: ["platforms", "software", "technology"],
  platforms: ["tools", "software", "technology"],
  technologies: ["tools", "platforms", "technology"],
  tech: ["technology", "tools", "platforms"],
  analytics: ["reporting", "metrics", "dashboard"],
  reporting: ["analytics", "metrics", "dashboard"],
  dashboards: ["dashboard", "analytics", "reporting"],
  dashboard: ["dashboards", "analytics", "reporting"],
  school: ["education", "diploma"],
  schooling: ["education", "diploma"],
  location: ["based", "remote", "hybrid", "relocate", "onsite"],
  onsite: ["in person", "location", "remote", "hybrid"],
  "in-person": ["onsite", "location", "remote", "hybrid"],
  mail: ["email"],
  call: ["phone"],
  telephone: ["phone"],
  ai: ["ai-ready", "ai-assisted", "ai enablement"],
  platfroms: ["platforms", "tools"],
  analytcs: ["analytics"],
  reportng: ["reporting"],
  linkdin: ["linkedin"],
  powerbi: ["power", "bi", "power bi"],
  kpis: ["kpi"],
  iam: ["identity", "access", "management"],
  tradeoffs: ["friction", "weaknesses"],
  weakness: ["tradeoffs", "friction"],
  weaknesses: ["tradeoffs", "friction"],
  environment: ["fit", "culture", "manager", "team"],
  fit: ["match", "mismatch", "stretch", "strong"],
  best: ["strengths", "strongest", "advantages", "capabilities"],
  strongest: ["strengths", "best", "advantages", "capabilities"],
  projects: ["evidence", "portfolio", "artifacts"],
  project: ["evidence", "portfolio", "artifacts"],
  live: ["links", "demo", "site", "website", "project"],
  links: ["live", "url", "demo", "site", "website"],
  demo: ["live", "project", "site", "website"],
  website: ["site", "live", "link", "project"],
  site: ["website", "live", "link", "project"],
  evidence: ["projects", "artifacts", "proof"],
  design: ["art", "artwork", "visual", "portfolio", "logo"],
  artwork: ["art", "design", "visual", "portfolio"],
  art: ["artwork", "design", "visual", "portfolio"],
  visual: ["design", "art", "artwork", "portfolio"],
  logo: ["design", "brand", "motion", "animation"],
  motion: ["animation", "design", "logo"],
  candidate: ["identity", "background", "fit"],
  roles: ["role", "fit"],
  remote: ["hybrid", "relocate", "location"],
  hybrid: ["remote", "location"],
  relocate: ["remote", "hybrid", "location"],
  audhd: ["autism", "adhd", "neurodivergent", "executive function", "sensory", "social cues"],
  autism: ["audhd", "neurodivergent", "social cues", "sensory", "level 1"],
  adhd: ["audhd", "neurodivergent", "executive function", "attention", "organization"],
  neurodivergent: ["audhd", "autism", "adhd"],
  sensory: ["audhd", "autism", "environment"],
  "social-cue": ["social cues", "autism", "communication"],
  "cue": ["social cues", "communication"],
  "cues": ["social cues", "communication"],
  queue: ["cue", "cues", "social cues"],
  dysregulation: ["executive function", "adhd", "task control"],
  dysfunction: ["executive function", "adhd", "task control"],
  perceptual: ["perceptual load", "pattern detection", "visual"],
  cognitive: ["cognitive load", "executive function", "working memory"],
  diabetes: ["type 2", "insulin", "neuropathy", "health", "accommodations"],
  diabetic: ["diabetes", "neuropathy", "insulin"],
  insulin: ["diabetes", "blood sugar", "glucose"],
  neuropathy: ["diabetic neuropathy", "mobility", "remote", "onsite"],
  peripheral: ["neuropathy", "mobility"],
  charcot: ["charcot foot", "neuropathy", "mobility", "foot"],
  foot: ["charcot", "neuropathy", "mobility"],
  diaphragm: ["collapsed diaphragm", "breathing", "exertion", "remote", "onsite"],
  breathing: ["diaphragm", "exertion", "onsite"],
  gastroparesis: ["digestive", "diabetes", "schedule", "restroom"],
  tinnitus: ["hearing", "noise", "audio", "sensory"],
  shoulder: ["frozen shoulder", "range of motion", "ergonomic"],
  shoulders: ["frozen shoulder", "range of motion", "ergonomic"],
  cancer: ["colon cancer", "remission", "accommodations", "health"],
  remission: ["cancer", "colon cancer", "survivorship"],
  mobility: ["neuropathy", "diaphragm", "remote", "onsite"],
  disability: ["health", "remote", "hybrid", "accommodations"],
  accommodations: ["remote", "hybrid", "work style", "health"],
  legislation: ["policy", "pbm", "caa"],
  pbm: ["legislation", "policy"],
  lqri: ["benchmark", "model", "evaluation", "transcripts"],
  benchmark: ["lqri", "model", "evaluation", "scoring"],
  cogfit: ["jobs", "fit", "job fit", "job ads", "evaluation"],
  proposal: ["claims", "assistant", "innovation", "governance"],
  governance: ["committee", "proposal"],
  cbc: ["proposal faq assistant", "claims ai pilot"],
  living: ["resume ai", "living resume", "interactive resume"],
  regulatory: ["pbm", "caa", "legislation"],
  security: ["intake", "assessment", "blkvue"],
  consulting: ["jameslaneai.com", "services"],
  employers: ["employer", "described", "explained"],
  ba: ["business", "analyst", "business analyst", "business analysis"],
  business: ["analysis", "analyst", "requirements", "process", "workflow"],
  analyst: ["analysis", "requirements", "process", "workflow"],
  requirements: ["business analysis", "workflow", "process mapping", "uat", "documentation"],
  requirement: ["requirements", "business analysis", "workflow"],
  workflow: ["process", "analysis", "business analysis", "operations"],
  process: ["workflow", "mapping", "optimization", "analysis"],
  stakeholder: ["requirements", "business analysis", "communication"],
  uat: ["validation", "testing", "change impact", "business analysis"],
  meeting: ["meetings", "presentation", "facilitation", "stakeholder", "leadership", "communication"],
  meetings: ["meeting", "presentation", "facilitation", "stakeholder", "leadership"],
  present: ["presentation", "leadership", "communication"],
  presentation: ["present", "leadership", "stakeholder"],
  facilitate: ["meeting", "meetings", "stakeholder", "communication"],
  facilitation: ["meeting", "meetings", "stakeholder", "communication"],
  developer: ["technical", "documentation", "writing", "education", "community"],
  developers: ["developer", "technical", "community", "documentation"],
  technical: ["developer", "documentation", "writing", "explanation"],
  communication: ["writing", "documentation", "explanation", "stakeholder"],
  documentation: ["writing", "technical", "communication", "training"],
  community: ["public", "writing", "communication", "audience"],
  relations: ["communication", "stakeholder", "public"],
  advocacy: ["communication", "public", "writing"],
  advocate: ["advocacy", "communication", "public"],
  education: ["writing", "documentation", "training", "communication"],
  educator: ["education", "writing", "communication"],
  training: ["documentation", "education", "stakeholder explanations"],
  content: ["writing", "communication", "public"],
  software: ["engineering", "developer", "technical", "build", "prototype", "deployment"],
  engineer: ["engineering", "software", "developer", "technical", "build"],
  engineering: ["engineer", "software", "developer", "technical", "build"],
  developers: ["developer", "software", "technical", "build"],
  coding: ["code", "developer", "software", "technical"],
  code: ["coding", "developer", "software", "technical"],
  programming: ["code", "coding", "software", "technical"],
  adapt: ["ramp", "adjust", "learn", "fit", "transition"],
  adaptable: ["adapt", "ramp", "adjust", "learn"],
  ramp: ["adapt", "learn", "transition"],
  transition: ["adapt", "ramp", "fit"],
  politics: ["workplace", "organizational", "internal", "culture"],
  degree: ["college", "credential", "credentials", "pedigree", "nontraditional"],
  degrees: ["degree", "college", "credential", "credentials"],
  college: ["degree", "degrees", "credential", "pedigree"],
  credential: ["credentials", "degree", "college", "pedigree"],
  credentials: ["credential", "degree", "college", "pedigree"],
  pedigree: ["credential", "credentials", "degree", "nontraditional"],
  hire: ["fit", "candidate", "strengths", "value"],
  hiring: ["hire", "fit", "candidate"],
  iron: ["iron tides", "portfolio", "game"],
  tides: ["iron tides", "portfolio", "game"],
  game: ["portfolio", "project", "artifact", "iron tides"],
  godot: ["porting", "game", "iron tides"],
  porting: ["godot", "game", "experiment"],
  animation: ["art", "design", "motion", "logo", "menu", "game"],
  menu: ["animation", "game"],
  wooden: ["art", "game"],
  battleship: ["gameplay", "iron tides", "game"],
  medium: ["writing", "articles", "essays", "published"],
  article: ["writing", "essay", "medium", "published"],
  articles: ["writing", "essay", "medium", "published"],
  essay: ["writing", "articles", "medium", "published"],
  essays: ["writing", "articles", "medium", "published"],
  writing: ["articles", "essays", "medium", "published"],
  wrote: ["writing", "published", "article", "essay"],
  written: ["writing", "published", "article", "essay"],
  published: ["writing", "article", "essay", "medium"],
  opinion: ["writing", "essay", "published"],
  opinions: ["writing", "essay", "published"],
  pdoom: ["p doom", "agi", "hallucination", "writing"],
  miata: ["ode", "writing", "article"],
  soulfight: ["writing", "article", "essay"]
};

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "at",
  "be",
  "can",
  "describe",
  "did",
  "do",
  "does",
  "for",
  "he",
  "his",
  "how",
  "i",
  "is",
  "james",
  "lane",
  "list",
  "listed",
  "me",
  "of",
  "or",
  "the",
  "there",
  "to",
  "what",
  "which",
  "who",
  "with"
]);

const UNSUPPORTED_PATTERN = /\b(compare|comparison|better than|best candidate|salary|compensation|medical advice|legal advice|stock pick|religion)\b/i;
const FIT_EVALUATION_PATTERN = /\b(how would|would james|could james|can james|do well|good fit|fit for|fit in|handle|succeed|qualified|would he|could he|can he)\b/;
const BA_CAPABILITY_PATTERN = /\b(business analyst|business analysis|systems analyst|analyst role|analyst job|requirements|requirement|stakeholder|workflow|workflow design|process mapping|process improvement|operations analysis|reporting|dashboard|dashboards|sql|power bi|tableau|uat|user acceptance)\b/;
const MEETING_PATTERN = /\b(meeting|meetings|present|presentation|presenting|facilitate|facilitation|stakeholder|stakeholders|workshop|workshops|leadership discussion|leadership meeting)\b/;
const ART_DESIGN_QUERY_PATTERN = /\b(art and design|art design|design work|artwork|visual design|graphic design|logo design|motion design|logo animation|defillama|cruis n pa visuals?|cruisn pa visuals?|car club art)\b/;
const HEALTH_CONTEXT_PATTERN = /\b(audhd|autism|autistic|adhd|neurodivergent|neurodivergence|diagnosis|diagnoses|social cues?|social queue|executive function|executive dysfunction|dysregulation|sensory|sensory input|sensory aversion|perceptual load|cognitive load|diabetes|type 2|insulin|diabetic neuropathy|peripheral neuropathy|neuropathy|charcot|charcot foot|collapsed diaphragm|diaphragm|gastroparesis|tinnitus|frozen shoulder|shoulder|colon cancer|cancer|remission|mobility|medical|health|health section|health condition|health conditions|disability|disabled|accommodation|accommodations|onsite|on-site|in person|in-person)\b/;
const AUDHD_CONTEXT_PATTERN = /\b(audhd|autism|autistic|adhd|neurodivergent|neurodivergence|diagnosis|diagnoses|social cues?|social queue|executive function|executive dysfunction|dysregulation|sensory|sensory input|sensory aversion|perceptual load|cognitive load)\b/;
const GROUP_BY_INTENT = {
  contact: ["resume-pdf"],
  headline: ["resume-pdf"],
  skills: ["resume-pdf", "cognitive-profile", "core-identity", "evidence-and-projects", "health-and-neurodivergence"],
  tools: ["resume-pdf"],
  analytics: ["resume-pdf"],
  education: ["resume-pdf"],
  experience: ["resume-pdf"],
  identity: ["core-identity", "cognitive-profile"],
  environment: ["environment-fit-model", "health-and-neurodivergence"],
  tradeoffs: ["friction-points-and-tradeoffs", "cognitive-profile", "health-and-neurodivergence"],
  communication: ["communication-rules", "cognitive-profile"],
  evidence: ["evidence-and-projects", "projects-catalog"],
  projects: ["projects-catalog", "portfolio-media-index"],
  writing: ["writing-catalog", "writing-corpus", "writing-supporting-analysis"],
  roleFit: ["role-fit-model", "environment-fit-model", "core-identity", "resume-pdf", "evidence-and-projects", "cognitive-profile", "health-and-neurodivergence", "work-location-preference"],
  workLocation: ["work-location-preference", "core-identity", "health-and-neurodivergence", "health-accommodations"],
  healthContext: ["health-accommodations", "health-and-neurodivergence", "work-location-preference", "cognitive-profile", "friction-points-and-tradeoffs", "environment-fit-model"],
  representation: ["profile-ingestion-rules", "communication-rules", "core-identity"]
};

const MODE_GROUP_BOOSTS = {
  profile: ["core-identity", "cognitive-profile", "evidence-and-projects", "communication-rules"],
  fit: ["role-fit-model", "environment-fit-model", "friction-points-and-tradeoffs", "core-identity", "cognitive-profile"],
  evidence: ["evidence-and-projects", "projects-catalog", "resume-pdf", "core-identity"],
  projects: ["projects-catalog", "portfolio-media-index", "resume-pdf"],
  writing: ["writing-catalog", "writing-corpus", "writing-supporting-analysis"],
  resume: ["resume-pdf", "work-location-preference"]
};

const PROJECT_ENTITIES = [
  {
    id: "living-resume-ai",
    questionPattern: /\b(living resume ai|living resume|interactive resume|james ai)\b/,
    sectionPattern: /\b(living resume ai|interactive resume|james ai)\b/
  },
  {
    id: "lqri",
    questionPattern: /\b(lqri|lqri v2|legitimate question response index|lqri-site|lqri\.web\.app|llm benchmark|model benchmark)\b/,
    sectionPattern: /\b(lqri|lqri v2|legitimate question response index|lqri-site|lqri\.web\.app|llm benchmark|model benchmark)\b/
  },
  {
    id: "caa-2026-pbm-regulatory-assistant",
    questionPattern: /\b(caa 2026 pbm regulatory assistant|pbm regulatory assistant|caa 2026|caademoweb)\b/,
    sectionPattern: /\b(caa 2026 pbm regulatory assistant|pbm regulatory assistant|caa 2026|caademoweb)\b/
  },
  {
    id: "blkvue-ai-security-intake-bot",
    questionPattern: /\b(blkvue ai security intake bot|blkvue|security intake bot)\b/,
    sectionPattern: /\b(blkvue ai security intake bot|blkvue|security intake bot)\b/
  },
  {
    id: "jameslaneai-com",
    questionPattern: /\b(jameslaneai\.com|james lane ai dot com|consulting site)\b/,
    sectionPattern: /\b(jameslaneai\.com|james lane ai dot com|consulting site)\b/
  },
  {
    id: "cogfit-jobs",
    questionPattern: /\b(cogfit jobs|cogfit|cogfit-jobs\.web\.app|job fit tool|job fit evaluator|job ad evaluator)\b/,
    sectionPattern: /\b(cogfit jobs|cogfit|cogfit-jobs\.web\.app|job fit tool|job fit evaluator|job ad evaluator)\b/
  },
  {
    id: "cruisn-pa",
    questionPattern: /\b(cruisn pa|cruis n pa|cruis['’]?n pa|cruisnpa\.fun|driving club|club website)\b/,
    sectionPattern: /\b(cruisn pa|cruis n pa|cruis['’]?n pa|cruisnpa\.fun|driving club|club website)\b/
  },
  {
    id: "iron-shores",
    questionPattern: /\b(masters of metal|iron shores|iron-shores\.web\.app|playable demo)\b/,
    sectionPattern: /\b(masters of metal|iron shores|playable demo|iron-shores\.web\.app)\b/
  },
  {
    id: "vast-lands",
    questionPattern: /\b(vast lands|babylon city builder|isometric city builder|anno style|civ style)\b/,
    sectionPattern: /\b(vast lands|babylon city builder|isometric city builder|anno style|civ style)\b/
  },
  {
    id: "xtige",
    questionPattern: /\b(xtige|x tige|x'tige|car social app|garage|bounties|crew|live map)\b/,
    sectionPattern: /\b(xtige|x tige|x'tige|car social app|garage|bounties|crew|live map)\b/
  },
  {
    id: "iron-horizon-ww2-battleship",
    questionPattern: /\b(iron horizon|ww2 battleship prototype|ww2 horde survival|naval combat|battleship combat)\b/,
    sectionPattern: /\b(iron horizon|ww2 battleship prototype|ww2 horde survival|naval combat|battleship combat)\b/
  },
  {
    id: "composio-dependency-graph",
    questionPattern: /\b(benchmarking tool|benchmark tool|composio dependency graph|dependency graph|tool routing|agent workflow graph)\b/,
    sectionPattern: /\b(benchmarking tool|benchmark tool|composio dependency graph|dependency graph|tool routing|agent workflow graph)\b/
  },
  {
    id: "iron-tides",
    questionPattern: /\b(iron tides|godot 4 porting experiment|main menu animation|wooden decks|battleship gameplay)\b/,
    sectionPattern: /\b(iron tides|portfolio media index|godot 4 porting experiment|main menu animation|wooden decks|battleship gameplay|game development - iron tides|ai-assisted game-development workflow and engine experimentation)\b/
  }
];

const WRITING_ENTITIES = [
  {
    id: "dont-be-duped-by-government-propaganda",
    questionPattern: /\b(don[’']?t be duped by government propaganda|government propaganda)\b/i,
    sectionPattern: /\b(don[’']?t be duped by government propaganda|government propaganda)\b/i
  },
  {
    id: "the-constitution-needs-you",
    questionPattern: /\b(the constitution needs you|constitution needs you)\b/i,
    sectionPattern: /\b(the constitution needs you|constitution needs you)\b/i
  },
  {
    id: "vengeance-is-best-not-served-at-all",
    questionPattern: /\b(vengeance is best not served at all|team sports will lead to america['’]s downfall)\b/i,
    sectionPattern: /\b(vengeance is best not served at all|team sports will lead to america['’]s downfall)\b/i
  },
  {
    id: "is-it-2025-or-1857",
    questionPattern: /\b(is it 2025 or 1857|2025 or 1857|1857)\b/i,
    sectionPattern: /\b(is it 2025 or 1857|2025 or 1857|1857)\b/i
  },
  {
    id: "all-lives-matter-except-for-palestinians",
    questionPattern: /\b(all lives matter except for palestinians|pearl clutch heard around the world|bob vylan)\b/i,
    sectionPattern: /\b(all lives matter except for palestinians|pearl clutch heard around the world|bob vylan)\b/i
  },
  {
    id: "et-tu-mom",
    questionPattern: /\b(et tu mom|et tu, mom|a tale as old as time)\b/i,
    sectionPattern: /\b(et tu mom|et tu, mom|a tale as old as time)\b/i
  },
  {
    id: "ode-to-miata",
    questionPattern: /\b(ode to miata|miata|lilith)\b/i,
    sectionPattern: /\b(ode to miata|how a little car rekindled a big spirit|miata|lilith)\b/i
  },
  {
    id: "p-doom-or-big-boon",
    questionPattern: /\b(p\(doom\) or big boon|p doom or big boon|big boon|p\(doom\)|agi article)\b/i,
    sectionPattern: /\b(p\(doom\) or big boon|p doom or big boon|big boon|agi analysis)\b/i
  },
  {
    id: "constitution-linked-denaturalization-analysis",
    questionPattern: /\b(full chatgpt analysis|linked analysis|denaturalization analysis|overton window analysis|citizenship risk analysis)\b/i,
    sectionPattern: /\b(denaturalization and democratic erosion analysis|full chatgpt analysis|linked analysis)\b/i
  }
];

function normalizeText(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[|/]/g, " ")
    .replace(/[^\x00-\x7F]/g, " ")
    .replace(/[^\w\s+-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return [];
  }

  return normalized
    .split(" ")
    .filter(Boolean)
    .filter((token) => !STOPWORDS.has(token));
}

function editDistance(a, b) {
  const rows = Array.from({ length: a.length + 1 }, (_, index) => [index]);

  for (let column = 1; column <= b.length; column += 1) {
    rows[0][column] = column;
  }

  for (let row = 1; row <= a.length; row += 1) {
    for (let column = 1; column <= b.length; column += 1) {
      const substitutionCost = a[row - 1] === b[column - 1] ? 0 : 1;
      rows[row][column] = Math.min(
        rows[row - 1][column] + 1,
        rows[row][column - 1] + 1,
        rows[row - 1][column - 1] + substitutionCost
      );
    }
  }

  return rows[a.length][b.length];
}

function expandTokens(tokens) {
  const expanded = new Set(tokens);

  for (const token of tokens) {
    const aliases = SAFE_ALIASES[token];

    if (!aliases) {
      continue;
    }

    for (const alias of aliases) {
      for (const aliasToken of tokenize(alias)) {
        expanded.add(aliasToken);
      }
    }
  }

  return [...expanded];
}

function isFollowUpQuestion(question) {
  const trimmed = question.trim();

  if (/^(what about|how about|and)\b/i.test(trimmed)) {
    return true;
  }

  if (/\b(example|examples|specific example|concrete example|show me one|give me one)\b/i.test(trimmed)) {
    return true;
  }

  return /\b(there|that|those|them|it|he|his|this role|that role)\b/i.test(trimmed);
}

function buildEffectiveQuestion(question, history) {
  if (!isFollowUpQuestion(question)) {
    return question;
  }

  const recentTurns = history
    .filter((turn) => turn.role === "user")
    .slice(-2)
    .map((turn) => turn.content.trim())
    .filter(Boolean);

  return [...recentTurns, question.trim()].join(" ");
}

function getSectionKeywords(section) {
  return expandTokens(tokenize([section.title, ...section.aliases, ...section.items].join(" ")));
}

function getIntent(question, preferredIntent = null) {
  const normalized = normalizeText(question);
  const matchedProjectEntity = getMatchedProjectEntity(normalized);
  const matchedWritingEntity = getMatchedWritingEntity(normalized);

  if (ART_DESIGN_QUERY_PATTERN.test(normalized)) {
    return "projects";
  }

  if (isExampleRequest(normalized) && /\b(project|work|built|build|process|workflow|systems thinking|example|evidence)\b/.test(normalized)) {
    return "evidence";
  }

  if (/\b(email|phone|linkedin|contact)\b/.test(normalized)) {
    return "contact";
  }

  if (
    HEALTH_CONTEXT_PATTERN.test(normalized) &&
    /\b(remote|hybrid|relocate|relocation|onsite|on-site|in person|in-person|move around|mobility|commute|commuting)\b/.test(normalized)
  ) {
    return "workLocation";
  }

  if (HEALTH_CONTEXT_PATTERN.test(normalized)) {
    return "healthContext";
  }

  if (/\b(location|remote|hybrid|relocate|relocation)\b/.test(normalized)) {
    return "workLocation";
  }

  if (
    matchedWritingEntity ||
    /\b(medium|article|articles|essay|essays|writing|wrote|written|published writing|published essay|published article|blog|opinion pieces|writing samples)\b/.test(
      normalized
    )
  ) {
    return "writing";
  }

  if (/\b(role|roles|title|headline|position)\b/.test(normalized) && !/\bfit\b/.test(normalized)) {
    return "headline";
  }

  if (
    (FIT_EVALUATION_PATTERN.test(normalized) && /\b(job|role|position)\b/.test(normalized)) ||
    (FIT_EVALUATION_PATTERN.test(normalized) && BA_CAPABILITY_PATTERN.test(normalized))
  ) {
    return "roleFit";
  }

  if (FIT_EVALUATION_PATTERN.test(normalized) && looksLikeRoleTitleQuestion(normalized)) {
    return "roleFit";
  }

  if (FIT_EVALUATION_PATTERN.test(normalized) && MEETING_PATTERN.test(normalized)) {
    return "roleFit";
  }

  if (/\b(capital blue cross|claims examiner|claims operations analyst|claims|randstad|icu medical|enterprise it)\b/.test(normalized)) {
    return "experience";
  }

  if (/\b(analytics|reporting|dashboard|dashboards|power bi|tableau|sql|dax|kpi|kpis|metrics)\b/.test(normalized)) {
    return "analytics";
  }

  if (/\b(skill|skills|strength|strengths|capabilities|competencies|strongest|strong suit)\b/.test(normalized) || /\bbest at\b/.test(normalized)) {
    return "skills";
  }

  if (/\b(benchmarking tool|benchmark tool|dependency graph|tool routing|agent workflow graph)\b/.test(normalized)) {
    return "projects";
  }

  if (/\b(tool|tools|platform|platforms|software|technology|technologies)\b/.test(normalized)) {
    return "tools";
  }

  if (/\b(education|school|diploma|schooling|academic)\b/.test(normalized)) {
    return "education";
  }

  if (/\b(environment|environments|culture|manager|team|workplace politics|organizational politics|best fit conditions|poor fit conditions)\b/.test(normalized)) {
    return "environment";
  }

  if (/\b(tradeoff|tradeoffs|friction|weakness|weaknesses|limitation|limitations|mismatch risk)\b/.test(normalized)) {
    return "tradeoffs";
  }

  if (/\b(communicate|communication|describe|described|explained|representation|voice|tone)\b/.test(normalized)) {
    return /\b(employer|employers|representation|represent)\b/.test(normalized) ? "representation" : "communication";
  }

  if (
    /\b(live projects?|project links?|project artifacts?|live links?|live demos?|demo links?|web apps?|websites?|sites?|what can i review live|what can i try|portfolio links?|portfolio examples?|hosted media|portfolio media|benchmarking tool|benchmark tool|dependency graph|tool routing|github repos?)\b/.test(normalized) ||
    matchedProjectEntity ||
    (/\biron tides\b/.test(normalized) && /\b(video|videos|media|watch|review|portfolio)\b/.test(normalized))
  ) {
    return "projects";
  }

  if (/\b(evidence|project|projects|portfolio|artifact|artifacts|build|built|bot|bots|proposal|legislation|pbm|governance|committee)\b/.test(normalized)) {
    return "evidence";
  }

  if (/\b(strong fit|moderate fit|stretch fit|weak fit|fit for|qualified|qualification|role fit|good fit|adapt|adaptable|ramp up|ramp|transition|hire|hired|college degree|degree|degrees|credential|credentials|credential gap|pedigree|nontraditional background)\b/.test(normalized)) {
    return "roleFit";
  }

  if (/\b(identity|candidate|background|career direction|who is james|nontraditional)\b/.test(normalized)) {
    return "identity";
  }

  if (/\b(summary|overview|about)\b/.test(normalized)) {
    return "identity";
  }

  return preferredIntent;
}

function isExampleRequest(normalizedQuestion) {
  return /\b(example|examples|specific example|concrete example|show me one|give me one)\b/.test(normalizedQuestion);
}

function getMatchedProjectEntity(normalizedQuestion) {
  return PROJECT_ENTITIES.find((entity) => entity.questionPattern.test(normalizedQuestion)) ?? null;
}

function getMatchedWritingEntity(normalizedQuestion) {
  return WRITING_ENTITIES.find((entity) => entity.questionPattern.test(normalizedQuestion)) ?? null;
}

function sectionMatchesProjectEntity(section, entity) {
  const sectionText = normalizeText([section.title, ...section.aliases, ...section.items].join(" "));
  return entity.sectionPattern.test(sectionText);
}

function sectionMatchesWritingEntity(section, entity) {
  const sectionText = normalizeText([section.title, ...section.aliases, ...section.items].join(" "));
  return entity.sectionPattern.test(sectionText);
}

function looksLikeRoleTitleQuestion(normalizedQuestion) {
  return /\b(?:as|at|for|in)\s+(?:a|an)?\s*(?!james\b|lane\b|him\b|his\b|this\b|that\b|the\b)([a-z][a-z/-]*(?:\s+[a-z][a-z/-]*){0,4})\b/.test(
    normalizedQuestion
  );
}

function isGenericRoleFitQuestion(normalizedQuestion) {
  return (
    !BA_CAPABILITY_PATTERN.test(normalizedQuestion) &&
    !MEETING_PATTERN.test(normalizedQuestion) &&
    !/hire|hired|degree|degrees|college|credential|credentials|pedigree|nontraditional/.test(normalizedQuestion) &&
    !/what roles|roles look like|kinds of roles|which roles/.test(normalizedQuestion)
  );
}

function getQueryPhrases(question) {
  const normalized = normalizeText(question);
  const phrases = [];

  for (const phrase of [
    "power bi",
    "business analyst",
    "business analysis",
    "living resume ai",
    "legitimate question response index",
    "lqri v2",
    "caa 2026 pbm regulatory assistant",
    "blkvue ai security intake bot",
    "jameslaneai com",
      "masters of metal",
      "iron shores",
    "identity access",
    "capital blue cross",
    "randstad digital",
    "icu medical",
    "active directory",
    "azure ad",
    "work location preference",
    "strong fit",
    "stretch fit",
    "governance committee",
    "innovation committee",
    "workplace politics",
    "college degree",
    "credential gap",
    "iron tides",
    "godot 4",
    "main menu",
    "wooden decks",
    "screen recording",
    "p doom or big boon",
    "ode to miata",
    "et tu mom",
    "constitution needs you",
    "government propaganda",
    "public writing",
    "full chatgpt analysis"
  ]) {
    if (normalized.includes(phrase)) {
      phrases.push(phrase);
    }
  }

  return phrases;
}

function scoreSection(section, question, intent, modeId = null) {
  const queryTokens = expandTokens(tokenize(question));
  const sectionKeywords = getSectionKeywords(section);
  const keywordSet = new Set(sectionKeywords);
  const phrases = getQueryPhrases(question);
  const normalizedQuestion = normalizeText(question);
  const normalizedTitle = normalizeText(section.title);
  const matchedProjectEntity = getMatchedProjectEntity(normalizedQuestion);
  const matchedWritingEntity = getMatchedWritingEntity(normalizedQuestion);
  let score = 0;
  let exactMatches = 0;

  for (const token of queryTokens) {
    if (keywordSet.has(token)) {
      score += 3;
      exactMatches += 1;
      continue;
    }

    if (token.length < 5) {
      continue;
    }

    const fuzzyMatch = sectionKeywords.find((keyword) => {
      if (Math.abs(keyword.length - token.length) > 1) {
        return false;
      }

      return editDistance(token, keyword) <= 1;
    });

    if (fuzzyMatch) {
      score += 1;
    }
  }

  const sectionText = normalizeText([section.title, ...section.items].join(" "));

  for (const phrase of phrases) {
    if (sectionText.includes(phrase)) {
      score += 4;
      exactMatches += 1;
    }
  }

  if (!/\bpurpose\b/.test(normalizedQuestion) && /\bpurpose\b/.test(normalizedTitle)) {
    score -= 3;
  }

  if (intent && GROUP_BY_INTENT[intent]?.includes(section.group)) {
    score += 6;
    exactMatches += 1;
  }

  if (modeId && MODE_GROUP_BOOSTS[modeId]?.includes(section.group)) {
    score += 2;
  }

  if (intent === "environment" && /high fit environment traits|moderate fit environments|low fit environment traits|stress pattern under good fit/.test(normalizedTitle)) {
    score += 5;
  }

  if (intent === "environment" && /\bpurpose\b/.test(normalizedTitle)) {
    score -= 7;
  }

  if (intent === "environment" && /best fit|thrive/.test(normalizedQuestion) && /high fit environment traits/.test(normalizedTitle)) {
    score += 4;
  }

  if (intent === "environment" && /workplace politics|organizational politics|internal politics|politics/.test(normalizedQuestion) && /low fit environment traits|conditions that increase friction|poor fit conditions/.test(normalizedTitle)) {
    score += 6;
  }

  if (intent === "tradeoffs" && /recurring friction points|recurring tradeoffs|safe summary|misleading simplifications to avoid/.test(normalizedTitle)) {
    score += 5;
  }

  if (intent === "roleFit" && /fit categories|how to explain a stretch fit|how to explain a weak fit|evaluation method|ramp feasibility/.test(normalizedTitle)) {
    score += 6;
  }

  if (intent === "roleFit" && /strong fit|stretch fit/.test(normalizedQuestion) && /strong fit|stretch fit/.test(normalizedTitle)) {
    score += 4;
  }

  if (intent === "roleFit" && /adapt|adaptable|ramp|transition|learn quickly/.test(normalizedQuestion) && /ramp feasibility|learning style|candidate type|professional value thesis|how to explain a stretch fit/.test(normalizedTitle)) {
    score += 7;
  }

  if (intent === "roleFit" && /hire|hired|degree|degrees|college|credential|credentials|pedigree|nontraditional/.test(normalizedQuestion) && /credential gap|nontraditional background framing|candidate type|how james should be explained to employers|professional value thesis/.test(normalizedTitle)) {
    score += 8;
  }

  if (intent === "roleFit" && BA_CAPABILITY_PATTERN.test(normalizedQuestion) && /professional summary|core strengths|tools|capital blue cross|claims examiner|help desk analyst|career direction|role family implications/.test(normalizedTitle)) {
    score += 8;
  }

  if (intent === "roleFit" && BA_CAPABILITY_PATTERN.test(normalizedQuestion) && /\btools\b/.test(normalizedTitle)) {
    score += 6;
  }

  if (intent === "roleFit" && MEETING_PATTERN.test(normalizedQuestion) && /communication fit|communication style|written structured communication|not optimized for constant live verbal interaction|claims ai proposal and governance track internal innovation work|proposal faq assistant bot|capital blue cross|enterprise it analyst/.test(normalizedTitle)) {
    score += 9;
  }

  if (intent === "roleFit" && MEETING_PATTERN.test(normalizedQuestion) && /fit categories|evaluation method|ramp feasibility/.test(normalizedTitle)) {
    score -= 4;
  }

  if (intent === "roleFit" && /what roles|roles look like|kinds of roles|which roles/.test(normalizedQuestion) && /role family implications|career direction/.test(normalizedTitle)) {
    score += 8;
  }

  if (intent === "roleFit" && /what roles|roles look like|kinds of roles|which roles/.test(normalizedQuestion) && /fit categories|how to explain a stretch fit|how to explain a weak fit/.test(normalizedTitle)) {
    score += 2;
  }

  if (
    intent === "roleFit" &&
    isGenericRoleFitQuestion(normalizedQuestion) &&
    /professional summary|core strengths|candidate type|professional value thesis|how james should be explained to employers|role family implications|stress pattern under good fit|public writing and structured analysis|interactive employer facing and decision facing tool concepts|evidence pattern summary|core evidence themes|work relevant strength pattern|communication style|ramp feasibility|fit categories|technical troubleshooting and systems reasoning|productive build pattern|strongly supported claims|moderately supported claims|not automatically supported claims|\btools\b/.test(
      normalizedTitle
    )
  ) {
    score += 8;
  }

  if (intent === "skills" && /core skills|work relevant strength pattern|strongest recurring cognitive advantages|professional value thesis|safe summary/.test(normalizedTitle)) {
    score += 5;
  }

  if (intent === "skills" && /best at/.test(normalizedQuestion) && /work relevant strength pattern|strongest recurring cognitive advantages|professional value thesis|identity summary|safe summary/.test(normalizedTitle)) {
    score += 7;
  }

  if (intent === "skills" && /best at/.test(normalizedQuestion) && /learning style|verification and trust model/.test(normalizedTitle)) {
    score -= 4;
  }

  if (intent === "workLocation" && /work location preference/.test(normalizedTitle)) {
    score += 8;
  }

  if (intent === "workLocation" && HEALTH_CONTEXT_PATTERN.test(normalizedQuestion) && /health and neurodivergence context|health and accessibility overview|physical health and work location context|remote and hybrid preference|employer-facing safe summary|charcot foot|advanced peripheral neuropathy|collapsed diaphragm/.test(normalizedTitle)) {
    score += 12;
  }

  if (intent === "healthContext" && /health and neurodivergence context|health and accessibility overview|self-disclosed diagnoses|strengths connected to audhd|weaknesses and friction connected to audhd|physical health and work location context|remote and hybrid preference|employer-facing safe summary|privacy and representation boundary/.test(normalizedTitle)) {
    score += 14;
  }

  if (intent === "healthContext" && section.group === "health-accommodations") {
    score += 10;
  }

  if (intent === "healthContext" && /audhd|autism|adhd|neurodivergent|social cues|social queue|executive function|executive dysfunction|dysregulation|sensory|perceptual load|cognitive load/.test(normalizedQuestion) && /self-disclosed diagnoses|strengths connected to audhd|weaknesses and friction connected to audhd|autism level 1|adhd with executive-function dysregulation/.test(normalizedTitle)) {
    score += 8;
  }

  if (intent === "healthContext" && /diabetes|type 2|insulin|diabetic neuropathy|peripheral neuropathy|neuropathy|charcot|charcot foot|collapsed diaphragm|diaphragm|gastroparesis|tinnitus|frozen shoulder|shoulder|colon cancer|cancer|remission|remote|hybrid|onsite|on-site|in person|in-person|mobility/.test(normalizedQuestion) && /physical health and work location context|remote and hybrid preference|type 2 diabetes|advanced peripheral neuropathy|charcot foot|collapsed diaphragm|gastroparesis|tinnitus|frozen shoulders|colon cancer/.test(normalizedTitle)) {
    score += 8;
  }

  if (intent === "evidence" && /evidence pattern summary|core evidence themes|major project and evidence areas|productive build pattern/.test(normalizedTitle)) {
    score += 5;
  }

  if (
    intent === "evidence" &&
    isExampleRequest(normalizedQuestion) &&
    /claims ai proposal|proposal faq assistant bot|pharmacy technical ba interview bot grounded in legislation|living resume ai|legitimate question response index|cogfit jobs|blkvue ai security intake bot|project artifact links|productive build pattern|major project and evidence areas/.test(
      normalizedTitle
    )
  ) {
    score += 12;
  }

if (intent === "projects" && /project artifact links|art and design work|living resume ai|legitimate question response index|lqri|caa 2026 pbm regulatory assistant|blkvue ai security intake bot|jameslaneai com|cruisn pa|masters of metal|iron shores playable demo|vast lands|x tige|iron horizon ww2 battleship prototype|composio dependency graph|portfolio media index/.test(normalizedTitle)) {
    score += 10;
  }

if (intent === "projects" && /live|link|demo|site|website|review|try|repo|github|artifact|design|art|artwork|logo|motion|benchmark/.test(normalizedQuestion) && /project artifact links|art and design work|living resume ai|legitimate question response index|lqri|caa 2026 pbm regulatory assistant|blkvue ai security intake bot|jameslaneai com|cruisn pa|masters of metal|iron shores playable demo|vast lands|x tige|iron horizon ww2 battleship prototype|composio dependency graph|portfolio media index/.test(normalizedTitle)) {
    score += 8;
  }

  if (intent === "projects" && matchedProjectEntity) {
    if (sectionMatchesProjectEntity(section, matchedProjectEntity)) {
      score += 18;
      exactMatches += 2;
    } else if (section.group === "projects-catalog" || section.group === "portfolio-media-index") {
      score -= 5;
    }
  }

  if (intent === "writing" && /public writing boundary|writing catalog/.test(normalizedTitle)) {
    score += 7;
  }

  if (intent === "writing" && /medium|article|articles|essay|essays|writing|written|published|headlines|archive/.test(normalizedQuestion) && /public writing boundary|writing catalog/.test(normalizedTitle)) {
    score += 8;
  }

  if (intent === "writing" && /opinion pieces|published opinions|internal cognition|internal thoughts|private beliefs|public writing/.test(normalizedQuestion) && /public writing boundary/.test(normalizedTitle)) {
    score += 12;
  }

  if (intent === "writing" && /ai thinking|ai writing|agi|hallucination|chatbot/.test(normalizedQuestion) && /p doom or big boon/.test(normalizedTitle)) {
    score += 12;
  }

  if (intent === "writing" && /constitution|denaturalization|overton window|citizenship/.test(normalizedQuestion) && /the constitution needs you|denaturalization and democratic erosion analysis/.test(normalizedTitle)) {
    score += 10;
  }

  if (intent === "writing" && matchedWritingEntity) {
    if (sectionMatchesWritingEntity(section, matchedWritingEntity)) {
      score += 18;
      exactMatches += 2;
    } else if (
      section.group === "writing-catalog" ||
      section.group === "writing-corpus" ||
      section.group === "writing-supporting-analysis"
    ) {
      score -= 4;
    }
  }

  if (intent === "evidence" && /ai|process improvement|workflow|operational|operations|business facing|business-facing|internal innovation|proposal|assistant|bot/.test(normalizedQuestion) && /claims ai proposal|proposal faq assistant bot|pharmacy technical ba interview bot grounded in legislation|custom gpts and ai-oriented workflow tools|interactive employer-facing and decision-facing tool concepts|google canvas and google anti-gravity interactive report work/.test(normalizedTitle)) {
    score += 9;
  }

  if (intent === "evidence" && /ai|process improvement|workflow|operational|operations|business facing|business-facing|internal innovation|proposal|assistant|bot/.test(normalizedQuestion) && /game development - iron tides|ai-assisted game-development workflow and engine experimentation/.test(normalizedTitle) && !/game|iron tides|godot|phaser|menu animation|wooden decks|battleship/.test(normalizedQuestion)) {
    score -= 6;
  }

  if (intent === "evidence" && /iron tides|godot|screen recording|portfolio media index|main menu|wooden decks|battleship/.test(normalizedQuestion) && /portfolio media index|iron tides|ai-assisted game-development workflow and engine experimentation/.test(normalizedTitle)) {
    score += 8;
  }

  if (intent === "identity" && /identity summary|career direction|candidate type|how james should be explained to employers/.test(normalizedTitle)) {
    score += 5;
  }

  if (intent === "communication" && /voice characteristics|style rules|honesty rules|interaction rules for employer facing bots/.test(normalizedTitle)) {
    score += 5;
  }

  if (section.id === "p1-contact" && /\b(email|phone|linkedin|contact)\b/i.test(question)) {
    score += 5;
  }

  return {
    section,
    score,
    exactMatches
  };
}

function scoreItems(section, question) {
  const queryTokens = expandTokens(tokenize(question));

  return section.items
    .map((item) => {
      const itemKeywords = expandTokens(tokenize(item));
      const keywordSet = new Set(itemKeywords);
      let score = 0;

      for (const token of queryTokens) {
        if (keywordSet.has(token)) {
          score += 2;
          continue;
        }

        if (token.length < 5) {
          continue;
        }

        const fuzzyMatch = itemKeywords.find((keyword) => {
          if (Math.abs(keyword.length - token.length) > 1) {
            return false;
          }

          return editDistance(token, keyword) <= 1;
        });

        if (fuzzyMatch) {
          score += 0.75;
        }
      }

      if (score === 0 && section.items.length <= 2) {
        score = 0.5;
      }

      return {
        text: item,
        score
      };
    })
    .sort((left, right) => right.score - left.score);
}

function pickSections(scoredSections, intent, question = "") {
  if (scoredSections.length === 0) {
    return [];
  }

  if (intent && GROUP_BY_INTENT[intent]) {
    const allowedGroups = GROUP_BY_INTENT[intent];
    const limitedSections = scoredSections.filter((entry) => allowedGroups.includes(entry.section.group));
    const normalizedQuestion = normalizeText(question);
    const matchedProjectEntity = getMatchedProjectEntity(normalizedQuestion);
    const matchedWritingEntity = getMatchedWritingEntity(normalizedQuestion);

    if (intent === "roleFit" && /hire|hired|degree|degrees|college|credential|credentials|pedigree|nontraditional/.test(normalizedQuestion)) {
      const selected = [];
      const targets = [
        /credential gap/,
        /nontraditional background framing/,
        /how james should be explained to employers|professional value thesis/,
        /candidate type/,
        /ramp feasibility/
      ];

      for (const pattern of targets) {
        const found = limitedSections.find((entry) => pattern.test(normalizeText(entry.section.title)));
        if (found && !selected.includes(found)) {
          selected.push(found);
        }
      }

      for (const entry of limitedSections) {
        if (selected.length >= 3) {
          break;
        }

        if (!selected.includes(entry)) {
          selected.push(entry);
        }
      }

      return selected;
    }

    if (intent === "roleFit" && /what roles|roles look like|kinds of roles|which roles/.test(normalizedQuestion)) {
      const selected = [];
      const roleFamily = limitedSections.find((entry) => /role family implications|career direction/.test(normalizeText(entry.section.title)));
      const fitCategory = limitedSections.find((entry) => /fit categories|how to explain a stretch fit|how to explain a weak fit/.test(normalizeText(entry.section.title)));

      if (roleFamily) {
        selected.push(roleFamily);
      }

      if (fitCategory && !selected.includes(fitCategory)) {
        selected.push(fitCategory);
      }

      for (const entry of limitedSections) {
        if (selected.length >= 3) {
          break;
        }

        if (!selected.includes(entry)) {
          selected.push(entry);
        }
      }

      return selected;
    }

    if (intent === "environment") {
      const selected = [];
      const targets = [
        /high fit environment traits/,
        /conditions that reduce friction|best fit conditions/,
        /moderate fit environments/,
        /role family implications/
      ];

      for (const pattern of targets) {
        const found = limitedSections.find((entry) => pattern.test(normalizeText(entry.section.title)));
        if (found && !selected.includes(found)) {
          selected.push(found);
        }
      }

      for (const entry of limitedSections) {
        if (selected.length >= 3) {
          break;
        }

        if (!selected.includes(entry)) {
          selected.push(entry);
        }
      }

      return selected;
    }

    if (intent === "roleFit" && BA_CAPABILITY_PATTERN.test(normalizedQuestion)) {
      const selected = [];
      const summary = limitedSections.find(
        (entry) => entry.section.group === "resume-pdf" && /professional summary/.test(normalizeText(entry.section.title))
      );
      const strengths = limitedSections.find(
        (entry) => entry.section.group === "resume-pdf" && /core strengths/.test(normalizeText(entry.section.title))
      );
      const tools = limitedSections.find(
        (entry) => entry.section.group === "resume-pdf" && /\btools\b/.test(normalizeText(entry.section.title))
      );
      const experience = limitedSections.find(
        (entry) =>
          entry.section.group === "resume-pdf" &&
          /capital blue cross|claims examiner|help desk analyst/.test(normalizeText(entry.section.title))
      );
      const roleDirection = limitedSections.find((entry) =>
        /career direction|role family implications/.test(normalizeText(entry.section.title))
      );

      for (const found of [summary, strengths, tools, experience, roleDirection]) {
        if (found && !selected.includes(found)) {
          selected.push(found);
        }
      }

      for (const entry of limitedSections) {
        if (selected.length >= 5) {
          break;
        }

        if (!selected.includes(entry)) {
          selected.push(entry);
        }
      }

      return selected;
    }

    if (intent === "roleFit" && MEETING_PATTERN.test(normalizedQuestion)) {
      const selected = [];
      const targets = [
        /claims ai proposal and governance track internal innovation work/,
        /communication style|communication fit/,
        /written structured communication/,
        /not optimized for constant live verbal interaction/,
        /capital blue cross|enterprise it analyst/
      ];

      for (const pattern of targets) {
        const found = limitedSections.find((entry) => pattern.test(normalizeText(entry.section.title)));
        if (found && !selected.includes(found)) {
          selected.push(found);
        }
      }

      for (const entry of limitedSections) {
        if (selected.length >= 4) {
          break;
        }

        if (!selected.includes(entry)) {
          selected.push(entry);
        }
      }

      return selected;
    }

    if (intent === "roleFit" && isGenericRoleFitQuestion(normalizedQuestion)) {
      const selected = [];
      const targets = [
        /professional summary/,
        /core strengths/,
        /candidate type|professional value thesis|how james should be explained to employers/,
        /technical troubleshooting and systems reasoning|productive build pattern|interactive employer facing and decision facing tool concepts|core evidence themes|evidence pattern summary|strongly supported claims|moderately supported claims|not automatically supported claims/,
        /work relevant strength pattern|communication style|\btools\b/,
        /ramp feasibility|fit categories|role family implications/
      ];

      for (const pattern of targets) {
        const found = limitedSections.find((entry) => pattern.test(normalizeText(entry.section.title)));
        if (found && !selected.includes(found)) {
          selected.push(found);
        }
      }

      for (const entry of limitedSections) {
        if (selected.length >= 5) {
          break;
        }

        if (!selected.includes(entry)) {
          selected.push(entry);
        }
      }

      return selected;
    }

    if (intent === "workLocation") {
      const selected = [];
      const targets = HEALTH_CONTEXT_PATTERN.test(normalizedQuestion)
        ? [
            /work location preference/,
            /physical health and work location context/,
            /remote and hybrid preference/,
            /employer-facing safe summary/
          ]
        : [/work location preference/];

      for (const pattern of targets) {
        const found = limitedSections.find((entry) => pattern.test(normalizeText(entry.section.title)));
        if (found && !selected.includes(found)) {
          selected.push(found);
        }
      }

      for (const entry of limitedSections) {
        if (selected.length >= 4) {
          break;
        }

        if (!selected.includes(entry)) {
          selected.push(entry);
        }
      }

      return selected;
    }

    if (intent === "healthContext") {
      const selected = [];
      const conditionTargets = [];

      if (/autism|autistic|social cues|social queue|sensory aversion|sensory/.test(normalizedQuestion)) {
        conditionTargets.push(/autism level 1/);
      }

      if (/adhd|executive function|executive dysfunction|dysregulation|perceptual load|cognitive load/.test(normalizedQuestion)) {
        conditionTargets.push(/adhd with executive-function dysregulation/);
      }

      if (/diabetes|type 2|insulin|glucose|blood sugar/.test(normalizedQuestion)) {
        conditionTargets.push(/type 2 diabetes/);
      }

      if (/peripheral neuropathy|diabetic neuropathy|neuropathy/.test(normalizedQuestion)) {
        conditionTargets.push(/advanced peripheral neuropathy/);
      }

      if (/charcot|charcot foot/.test(normalizedQuestion)) {
        conditionTargets.push(/charcot foot/);
      }

      if (/collapsed diaphragm|diaphragm|breathing|exertion/.test(normalizedQuestion)) {
        conditionTargets.push(/collapsed diaphragm/);
      }

      if (/gastroparesis|digestive|nausea|restroom/.test(normalizedQuestion)) {
        conditionTargets.push(/gastroparesis/);
      }

      if (/tinnitus|hearing|noise|audio/.test(normalizedQuestion)) {
        conditionTargets.push(/tinnitus/);
      }

      if (/frozen shoulder|shoulder|range of motion/.test(normalizedQuestion)) {
        conditionTargets.push(/frozen shoulders/);
      }

      if (/colon cancer|cancer|remission|survivorship/.test(normalizedQuestion)) {
        conditionTargets.push(/colon cancer/);
      }

      const targets = [
        /health and accessibility overview/,
        ...conditionTargets,
        ...(AUDHD_CONTEXT_PATTERN.test(normalizedQuestion)
          ? [
              /self-disclosed diagnoses/,
              /strengths connected to audhd/,
              /weaknesses and friction connected to audhd/,
              /employer-facing safe summary/,
              /privacy and representation boundary/
            ]
          : [
              /physical health and work location context/,
              /remote and hybrid preference/,
              /employer-facing safe summary/,
              /privacy and representation boundary/
            ])
      ];

      for (const pattern of targets) {
        const found = limitedSections.find((entry) => pattern.test(normalizeText(entry.section.title)));
        if (found && !selected.includes(found)) {
          selected.push(found);
        }
      }

      for (const entry of limitedSections) {
        if (selected.length >= 5) {
          break;
        }

        if (!selected.includes(entry)) {
          selected.push(entry);
        }
      }

      return selected.slice(0, 5);
    }

    if (intent === "projects") {
      const projectSections = limitedSections.filter((entry) => entry.section.group === "projects-catalog");
      const portfolioMedia = limitedSections.filter((entry) => entry.section.group === "portfolio-media-index");

      if (ART_DESIGN_QUERY_PATTERN.test(normalizedQuestion)) {
        const selected = [];
        const artCatalog = projectSections.find((entry) => entry.section.id === "art-design-catalog");
        const cruisnPa = projectSections.find((entry) => entry.section.id === "p2-project-cruisn-pa");

        if (artCatalog) {
          selected.push(artCatalog);
        }

        if (/cruis n pa|cruisn pa|car club/.test(normalizedQuestion) && cruisnPa) {
          selected.push(cruisnPa);
        }

        return selected.length > 0 ? selected : projectSections.slice(0, 3);
      }

      if (matchedProjectEntity) {
        const selected = [];
        const targetedSections = limitedSections.filter((entry) =>
          entry.section.id !== "live-project-links-index" && sectionMatchesProjectEntity(entry.section, matchedProjectEntity)
        );

        for (const entry of targetedSections) {
          if (!selected.includes(entry)) {
            selected.push(entry);
          }
        }

        for (const entry of [...projectSections, ...portfolioMedia]) {
          if (selected.length >= 4) {
            break;
          }

          if (
            entry &&
            entry.section.id !== "live-project-links-index" &&
            !selected.includes(entry) &&
            sectionMatchesProjectEntity(entry.section, matchedProjectEntity)
          ) {
            selected.push(entry);
          }
        }

        if (selected.length > 0) {
          return selected.slice(0, 4);
        }
      }

      if (/iron tides|video|videos|media|portfolio media/.test(normalizedQuestion)) {
        const selected = [];
  const supportingProject = projectSections.find((entry) => /masters of metal|iron shores playable demo/.test(normalizeText(entry.section.title)));

        for (const entry of [...portfolioMedia.slice(0, 2), supportingProject]) {
          if (entry && !selected.includes(entry)) {
            selected.push(entry);
          }
        }

        for (const entry of projectSections) {
          if (selected.length >= 5) {
            break;
          }

          if (!selected.includes(entry)) {
            selected.push(entry);
          }
        }

        return selected;
      }

      if (/live|links|demo|site|website|review|try|projects|repo|github|artifact/.test(normalizedQuestion)) {
        const index = projectSections.find((entry) => entry.section.id === "live-project-links-index");

        if (index) {
          return [index];
        }

        return [...projectSections.slice(0, 8), ...portfolioMedia.slice(0, 1)].slice(0, 8);
      }

      return [...projectSections.slice(0, 4), ...portfolioMedia.slice(0, 1)].slice(0, 5);
    }

    if (intent === "evidence" && isExampleRequest(normalizedQuestion)) {
      const selected = [];
      const targets = [
        /claims ai proposal and governance track internal innovation work/,
        /proposal faq assistant bot/,
        /pharmacy technical ba interview bot grounded in legislation/,
        /living resume ai/,
        /legitimate question response index/,
        /cogfit jobs/,
        /evidence pattern summary|core evidence themes|productive build pattern/
      ];

      for (const pattern of targets) {
        const found = limitedSections.find((entry) => pattern.test(normalizeText(entry.section.title)));
        if (found && !selected.includes(found)) {
          selected.push(found);
        }
      }

      for (const entry of limitedSections) {
        if (selected.length >= 4) {
          break;
        }

        if (!selected.includes(entry)) {
          selected.push(entry);
        }
      }

      return selected;
    }

    if (intent === "writing") {
      const catalogSections = limitedSections.filter((entry) => entry.section.group === "writing-catalog");
      const articleSections = limitedSections.filter((entry) => entry.section.group === "writing-corpus");
      const analysisSections = limitedSections.filter((entry) => entry.section.group === "writing-supporting-analysis");

      if (/opinion pieces|published opinions|internal cognition|internal thoughts|private beliefs|public writing/.test(normalizedQuestion)) {
        const boundary = catalogSections.find((entry) => /public writing boundary/.test(normalizeText(entry.section.title)));
        const catalog = catalogSections.find((entry) => /writing catalog/.test(normalizeText(entry.section.title)));
        return [boundary, catalog].filter(Boolean);
      }

      if (/full chatgpt analysis|linked analysis|supporting analysis|research memo/.test(normalizedQuestion)) {
        const linkedAnalysis = analysisSections[0];
        const constitutionArticle = articleSections.find((entry) => /the constitution needs you/.test(normalizeText(entry.section.title)));
        return [linkedAnalysis, constitutionArticle].filter(Boolean);
      }

      if (matchedWritingEntity) {
        const selected = [];
        const targetedArticleSections = articleSections.filter((entry) =>
          sectionMatchesWritingEntity(entry.section, matchedWritingEntity)
        );
        const targetedAnalysisSections = analysisSections.filter((entry) =>
          sectionMatchesWritingEntity(entry.section, matchedWritingEntity)
        );
        const targetedCatalogSections = catalogSections.filter((entry) =>
          sectionMatchesWritingEntity(entry.section, matchedWritingEntity)
        );

        for (const entry of [...targetedArticleSections, ...targetedAnalysisSections]) {
          if (!selected.includes(entry)) {
            selected.push(entry);
          }
        }

        if (selected.length === 0) {
          for (const entry of targetedCatalogSections) {
            if (!selected.includes(entry)) {
              selected.push(entry);
            }
          }
        }

        if (
          matchedWritingEntity.id === "the-constitution-needs-you" &&
          /analysis|chatgpt|linked/.test(normalizedQuestion)
        ) {
          const linkedAnalysis = analysisSections[0];
          if (linkedAnalysis && !selected.includes(linkedAnalysis)) {
            selected.push(linkedAnalysis);
          }
        }

        const boundary = catalogSections.find((entry) => /public writing boundary/.test(normalizeText(entry.section.title)));
        if (boundary && !selected.includes(boundary) && /opinion|cognition|belief/.test(normalizedQuestion)) {
          selected.push(boundary);
        }

        return selected.slice(0, 3);
      }

      if (/what has james written|medium|articles|essays|headlines|writing archive|published writing|published articles/.test(normalizedQuestion)) {
        const catalog = catalogSections.find((entry) => /writing catalog/.test(normalizeText(entry.section.title)));
        const boundary = catalogSections.find((entry) => /public writing boundary/.test(normalizeText(entry.section.title)));
        return [catalog, boundary].filter(Boolean);
      }

      if (/ai thinking|ai writing|agi|hallucination|chatbot/.test(normalizedQuestion)) {
        const aiArticle = articleSections.find((entry) => /p doom or big boon/.test(normalizeText(entry.section.title)));
        const catalog = catalogSections.find((entry) => /writing catalog/.test(normalizeText(entry.section.title)));
        return [aiArticle, catalog].filter(Boolean);
      }

      return [...articleSections.slice(0, 2), ...catalogSections.slice(0, 1)].slice(0, 3);
    }

    const limit = intent === "roleFit" ? 3 : 2;
    return limitedSections.slice(0, limit);
  }

  const topScore = scoredSections[0].score;
  const threshold = Math.max(5, topScore * 0.7);

  return scoredSections.filter((entry) => entry.score >= threshold).slice(0, 2);
}

function selectContactItems(question, section) {
  const normalized = normalizeText(question);

  if (normalized.includes("email")) {
    return [section.items[2]];
  }

  if (normalized.includes("phone")) {
    return [section.items[1]];
  }

  if (normalized.includes("linkedin")) {
    return [section.items[3]];
  }

  if (normalized.includes("location") || normalized.includes("based") || normalized.includes("remote")) {
    return [section.items[0]];
  }

  return section.items;
}

const EXCLUDE_EXAMPLE_LINES = /^(a conventional prestige-track candidate|an outsider genius|an underdog myth|proof that credentials never matter|credentials do not matter\.?|james can do anything if given a chance\.?|he is secretly a perfect fit\.?|a polished corporate generalist)$/i;

function buildAnswerLines(scoredSections, question, intent) {
  const chosenSections = pickSections(scoredSections, intent, question);
  const normalizedQuestion = normalizeText(question);
  const wantsRoleTitle =
    intent === "headline" || /\b(current role|current title|job title|role|title|position)\b/.test(normalizedQuestion);

  return chosenSections
    .map((entry) => {
      if (entry.section.id === "p1-contact") {
        return {
          ref: entry.section.id,
          title: entry.section.title,
          sourceLabel: entry.section.sourceLabel,
          referenceLabel: entry.section.referenceLabel,
          items: selectContactItems(question, entry.section)
        };
      }

      const rankedItems = scoreItems(entry.section, question);
      const positiveItems = rankedItems.filter((item) => item.score > 0);
      const fallbackCount =
        entry.section.group === "resume-pdf"
          ? 5
          : entry.section.group === "portfolio-media-index"
            ? 6
            : entry.section.group === "writing-catalog"
              ? 10
              : entry.section.group === "writing-corpus"
                ? 8
                : entry.section.group === "writing-supporting-analysis"
                  ? 7
                  : 4;
      let items =
        entry.section.group === "portfolio-media-index"
          ? entry.section.items.slice(0, Math.min(entry.section.items.length, fallbackCount))
          : positiveItems.length > 0
            ? positiveItems.slice(0, fallbackCount).map((item) => item.text)
            : entry.section.items.slice(0, Math.min(entry.section.items.length, fallbackCount));

      if (entry.section.id === "live-project-links-index") {
        items = entry.section.items;
      }

      if (entry.section.id === "writing-catalog" || entry.section.id === "writing-boundary") {
        items = entry.section.items.slice(0, Math.min(entry.section.items.length, fallbackCount));
      }

      if (
        intent === "roleFit" &&
        /what roles|roles look like|kinds of roles|which roles/.test(normalizedQuestion) &&
        /role family implications|career direction/.test(normalizeText(entry.section.title))
      ) {
        items = entry.section.items.slice(0, Math.min(entry.section.items.length, 12));
      }

      if (
        intent === "environment" &&
        /high fit environment traits|conditions that reduce friction|best fit conditions/.test(
          normalizeText(entry.section.title)
        )
      ) {
        items = entry.section.items.slice(0, Math.min(entry.section.items.length, 8));
      }

      items = items.filter((item) => !EXCLUDE_EXAMPLE_LINES.test(item));

      if (wantsRoleTitle && entry.section.group === "resume-pdf" && entry.section.id !== "p1-headline") {
        items = [entry.section.title, ...items].filter((item, index, allItems) => allItems.indexOf(item) === index);
      }

      if (
        intent === "healthContext" &&
        entry.section.group === "health-accommodations" &&
        /\b(source|sources|resource|resources|link|links|recommend|recommendation|back up|backed|support|supports)\b/.test(
          normalizedQuestion
        )
      ) {
        const resourceItems = entry.section.items.filter((item) => /https?:\/\//i.test(item));
        const contextItems = entry.section.items
          .filter((item) => !/https?:\/\//i.test(item) && !/^Best accommodation approaches:?$/i.test(item))
          .slice(0, entry.section.id === "health-accommodations-overview" ? 2 : 3);
        items = [...contextItems, "Supporting resources:", ...resourceItems].filter(Boolean);
      }

      return {
        ref: entry.section.id,
        title: entry.section.title,
        sourceLabel: entry.section.sourceLabel,
        referenceLabel: entry.section.referenceLabel,
        items
      };
    })
    .filter((entry) => entry.items.length > 0);
}

function isOutOfScope(scoredSections, question) {
  if (UNSUPPORTED_PATTERN.test(question)) {
    return true;
  }

  if (scoredSections.length === 0) {
    return true;
  }

  const [best] = scoredSections;

  if (best.score < 5) {
    return true;
  }

  if (best.exactMatches === 0 && best.score < 8) {
    return true;
  }

  return false;
}

export function findMatches(question, history = [], options = {}) {
  const effectiveQuestion = buildEffectiveQuestion(question, history);
  const intent = getIntent(effectiveQuestion, options.preferredIntent ?? null);
  const matches = sourceCorpus
    .map((section) => scoreSection(section, effectiveQuestion, intent, options.modeId ?? null))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score);

  return {
    intent,
    effectiveQuestion,
    matches
  };
}

function formatMatchItems(items) {
  const fragments = [];

  for (const rawItem of items) {
    const item = rawItem.trim();

    if (!item) {
      continue;
    }

    const previous = fragments[fragments.length - 1];

    if (previous?.endsWith(":")) {
      fragments[fragments.length - 1] = `${previous} ${item}`;
      continue;
    }

    fragments.push(item);
  }

  return fragments.filter((fragment) => !fragment.endsWith(":")).join(" ");
}

export function askAssistant(question, history = [], options = {}) {
  const { intent, effectiveQuestion, matches: scoredSections } = findMatches(question, history, options);

  if (isOutOfScope(scoredSections, question)) {
    return {
      assistantName,
      answer: refusalMessage,
      refused: true,
      intent,
      effectiveQuestion,
      matches: []
    };
  }

  const matches = buildAnswerLines(scoredSections, effectiveQuestion, intent);

  if (matches.length === 0) {
    return {
      assistantName,
      answer: refusalMessage,
      refused: true,
      intent,
      effectiveQuestion,
      matches: []
    };
  }

  const answer = matches
    .map((match) => {
      const formatted = formatMatchItems(match.items);
      return formatted ? `${formatted} [${match.ref}]` : "";
    })
    .filter(Boolean)
    .join("\n");

  return {
    assistantName,
    answer,
    refused: false,
    intent,
    effectiveQuestion,
    matches
  };
}









