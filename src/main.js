import "./styles.css";

import {
  approvedSources,
  refusalMessage,
  sourceCorpus
} from "./data/resumeCorpus.js";
import { liveProjects } from "./data/liveProjects.js";
import { artDesignPortfolio } from "./data/artDesignPortfolio.js";
import { healthConditions, healthProfileIntro } from "./data/healthProfile.js";
import { profileModes } from "./data/profileModes.js";
import { writingPortfolio } from "./data/writingPortfolio.js";
import { askAssistant } from "./lib/retrieval.js";
import { synthesize } from "./lib/synthesizer.js";

const app = document.querySelector("#app");
const modeMap = new Map(profileModes.map((mode) => [mode.id, mode]));
const synthesizeUrl = import.meta.env.VITE_SYNTHESIZE_URL;
const isLocalPreviewHost =
  window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
const canRemoteSynthesize = Boolean(synthesizeUrl) && !isLocalPreviewHost;
const GA_MEASUREMENT_ID = "G-EVR1CM68J6";

const PAGE_TITLES = {
  home: "SyntheticCurator // James AI",
  writing: "THE LIVING INTELLIGENCE | Writing",
  contact: "THE LIVING INTELLIGENCE | Contact",
  projects: "THE LIVING INTELLIGENCE | Projects",
  design: "THE LIVING INTELLIGENCE | Art & Design",
  health: "THE LIVING INTELLIGENCE | Health & Accessibility"
};

const CONTACT_EMAIL = "tiburo13@gmail.com";
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("James AI Inquiry")}&body=${encodeURIComponent("Hi James,%0D%0A%0D%0AI'd like to talk about working together.%0D%0A%0D%0AName:%0D%0ACompany:%0D%0AWhat I'm looking for:%0D%0A")}`;
const LINKEDIN_URL = "https://www.linkedin.com/in/james-lane-1051291a9";
const GITHUB_URL = "https://github.com/Angry-TacoZ";
const X_URL = "https://x.com/JamesLaneAI";
const MEDIUM_URL = "https://medium.com/@Angry_TacoZ";
const CONSULTING_URL = "https://jameslaneai.com/";
const PROFILE_PHOTO_URL = "/images/profile/jamesprofile3.jpg";
const AUDIO_GUIDE_URL = "/audio/james-ai-audio-guide.mp3";
const AUDIO_GUIDE_STORAGE_KEY = "james-ai-audio-guide-dismissed";

const PROJECT_PRESENTATION = {
  "living-resume-ai": {
    emphasis: "HIGH_COMPLEXITY",
    version: "LIVE_SYSTEM",
    summary:
      "Interactive hiring artifact that turns the approved corpus, retrieval logic, and response boundaries into a browsable digital twin.",
    featureBadges: ["Systems Reasoning", "Execution", "Source Bound"],
    icon: "psychology",
    shortLabel: "Resume AI",
    detailBullets: [
      "Turns resume, portfolio, and writing into a searchable assistant experience.",
      "Demonstrates retrieval, synthesis, boundary enforcement, and product framing in one surface."
    ]
  },
  lqri: {
    emphasis: "RESEARCH_DASHBOARD",
    version: "PUBLIC_REPO",
    summary:
      "Public benchmark dashboard for evaluating whether LLMs answer legitimate sensitive and self-referential questions with substance, restraint, and clear uncertainty boundaries.",
    featureBadges: ["Benchmark Design", "React/Vite", "Transcript Scoring"],
    icon: "query_stats",
    shortLabel: "LQRI",
    detailBullets: [
      "Uses preserved transcripts, v2 scoring dimensions, diagnostic flags, and data-quality caveats.",
      "The public repo is available at https://github.com/Angry-TacoZ/lqri-site."
    ]
  },
  "blkvue-ai-security-intake-bot": {
    emphasis: "CORE_PRODUCT",
    version: "CLIENT_WORKFLOW",
    summary:
      "Security intake workflow that turns discovery answers into AI-assisted risk framing aligned to the target firm's own service model.",
    featureBadges: ["Assessment Flow", "Site-Grounded"],
    icon: "shield",
    shortLabel: "Security Intake",
    detailBullets: [
      "Shows prompt design, information structuring, and client-facing packaging.",
      "Grounds assessment logic in the company's public site content."
    ]
  },
  "jameslaneai-com": {
    emphasis: "SOURCE_VERIFIED",
    version: "PUBLIC_PRESENCE",
    summary:
      "Consulting site built to package AI capabilities into client-understandable services instead of leaving them as internal skill claims.",
    featureBadges: ["Offer Packaging", "Business Email", "Public Positioning"],
    icon: "language",
    shortLabel: "Consulting Site",
    detailBullets: [
      "Translates technical ability into plain-language services and offerings.",
      "Acts as the outward-facing commercial layer for James's AI work."
    ]
  },
  "cruisn-pa": {
    emphasis: "EXPERIMENTAL",
    version: "COMMUNITY_BUILD",
    summary:
      "Community-focused club site that packages a recurring real-world event format around route planning, brand tone, and public participation.",
    featureBadges: ["Branding", "Community UX"],
    icon: "directions_car",
    shortLabel: "Driving Club",
    detailBullets: [
      "Shows public-facing storytelling and event packaging outside standard business software.",
      "Built around custom weekly routes, photo stops, and a restaurant finish."
    ]
  },
  "iron-shores-playable-demo": {
    emphasis: "ACTIVE: BEYOND_THE_RESUME",
    version: "PLAYABLE_DEMO",
    summary:
      "Browser-based tank roguelite demo that demonstrates shipping, iteration, and learning through playable software rather than static concepts.",
    featureBadges: ["Playable Prototype", "Game Systems", "Feedback Loop"],
    icon: "sports_esports",
    shortLabel: "Masters of Metal",
    art: {
      src: "/portfolio/iron-shores/iron-shores-tank-thumb.svg",
      alt: "Stylized WW2 tank thumbnail for the Masters of Metal playable demo"
    },
    highlightActions: [],
    detailBullets: [
      "Refined through actual player use instead of presentation-only mockups.",
      "Shows product instincts, iteration discipline, and willingness to ship."
    ]
  },
  "vast-lands": {
    emphasis: "SYSTEMS_GAME",
    version: "PRIVATE_REPO",
    summary:
      "Babylon.js isometric city-builder prototype shaped around production chains, resident needs, civic projects, and an editor-ready building catalog.",
    featureBadges: ["Babylon.js", "TypeScript", "Simulation"],
    icon: "deployed_code",
    shortLabel: "City Builder",
    detailBullets: [
      "Shows systems design across resources, residents, civic unlocks, and map editing.",
      "Includes verification around placement and animation behavior."
    ]
  },
  xtige: {
    emphasis: "LIVE_APP",
    version: "FIREBASE_HOSTED",
    summary:
      "Car-first social app with live map presence, Garage profiles, Bounties, Crew surfaces, Firebase hosting, and an Android path through Capacitor.",
    featureBadges: ["React", "Firebase", "Maps"],
    icon: "route",
    shortLabel: "Car Social App",
    detailBullets: [
      "Packages a social product concept into working app surfaces instead of a static idea.",
      "Includes auth scaffolding, Firestore rules, and mobile packaging direction."
    ]
  },
  "iron-horizon-ww2-battleship": {
    emphasis: "PLAYABLE_PROTOTYPE",
    version: "PUBLIC_REPO",
    summary:
      "Top-down WW2-inspired naval combat prototype with national ship selection, aircraft threats, secondaries, AA, torpedoes, damage states, and verifier coverage.",
    featureBadges: ["Phaser 3", "TypeScript", "Combat Systems"],
    icon: "anchor",
    shortLabel: "Naval Combat",
    detailBullets: [
      "Demonstrates playable combat loops and system balance rather than only presentation art.",
      "Verifier checks cover damage, aircraft threats, torpedoes, DOT effects, and win/loss conditions."
    ]
  },
  "composio-dependency-graph": {
    emphasis: "BENCHMARK_TOOL",
    version: "PRIVATE_REPO",
    summary:
      "Workflow-first dependency graph for agent tool execution, mapping prerequisite inputs, precursor tools, user-input fallbacks, and risk-confirmation edges.",
    featureBadges: ["TypeScript", "Mermaid", "Tool Routing"],
    icon: "account_tree",
    shortLabel: "Dependency Graph",
    detailBullets: [
      "Shows practical agent-routing logic for Google Super and GitHub toolkits.",
      "Includes visual graph output, confidence-ranked edges, and risk-aware routing."
    ]
  }
};

const WRITING_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCsP-6ASKfZiNYEP7vhnM1zTDKkSEC64mSjtlCnAD6CCpaH_C56RWdPYxvSr8Y5r4G3aZtsViJrAu60jKQ0FQq6B374g49_h0nSyvQ2KwWZRZhhgGQ8SwZ_mDOcbIVtqtmTMews369445ClptkP08Wp_cSP8I1cwVPgTh2BKLHL8nKeejKojNWKspg4eDTvkJku3BHJv2z9hyb_6nGI3GVm_4TpnFzuYdJDitK0IX9zWzYmJ4XBhb_CcrYJBSPm4xkX2z-aQ542Ki0Q",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCxgYXhFuJxJsksVsotkata2EvMmdf1-B8sj4bKHqfl7ZZhmk8Ragb3_8sSraheUSSp6YlalAVTwy08hBv9tXfByglRaChQn_e061W3RJyLPbRid8iAUjn80oo6iAZZDSVMHcYpvMf6i3R6yFmdGmSb_DEZnwY959RdtRCOnTktZrh9CVBpKQe4aDmmDm50e8iH8_6unDqQqWbRXK_Yrp_Iu1frxbQAyuk4q1ddfeiUGAktPc8Sp4saXr9popsCcaGbwAWqn7GIX67R",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBA5B7IQT8nZefe7wvvnd82RP8I0TLF9y8SE7dtktiJCLK1TiG9mcvq0XWWpRM4RVT9nTfOowehYi7HjbEtwzV5Y5kdOK3AtvAhm8LSjgcMresu8xR2X0_HQGFRArQgy5mP-rtvmfIig1m5I-bjQ_4qeV182_pgM4Ak9ohotz50oVBbYXUyPosfT3HvMQpuVZUbQUMWQ44nKNs_OIN9pX-0cLizVlwX42vltyfkng6uhGJA-lU0LDkNEH4mze5czV02iHReikbXHeDh",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCfHeuQ9QoyXQztB6eMFfJBQLE2HuBHOM1ykVHLb7PmRP9AG_QrTUxwD3nxCBGA5DY_2E8BSW75mUg43SPCfuC7j7JN6X5ai2F1GOZbXVCp6x4-AP0YckAYXsLeOvwx5cLe0a73F2YPVwkEG1mTQmYjDgBuoQBDelg57y4TBCw5S245o0qrt3CDa5heG4_GVmcLSGNJ3NSr7ouxBy4QSTq5Wo60YqfFr4R3XwoLL-GLG6loaFnrVeW3-XP-Msi0az3K1MvDkrdyL9qg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCLfAwQR-ks3UT-YGAxReuhMXBBPgq2mNsqDkJXXsx_DDBiNAQRQAYd344t-J1tik6Ij6QTb0_3EiVXeYP7ibf_YJC7pPY7McaIj-aA4PAnWn1WC9lstkfBPSWg9rBA8S_MvCofIE4cH7CIgmu8onF-Hqc1e591ODEhv7Cgu4DdReC57iqqYR1mq5IA_bNSWxPjK-dC1CoUDiAD4MboUAKZBr4X9Kt3C6u5_HpYZHwB802pmGdqksXBZ6cNcFordAIaTs4E1YYyQoIf"
];

const pageState = {
  page: getPageFromHash(),
  modeId: "profile",
  projectQuery: "",
  projectView: "grid",
  writingSort: "chronological",
  writingPage: 1,
  homeDraft: "",
  sessions: {},
  latestContext: null,
  focusComposer: false,
  busy: false,
  audioGuideStatus: getInitialAudioGuideStatus()
};
let lastTrackedPath = "";
let audioGuide = null;

void init();

async function init() {
  ensureHead();
  seedInitialState();
  render();
  bindGlobalEvents();
}

function seedInitialState() {
  ensureModeSession(pageState.modeId);
}

function ensureHead() {
  document.documentElement.classList.add("dark");
}

function getInitialAudioGuideStatus() {
  try {
    return window.localStorage.getItem(AUDIO_GUIDE_STORAGE_KEY) === "true" ? "closed" : "prompt";
  } catch {
    return "prompt";
  }
}

function rememberAudioGuideDismissed() {
  try {
    window.localStorage.setItem(AUDIO_GUIDE_STORAGE_KEY, "true");
  } catch {
    // Local storage can be unavailable in strict privacy contexts.
  }
}

function getAudioGuide() {
  if (!audioGuide) {
    audioGuide = new Audio(AUDIO_GUIDE_URL);
    audioGuide.preload = "metadata";
    audioGuide.addEventListener("play", renderAudioGuideControls);
    audioGuide.addEventListener("pause", renderAudioGuideControls);
    audioGuide.addEventListener("ended", renderAudioGuideControls);
  }

  return audioGuide;
}

function renderAudioGuideControls() {
  const playIcon = document.querySelector("[data-audio-guide-play-icon]");
  const playLabel = document.querySelector("[data-audio-guide-play-label]");

  if (!playIcon || !playLabel || !audioGuide) {
    return;
  }

  const isPlaying = !audioGuide.paused && !audioGuide.ended;
  playIcon.textContent = isPlaying ? "pause" : "play_arrow";
  playLabel.textContent = isPlaying ? "Pause" : "Play";
}

async function playAudioGuide({ restart = false } = {}) {
  const guide = getAudioGuide();

  if (restart) {
    guide.currentTime = 0;
  }

  try {
    await guide.play();
  } catch (err) {
    console.error("Audio guide playback failed:", err);
  }

  renderAudioGuideControls();
}

function pauseAudioGuide() {
  if (!audioGuide) {
    return;
  }

  audioGuide.pause();
  renderAudioGuideControls();
}

function closeAudioGuide() {
  pauseAudioGuide();
  pageState.audioGuideStatus = "closed";
  rememberAudioGuideDismissed();
  render();
}

function bindGlobalEvents() {
  window.addEventListener("hashchange", async () => {
    const nextPage = getPageFromHash();

    if (pageState.page === nextPage) {
      return;
    }

    pageState.page = nextPage;

    if (nextPage === "home") {
      await ensureModeSession(pageState.modeId);
    }

    render();
  });

  document.addEventListener("click", async (event) => {
    const pageLink = event.target.closest("[data-page-link]");

    if (pageLink) {
      event.preventDefault();
      const nextPage = pageLink.dataset.pageLink;
      const targetMode = pageLink.dataset.targetMode;
      pageState.focusComposer = Boolean(pageLink.dataset.focusComposer);

      if (targetMode && modeMap.has(targetMode)) {
        pageState.modeId = targetMode;
      }

      if (nextPage === "home") {
        await ensureModeSession(pageState.modeId);
      }

      navigate(nextPage);
      return;
    }

    const modeButton = event.target.closest("[data-mode-id]");

    if (modeButton) {
      event.preventDefault();
      await switchMode(modeButton.dataset.modeId);
      return;
    }

    const starterButton = event.target.closest("[data-starter-question]");

    if (starterButton) {
      event.preventDefault();
      await handleAsk(starterButton.dataset.starterQuestion);
      return;
    }

    const homeSubmit = event.target.closest("[data-home-submit]");

    if (homeSubmit) {
      event.preventDefault();
      await handleAsk(pageState.homeDraft);
      return;
    }

    const audioGuideAction = event.target.closest("[data-audio-guide-action]");

    if (audioGuideAction) {
      event.preventDefault();
      const action = audioGuideAction.dataset.audioGuideAction;

      if (action === "start") {
        pageState.audioGuideStatus = "dock";
        render();
        await playAudioGuide({ restart: true });
        return;
      }

      if (action === "open") {
        pauseAudioGuide();
        pageState.audioGuideStatus = "prompt";
        render();
        return;
      }

      if (action === "skip") {
        closeAudioGuide();
        return;
      }

      if (action === "toggle") {
        const guide = getAudioGuide();
        if (guide.paused || guide.ended) {
          await playAudioGuide();
        } else {
          pauseAudioGuide();
        }
        return;
      }

      if (action === "replay") {
        await playAudioGuide({ restart: true });
        return;
      }

      if (action === "close") {
        closeAudioGuide();
      }

      return;
    }

    const viewToggle = event.target.closest("[data-project-view]");

    if (viewToggle) {
      event.preventDefault();
      pageState.projectView = viewToggle.dataset.projectView;
      render();
      return;
    }

    const writingSortToggle = event.target.closest("[data-writing-sort]");

    if (writingSortToggle) {
      event.preventDefault();
      pageState.writingSort = writingSortToggle.dataset.writingSort;
      pageState.writingPage = 1;
      render();
      return;
    }

    const writingPageButton = event.target.closest("[data-writing-page]");

    if (writingPageButton) {
      event.preventDefault();
      const nextPage = Number(writingPageButton.dataset.writingPage);

      if (!Number.isNaN(nextPage)) {
        pageState.writingPage = nextPage;
        render();
      }

      return;
    }

    const launchLink = event.target.closest("[data-open-url]");

    if (launchLink) {
      const { openUrl } = launchLink.dataset;

      if (openUrl) {
        window.open(openUrl, "_blank", "noopener,noreferrer");
      }
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-home-input]")) {
      pageState.homeDraft = event.target.value;
      return;
    }

    if (event.target.matches("[data-project-search]")) {
      pageState.projectQuery = event.target.value;
      render();
    }
  });

  document.addEventListener("keydown", async (event) => {
    if (event.key === "Enter" && event.target.matches("[data-home-input]")) {
      event.preventDefault();
      await handleAsk(pageState.homeDraft);
    }
  });
}

function navigate(page) {
  if (page === "home") {
    const cleanUrl = `${window.location.pathname}${window.location.search}`;

    if (window.location.hash) {
      window.history.pushState({}, "", cleanUrl);
    }

    pageState.page = "home";
    render();
    return;
  }

  const hash = `#${page}`;

  if (window.location.hash !== hash) {
    window.location.hash = hash;
  } else {
    pageState.page = page;
    render();
  }
}

async function switchMode(modeId) {
  if (!modeMap.has(modeId)) {
    return;
  }

  pageState.modeId = modeId;
  pageState.page = "home";
  pageState.focusComposer = false;
  await ensureModeSession(modeId);
  render();
}

async function handleAsk(question) {
  const trimmed = question.trim();

  if (!trimmed || pageState.busy) {
    return;
  }

  pageState.busy = true;
  render();

  try {
    await runAssistantQuestion(pageState.modeId, trimmed);
    pageState.homeDraft = "";
    pageState.focusComposer = false;
  } finally {
    pageState.busy = false;
    render();
    scrollHomeChatToBottom();
  }
}

async function ensureModeSession(modeId, options = {}) {
  const mode = modeMap.get(modeId);

  if (!mode) {
    return;
  }

  if (!pageState.sessions[modeId]) {
    pageState.sessions[modeId] = {
      history: [
        {
          role: "assistant",
          content: mode.welcomeMessage
        }
        ],
        lastMatches: [],
        lastQuestion: mode.starterQuestions[0],
        lastAnswer: mode.welcomeMessage,
        seedStarted: false,
        seedPromise: null
      };
    }

  const session = pageState.sessions[modeId];
  pageState.latestContext = buildLatestContext(modeId);

    if (!session.seedStarted) {
      session.seedStarted = true;
      session.seedPromise = runAssistantQuestion(modeId, mode.starterQuestions[0], { seeded: true }).finally(() => {
      session.seedPromise = null;
          if (pageState.page === "home" && pageState.modeId === modeId) {
            render();
            scrollHomeChatToBottom();
          }
        });
      }

  if (options.awaitSeed && session.seedPromise) {
    await session.seedPromise;
  }
  }

async function runAssistantQuestion(modeId, question, options = {}) {
  const mode = modeMap.get(modeId);
  const session = pageState.sessions[modeId];

  if (!mode || !session) {
    return;
  }

  const retrieval = askAssistant(question, session.history, {
    modeId,
    preferredIntent: mode.defaultIntent
  });

  let answerText = retrieval.answer;

  if (!retrieval.refused) {
    answerText = composeLocalAnswer(retrieval.matches, mode, question);

    if (canRemoteSynthesize) {
      try {
        answerText = await synthesize(question, retrieval.matches, { mode: modeId });
      } catch (error) {
        console.error("Synthesis fallback used", error);
      }
    }
  } else {
    answerText = refusalMessage;
  }

  session.history.push(
    {
      role: "user",
      content: question
    },
    {
      role: "assistant",
      content: answerText
    }
  );

  session.lastQuestion = question;
  session.lastMatches = retrieval.matches;
  session.lastAnswer = answerText;
  pageState.latestContext = buildLatestContext(modeId);
}

function buildLatestContext(modeId) {
  const session = pageState.sessions[modeId];
  const mode = modeMap.get(modeId);

  if (!session || !mode) {
    return null;
  }

  return {
    modeId,
    modeLabel: mode.label,
    question: session.lastQuestion,
    answer: session.lastAnswer,
    matches: session.lastMatches
  };
}

function composeLocalAnswer(matches, mode, question) {
  if (!matches.length) {
    return refusalMessage;
  }

  const lead = matches[0];
  const extra = matches.slice(1, 3);
  const paragraphs = [];
  const leadFacts = lead.items
    .map(normalizeEvidenceLine)
    .filter(Boolean)
    .slice(0, 3);

  if (mode.id === "projects") {
    paragraphs.push(`${lead.title} is the strongest match here. ${leadFacts.join(" ")}`);
  } else if (mode.id === "writing") {
    paragraphs.push(`${lead.title} is the most relevant piece for that question. ${leadFacts.join(" ")}`);
  } else if (mode.id === "resume") {
    paragraphs.push(leadFacts.join(" "));
  } else {
    paragraphs.push(`${lead.title} is the clearest source for this. ${leadFacts.join(" ")}`);
  }

  if (extra.length) {
    const followUp = extra
      .map((match) => {
        const line = match.items.map(normalizeEvidenceLine).filter(Boolean).slice(0, 2).join(" ");
        return `${match.title}: ${line}`;
      })
      .join(" ");

    if (followUp) {
      paragraphs.push(followUp);
    }
  }

  if (/link|url|open|review|watch|project|article/.test(question.toLowerCase())) {
    const urls = matches
      .map(extractMatchUrl)
      .filter(Boolean)
      .slice(0, 2);

    if (urls.length) {
      paragraphs.push(`Relevant link${urls.length > 1 ? "s" : ""}: ${urls.join(" | ")}`);
    }
  }

  return paragraphs.join("\n\n");
}

function render() {
  document.title = PAGE_TITLES[pageState.page] ?? PAGE_TITLES.home;

  switch (pageState.page) {
    case "writing":
      app.innerHTML = renderWritingPage();
      break;
    case "contact":
      app.innerHTML = renderContactPage();
      break;
    case "projects":
      app.innerHTML = renderProjectsPage();
      break;
    case "design":
      app.innerHTML = renderArtDesignPage();
      break;
    case "health":
      app.innerHTML = renderHealthPage();
      break;
    case "home":
    default:
      app.innerHTML = renderHomePage();
      break;
  }

  if (pageState.focusComposer && pageState.page === "home") {
    const composer = document.querySelector("[data-home-input]");
    composer?.focus();
  }

  renderAudioGuideControls();
  trackPageView();
}

function trackPageView() {
  if (typeof window.gtag !== "function") {
    return;
  }

  const path = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (path === lastTrackedPath) {
    return;
  }

  lastTrackedPath = path;
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
    send_to: GA_MEASUREMENT_ID
  });
}

function scrollHomeChatToBottom() {
  if (pageState.page !== "home") {
    return;
  }

  requestAnimationFrame(() => {
    const history = document.querySelector("[data-home-history]");
    if (!history) {
      return;
    }

    const latestUserTurn = history.querySelector("[data-home-turn-user-last]");
    const scrollHistoryToLatestTurn = () => {
      if (latestUserTurn) {
        const targetTop = Math.max(
          0,
          latestUserTurn.offsetTop - history.offsetTop - 16
        );
        history.scrollTop = targetTop;
        return;
      }

      history.scrollTop = history.scrollHeight;
    };

    scrollHistoryToLatestTurn();

    requestAnimationFrame(() => {
      scrollHistoryToLatestTurn();
    });
  });
}

function renderHomePage() {
  const mode = modeMap.get(pageState.modeId);
  const session = pageState.sessions[pageState.modeId];
  const latestContext = pageState.latestContext ?? buildLatestContext(pageState.modeId);
  const briefingPrimary = mode.briefingCards[0];
  const vectorCard = mode.briefingCards[1] ?? briefingPrimary;
  const supportTags = deriveModeSupportTags(mode);
  const displayedHistory = session.history.slice(-5);
  const evidenceCards = (latestContext?.matches ?? []).slice(0, 3);

  return `
    <nav class="fixed top-0 w-full z-50 bg-[#121415]/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex justify-between items-center px-4 md:px-8 h-16 md:h-20 w-full">
      <div class="text-lg md:text-xl font-black text-[#B1D09A] tracking-tighter font-['Inter']">SyntheticCurator</div>
      <div class="hidden md:flex gap-4 md:gap-8 items-center font-['Inter'] font-bold tracking-tight overflow-x-auto no-scrollbar">
        ${renderPrimaryNavLinks("home", "top")}
      </div>
      <div class="flex items-center gap-2 md:gap-4">
        <button class="bg-gradient-to-br from-primary to-primary-container text-on-primary px-3 sm:px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-[9px] md:text-[10px] font-['Space_Grotesk'] font-bold uppercase tracking-[0.18em] md:tracking-widest hover:opacity-90 transition-all duration-300" data-open-url="${escapeAttribute(CONTACT_MAILTO)}">Hire Intelligence</button>
        <div class="hidden sm:flex w-10 h-10 rounded-full bg-surface-container-high border border-primary/20 items-center justify-center">
          <span class="font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-widest text-primary">SC</span>
        </div>
      </div>
    </nav>
    <aside class="hidden md:flex fixed left-0 top-0 h-full w-64 z-40 bg-[#0C0E10]/80 backdrop-blur-2xl flex-col h-full py-6 ambient occlusion glow shadow-2xl">
      <div class="px-6 mb-12 mt-20 hidden md:block">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-2 h-8 bg-primary rounded-full"></div>
          <div>
            <div class="text-lg font-bold text-[#B1D09A] font-['Inter']">AI Assistant</div>
            <div class="font-['Space_Grotesk'] uppercase text-[10px] tracking-widest text-[#E2E2E5]/40">Neural Interface Active</div>
          </div>
        </div>
      </div>
      <div class="flex-1 flex flex-col gap-2">
        ${renderHomeSideModeLink("profile", "psychology_alt", "Consult")}
        ${renderHomeSideModeLink("fit", "terminal", "Debug")}
        ${renderHomeSideModeLink("evidence", "visibility", "Review")}
        ${renderHomeSideModeLink("projects", "architecture", "Architect")}
      </div>
      ${renderAudioGuideDock("desktop")}
      <div class="px-6 py-8 mt-auto">
        ${renderAudioGuideLauncher()}
        <button class="w-full bg-surface-container-high border border-outline-variant/20 text-on-surface py-3 rounded-lg flex items-center justify-center gap-2 mb-4 hover:bg-surface-container-highest transition-all" data-page-link="home" data-focus-composer="true">
          <span class="material-symbols-outlined text-primary">add</span>
          <span class="hidden md:block font-['Space_Grotesk'] uppercase text-[10px] tracking-widest">Ask Intelligence</span>
        </button>
        <a class="flex items-center gap-4 text-[#E2E2E5]/40 hover:text-primary transition-all" href="#projects" data-page-link="projects">
          <span class="material-symbols-outlined">settings</span>
          <span class="hidden md:block font-['Space_Grotesk'] uppercase text-[10px] tracking-widest">Settings</span>
        </a>
      </div>
    </aside>
    <main class="ml-0 md:ml-64 pt-16 md:pt-20 px-4 sm:px-5 md:px-8 pb-28 md:pb-32">
      <section class="relative py-8 sm:py-10 md:py-16 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-tr from-surface-container-lowest via-background to-surface-container-low opacity-50"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div class="relative z-10 max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 xl:gap-12 items-start">
          <div class="xl:col-span-6 pt-2 md:pt-4">
            <span class="font-['Space_Grotesk'] text-primary text-xs uppercase tracking-[0.4em] mb-5 block">Living Intelligence Interface</span>
            <h1 class="text-4xl sm:text-5xl md:text-7xl font-black text-on-surface tracking-tighter leading-[0.95] mb-5 md:mb-6">
            James AI: <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">Beyond the Resume</span>
          </h1>
            <p class="text-base sm:text-lg md:text-2xl text-on-surface-variant max-w-2xl font-light leading-relaxed mb-5 md:mb-6">
              A systems-oriented digital twin curating experiences, insights, and executable expertise. Ask it something the moment you arrive.
          </p>
            <div class="flex flex-wrap gap-3">
              ${mode.starterQuestions
                .slice(0, 2)
                .map(
                  (question) => `
                    <button class="w-full sm:w-auto glass-panel px-5 py-3 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-primary font-['Space_Grotesk'] text-[10px] uppercase tracking-widest transition-all text-center" data-starter-question="${escapeAttribute(question)}">${escapeHtml(question)}</button>
                  `
                )
                .join("")}
            </div>
          </div>
          <div class="xl:col-span-6">
              ${renderHomeChatPanel(displayedHistory, mode.placeholder, Boolean(session.seedPromise) && !pageState.busy)}
            </div>
          </div>
          </section>
      <section class="max-w-5xl mx-auto mb-8">
        <div class="flex overflow-x-auto no-scrollbar gap-3 md:gap-4 px-1 py-2">
          ${profileModes
            .map(
              (entry) => `
                <button class="glass-panel px-5 md:px-8 py-3 rounded-full ${entry.id === pageState.modeId ? "bg-surface-container-highest text-primary border border-primary/30" : "bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant"} font-['Space_Grotesk'] text-[10px] uppercase tracking-widest transition-all whitespace-nowrap" data-mode-id="${entry.id}">${escapeHtml(entry.label)}</button>
              `
            )
            .join("")}
        </div>
      </section>
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        <div class="lg:col-span-8 flex flex-col gap-8 md:gap-12">
          <div class="bg-surface-container-low rounded-xl p-6 sm:p-8 md:p-12 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-primary/10"></div>
            <div class="flex justify-between items-start mb-12">
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <span class="font-['Space_Grotesk'] text-primary text-[10px] uppercase tracking-[0.2em]">Operational Identity</span>
              </div>
              <span class="font-['Space_Grotesk'] text-on-surface-variant/40 text-[10px] uppercase tracking-widest">ID-4092-X</span>
            </div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-on-surface mb-6 md:mb-8 tracking-tight">${escapeHtml(briefingPrimary.title)}</h2>
            <div class="grid md:grid-cols-2 gap-8 md:gap-12">
              <div class="space-y-6">
                <p class="text-lg text-on-surface-variant leading-relaxed">${escapeHtml(briefingPrimary.body)}</p>
                <div class="flex flex-wrap gap-2">
                  ${supportTags
                    .map(
                      (tag) => `
                        <span class="flex items-center gap-2 border-l-2 border-primary pl-3 py-1 font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-on-surface-variant">${escapeHtml(tag)}</span>
                      `
                    )
                    .join("")}
                </div>
              </div>
              <div class="bg-surface-container-lowest p-4 sm:p-5 rounded-lg border border-outline-variant/10">
                <div class="relative rounded-xl overflow-hidden mb-5 aspect-[4/5] bg-surface-container-high">
                  <img class="w-full h-full object-cover" src="${PROFILE_PHOTO_URL}" alt="Portrait of James Lane at his desk"/>
                  <div class="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent"></div>
                  <div class="absolute left-4 right-4 bottom-4">
                    <div class="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.24em] text-primary/90 mb-2">James Lane</div>
                    <div class="text-xl font-bold text-on-surface leading-tight">Systems-oriented builder with a source-bound AI front door.</div>
                  </div>
                </div>
                <div class="text-[10px] font-['Space_Grotesk'] text-primary/60 uppercase mb-4 tracking-widest">Current Vector</div>
                <div class="text-xl font-bold text-on-surface mb-2">${escapeHtml(vectorCard.title)}</div>
                <p class="text-sm text-on-surface-variant/70 mb-4">${escapeHtml(vectorCard.body)}</p>
                <div class="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                  <div class="bg-primary h-full" style="width: ${modeProgress(mode.id)}%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside class="lg:col-span-4 space-y-8 md:space-y-12">
          <div class="sticky top-28">
            <div class="flex items-center gap-3 mb-8">
              <span class="material-symbols-outlined text-primary">fact_check</span>
              <h3 class="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Evidence for Latest Answer</h3>
            </div>
            <div class="space-y-6">
              ${renderHomeEvidenceCards(evidenceCards)}
              <div class="pt-8 border-t border-outline-variant/10">
                <div class="text-[10px] font-['Space_Grotesk'] text-on-surface-variant/40 uppercase tracking-widest mb-4">Quick Links</div>
                <div class="flex gap-4">
                  <div class="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer" data-page-link="projects"><span class="material-symbols-outlined text-on-surface-variant">terminal</span></div>
                  <div class="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer" data-page-link="writing"><span class="material-symbols-outlined text-on-surface-variant">description</span></div>
                  <div class="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer" data-page-link="contact"><span class="material-symbols-outlined text-on-surface-variant">contact_mail</span></div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
    <footer class="bg-[#121415] w-full py-12 border-t border-[#44483E]/15 flex flex-col items-center gap-4 w-full">
      <div class="flex gap-4 md:gap-8 items-center mb-4">
        <a class="font-['Space_Grotesk'] text-[10px] uppercase text-[#E2E2E5]/30 hover:text-[#B1D09A] transition-opacity duration-500" href="#contact" data-page-link="contact">Contact</a>
        <a class="font-['Space_Grotesk'] text-[10px] uppercase text-[#E2E2E5]/30 hover:text-[#B1D09A] transition-opacity duration-500" href="#writing" data-page-link="writing">Documentation</a>
        <a class="font-['Space_Grotesk'] text-[10px] uppercase text-[#E2E2E5]/30 hover:text-[#B1D09A] transition-opacity duration-500" href="#projects" data-page-link="projects">Security</a>
      </div>
      <section class="w-[min(92vw,48rem)] rounded-xl border border-outline-variant/10 bg-surface-container-low/60 px-5 py-5 text-center">
        <h2 class="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.24em] text-[#B1D09A] mb-2">AI-readable portfolio files</h2>
        <p class="text-sm text-on-surface-variant mb-4">Static files are available for search engines, AI agents, and non-JavaScript readers.</p>
        <div class="flex flex-wrap justify-center gap-3">
          <a class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#E2E2E5]/50 hover:text-[#B1D09A] transition-colors" href="/llms.txt">LLM Guide</a>
          <a class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#E2E2E5]/50 hover:text-[#B1D09A] transition-colors" href="/llms-full.txt">Full Context</a>
          <a class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#E2E2E5]/50 hover:text-[#B1D09A] transition-colors" href="/profile.html">Static Profile</a>
          <a class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#E2E2E5]/50 hover:text-[#B1D09A] transition-colors" href="/ai/overview.md">Overview</a>
          <a class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#E2E2E5]/50 hover:text-[#B1D09A] transition-colors" href="/ai/portfolio.md">Portfolio</a>
          <a class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#E2E2E5]/50 hover:text-[#B1D09A] transition-colors" href="/ai/source-map.md">Source Map</a>
        </div>
      </section>
      <div class="flex flex-col items-center gap-2">
        <div class="font-['Space_Grotesk'] text-[10px] uppercase text-[#84A16F] tracking-widest">© 2024 SYNTHETIC CURATOR // NEURAL ARCHITECTURE</div>
        <div class="font-['Inter'] text-sm text-on-surface">James Earl Lane</div>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <a class="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#E2E2E5]/50 hover:text-[#B1D09A] transition-colors duration-300" href="${LINKEDIN_URL}" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
          <a class="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#E2E2E5]/50 hover:text-[#B1D09A] transition-colors duration-300" href="${GITHUB_URL}" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
        </div>
      </div>
    </footer>
    ${renderMobileBottomNav("home")}
    ${renderAudioGuideOverlay()}
  `;
}

function renderAudioGuideLauncher() {
  if (pageState.audioGuideStatus !== "closed") {
    return "";
  }

  return `
    <button class="w-full bg-surface-container-low border border-primary/20 text-on-surface py-3 rounded-lg flex items-center justify-center gap-2 mb-3 hover:bg-surface-container-high transition-all" data-audio-guide-action="open">
      <span class="material-symbols-outlined text-primary text-base">spatial_audio</span>
      <span class="hidden md:block font-['Space_Grotesk'] uppercase text-[10px] tracking-widest">Audio Guide</span>
    </button>
  `;
}

function renderAudioGuideOverlay() {
  if (pageState.audioGuideStatus === "closed") {
    return "";
  }

  if (pageState.audioGuideStatus === "dock") {
    return renderAudioGuideDock("mobile");
  }

  return `
    <div class="fixed inset-0 z-[70] bg-background/70 backdrop-blur-xl flex items-end sm:items-center justify-center px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="audio-guide-title">
      <section class="w-full max-w-lg glass-panel bg-surface-container-low/95 border border-primary/20 rounded-xl shadow-[0_30px_100px_rgba(0,0,0,0.65)] overflow-hidden">
        <div class="p-6 sm:p-7">
          <div class="flex items-start gap-4 mb-5">
            <div class="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary">spatial_audio</span>
            </div>
            <div>
              <div class="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.26em] text-primary mb-2">First-run guide</div>
              <h2 id="audio-guide-title" class="text-2xl sm:text-3xl font-black tracking-tight text-on-surface leading-tight">Listen to a short orientation?</h2>
            </div>
          </div>
          <p class="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6">
            This audio guide explains what James AI can answer, how the source-backed modes work, and where the system intentionally refuses unsupported claims.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button class="bg-gradient-to-br from-primary to-primary-container text-on-primary font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-widest rounded-lg px-5 py-4 hover:opacity-90 active:scale-[0.99] transition-all" data-audio-guide-action="start">
              Yes, play guide
            </button>
            <button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-widest rounded-lg px-5 py-4 border border-outline-variant/20 transition-all" data-audio-guide-action="skip">
              No, skip
            </button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderAudioGuideDock(variant = "desktop") {
  if (pageState.audioGuideStatus !== "dock") {
    return "";
  }

  if (variant === "desktop") {
    return `
      <aside class="hidden md:block mx-6 mb-4 glass-panel bg-surface-container-low/95 border border-primary/20 rounded-xl shadow-[0_18px_50px_rgba(0,0,0,0.35)] overflow-hidden" aria-label="Audio guide player">
        <div class="px-4 py-3">
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="min-w-0">
              <div class="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.22em] text-primary">Audio Guide</div>
              <div class="text-xs text-on-surface-variant/70 truncate">James AI orientation</div>
            </div>
            <button class="w-9 h-9 rounded-lg bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center transition-colors shrink-0" data-audio-guide-action="close" aria-label="Close audio guide">
              <span class="material-symbols-outlined text-base text-on-surface-variant">close</span>
            </button>
          </div>
          <div class="grid grid-cols-[1fr_auto] gap-2">
            <button class="min-w-0 rounded-lg bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center gap-2 px-3 py-2.5 shadow-lg shadow-primary/10 active:scale-[0.99] transition-transform" data-audio-guide-action="toggle" aria-label="Play or pause audio guide">
              <span class="material-symbols-outlined text-base" data-audio-guide-play-icon>play_arrow</span>
              <span class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest" data-audio-guide-play-label>Play</span>
            </button>
            <button class="w-11 rounded-lg bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center transition-colors" data-audio-guide-action="replay" aria-label="Replay audio guide">
              <span class="material-symbols-outlined text-base text-primary">replay</span>
            </button>
          </div>
        </div>
      </aside>
    `;
  }

  const shellClass =
    "md:hidden fixed right-4 left-4 bottom-24 z-[60] glass-panel bg-surface-container-low/95 border border-primary/20 rounded-xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden";

  return `
    <aside class="${shellClass}" aria-label="Audio guide player">
      <div class="flex items-center justify-between gap-3 px-4 py-3 border-b border-outline-variant/10">
        <div class="min-w-0">
          <div class="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.22em] text-primary">Audio Guide</div>
          <div class="text-xs text-on-surface-variant/70 truncate">James AI orientation</div>
        </div>
        <button class="w-9 h-9 rounded-lg bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center transition-colors" data-audio-guide-action="close" aria-label="Close audio guide">
          <span class="material-symbols-outlined text-base text-on-surface-variant">close</span>
        </button>
      </div>
      <div class="px-4 py-4">
        <div class="flex items-center gap-3">
          <button class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center shadow-lg shadow-primary/10 scale-100 active:scale-95 transition-transform shrink-0" data-audio-guide-action="toggle" aria-label="Play or pause audio guide">
            <span class="material-symbols-outlined" data-audio-guide-play-icon>play_arrow</span>
          </button>
          <button class="w-10 h-10 rounded-lg bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center transition-colors shrink-0" data-audio-guide-action="replay" aria-label="Replay audio guide">
            <span class="material-symbols-outlined text-base text-primary">replay</span>
          </button>
          <div class="min-w-0">
            <div class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-on-surface" data-audio-guide-play-label>Play</div>
            <p class="text-xs text-on-surface-variant/60 leading-relaxed mt-1">Modes, source boundaries, and better questions.</p>
          </div>
        </div>
      </div>
    </aside>
  `;
}

function renderHomeSideModeLink(modeId, icon, label) {
  const active = pageState.modeId === modeId;

  return `
    <a class="flex items-center gap-4 px-6 py-4 ${active ? "bg-[#282A2C] border-l-4 border-[#B1D09A] text-[#B1D09A]" : "text-[#E2E2E5]/40 hover:bg-[#282A2C]/50 hover:text-[#B1D09A]"} transition-all duration-300" href="#" data-mode-id="${modeId}">
      <span class="material-symbols-outlined">${icon}</span>
      <span class="hidden md:block font-['Space_Grotesk'] uppercase text-[10px] tracking-widest">${label}</span>
    </a>
  `;
}

function renderHomeChatPanel(displayedHistory, placeholder, modeSeedLoading = false) {
      return `
        <div class="bg-surface-container-low rounded-xl flex flex-col border border-outline-variant/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div class="px-4 sm:px-8 py-4 sm:py-6 border-b border-outline-variant/5 flex justify-between items-center gap-3">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary">forum</span>
          <span class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-on-surface">Neural Chat Interface</span>
        </div>
        <span class="px-3 py-1 bg-surface-container-high rounded text-[10px] font-mono text-primary">v2.0.4-STABLE</span>
      </div>
        <div class="p-4 sm:p-8 space-y-4 sm:space-y-6 max-h-[360px] overflow-y-auto no-scrollbar" data-home-history>
          ${displayedHistory
            .map((turn, index) =>
              turn.role === "assistant"
                ? `
                  <div class="flex gap-3 sm:gap-4 max-w-[92%] sm:max-w-[85%] min-w-0">
                    <div class="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                      <span class="material-symbols-outlined text-sm text-on-surface-variant">robot_2</span>
                  </div>
                  <div class="min-w-0 max-w-full overflow-hidden bg-surface-container-high text-on-surface p-3 sm:p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed break-words [overflow-wrap:anywhere]">${renderRichText(turn.content)}</div>
                </div>
              `
                : `
                  <div class="flex gap-4 flex-row-reverse" ${index === displayedHistory.map((entry) => entry.role).lastIndexOf("user") ? "data-home-turn-user-last" : ""}>
                    <div class="min-w-0 max-w-[92%] sm:max-w-full bg-secondary-container/50 text-primary p-3 sm:p-4 rounded-2xl rounded-tr-none text-sm leading-relaxed border border-primary/20 break-words [overflow-wrap:anywhere]">${renderRichText(turn.content)}</div>
                  </div>
                `
              )
            .join("")}
          ${modeSeedLoading ? `
            <div class="flex gap-3 sm:gap-4 max-w-[92%] sm:max-w-[80%] min-w-0">
              <div class="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-sm text-on-surface-variant">robot_2</span>
              </div>
              <div class="min-w-0 max-w-full overflow-hidden bg-surface-container-high text-on-surface p-3 sm:p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed break-words [overflow-wrap:anywhere]">
                Loading the source-backed starter answer for this lens...
              </div>
            </div>
          ` : ""}
          ${pageState.busy ? `
            <div class="flex gap-3 sm:gap-4 max-w-[92%] sm:max-w-[80%] min-w-0">
              <div class="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-sm text-on-surface-variant">robot_2</span>
            </div>
            <div class="min-w-0 max-w-full overflow-hidden bg-surface-container-high text-on-surface p-3 sm:p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed break-words [overflow-wrap:anywhere]">
              Thinking through the approved sources...
            </div>
          </div>
        ` : ""}
      </div>
      <div class="p-4 sm:p-6 bg-surface-container-lowest">
        <div class="relative group">
          <input class="w-full bg-surface-container-low border-none rounded-lg py-4 px-4 sm:px-6 text-on-surface font-['Space_Grotesk'] text-xs uppercase tracking-widest focus:ring-1 focus:ring-primary/40 transition-all placeholder:text-on-surface-variant/30" placeholder="${escapeHtml(placeholder)}" type="text" value="${escapeAttribute(pageState.homeDraft)}" data-home-input/>
          <button class="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-transform" data-home-submit>
            <span class="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderHomeEvidenceCards(cards) {
  if (!cards.length) {
    return `
      <div class="group">
        <div class="bg-surface-container-low p-6 rounded-lg transition-all border-l-2 border-transparent">
          <div class="flex justify-between items-start mb-3">
            <span class="font-['Space_Grotesk'] text-[10px] text-primary">NO MATCHES YET</span>
            <span class="material-symbols-outlined text-sm text-on-surface-variant">hourglass_top</span>
          </div>
          <h4 class="font-bold text-on-surface mb-2">Ask a source-backed question</h4>
          <p class="text-sm text-on-surface-variant/60 leading-snug">This panel updates after the assistant answers from the approved corpus.</p>
        </div>
      </div>
    `;
  }

  return cards
    .map((match, index) => {
      const url = extractMatchUrl(match);
      const label = deriveEvidenceLabel(match, index);
      const description = match.items.map(normalizeEvidenceLine).filter(Boolean).slice(0, 1).join(" ");

      return `
        <div class="group cursor-pointer" ${url ? `data-open-url="${escapeAttribute(url)}"` : ""}>
          <div class="bg-surface-container-low p-6 rounded-lg transition-all border-l-2 border-transparent group-hover:border-primary group-hover:bg-surface-container-high">
            <div class="flex justify-between items-start mb-3">
              <span class="font-['Space_Grotesk'] text-[10px] text-primary">${escapeHtml(label)}</span>
              <span class="material-symbols-outlined text-sm text-on-surface-variant">open_in_new</span>
            </div>
            <h4 class="font-bold text-on-surface mb-2">${escapeHtml(match.title)}</h4>
            <p class="text-sm text-on-surface-variant/60 leading-snug">${escapeHtml(description)}</p>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderWritingPage() {
  const sortedEntries = getSortedWritingEntries();
  const pages = paginateEntries(sortedEntries, 5);
  const safePage = Math.min(pageState.writingPage, pages.length);
  const currentEntries = pages[Math.max(0, safePage - 1)] ?? [];
  const featured = currentEntries[0] ?? sortedEntries[0];
  const feedEntries = currentEntries.slice(1, 5);

  return `
    <header class="fixed top-0 w-full z-50 bg-[#121415]/80 backdrop-blur-xl shadow-2xl shadow-black/40 flex justify-between items-center px-4 md:px-8 h-16 w-full">
      <div class="flex items-center gap-4">
        <span class="text-lg font-bold tracking-tighter text-[#B1D09A] font-headline md:hidden">JAMES AI</span>
        <span class="hidden md:inline text-xl font-bold tracking-tighter text-[#B1D09A] font-headline">THE LIVING INTELLIGENCE</span>
      </div>
      <nav class="hidden md:flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar">
        ${renderPrimaryNavLinks("writing", "top")}
      </nav>
      <div class="flex items-center gap-4">
        <button class="material-symbols-outlined text-[#B1D09A] scale-95 active:scale-90 transition-transform" data-page-link="home" data-focus-composer="true">account_circle</button>
      </div>
    </header>
    <aside class="hidden lg:flex flex-col h-full pt-20 pb-8 h-screen w-64 fixed left-0 top-0 border-r border-[#282A2C]/50 bg-[#0C0E10] z-40">
      <div class="px-6 mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-full bg-surface-container-high border border-primary/20 flex items-center justify-center">
            <span class="font-label text-[9px] font-bold uppercase tracking-widest text-primary">SC</span>
          </div>
          <div>
            <p class="text-[#B1D09A] font-bold text-[10px] font-label tracking-widest uppercase">SYNTHETIC CURATOR</p>
            <p class="text-gray-500 text-[9px] font-label uppercase">Active Protocol: v2.0.4</p>
          </div>
        </div>
      </div>
    <nav class="flex-1 space-y-1">
      ${renderPrimaryNavLinks("writing", "side")}
    </nav>
      <div class="px-6 mt-auto space-y-4">
        <button class="w-full py-3 rounded-lg neural-gradient text-on-primary font-label text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-primary/10" data-page-link="home" data-focus-composer="true">ASK ASSISTANT</button>
        <div class="pt-4 border-t border-[#282A2C]/50 space-y-2">
          <a class="flex items-center gap-2 text-gray-500 hover:text-[#B1D09A] transition-colors font-label text-[10px] uppercase tracking-widest" href="#projects" data-page-link="projects"><span class="material-symbols-outlined text-xs">query_stats</span>Artifacts</a>
          <a class="flex items-center gap-2 text-gray-500 hover:text-[#B1D09A] transition-colors font-label text-[10px] uppercase tracking-widest" href="#" data-page-link="home"><span class="material-symbols-outlined text-xs">home</span>Nexus</a>
        </div>
      </div>
    </aside>
    <main class="lg:ml-64 pt-24 px-4 sm:px-5 md:px-8 pb-28 md:pb-16 min-h-screen">
      <div class="max-w-6xl mx-auto">
        <header class="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="w-2 h-2 bg-primary rounded-full"></span>
              <span class="font-label text-xs uppercase tracking-[0.2em] text-primary">Intelligence Feed</span>
            </div>
            <h1 class="text-4xl sm:text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface leading-none mb-4">WRITING<span class="text-primary">_</span></h1>
            <p class="text-secondary max-w-xl text-base sm:text-lg font-light">A curated archive of published essays, AI analysis, public argument, and narrative writing from James Lane.</p>
          </div>
          <div class="flex w-full md:w-auto items-center gap-3 bg-surface-container-lowest p-1 rounded-lg border border-outline-variant/10">
            <button class="flex-1 md:flex-none px-4 py-2 font-label text-[10px] uppercase tracking-widest ${pageState.writingSort === "chronological" ? "text-primary border border-primary/40 rounded-md" : "text-gray-500 hover:text-on-surface transition-colors"}" data-writing-sort="chronological">Chronological</button>
            <button class="flex-1 md:flex-none px-4 py-2 font-label text-[10px] uppercase tracking-widest ${pageState.writingSort === "complexity" ? "text-primary border border-primary/40 rounded-md" : "text-gray-500 hover:text-on-surface transition-colors"}" data-writing-sort="complexity">Complexity</button>
          </div>
        </header>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <article class="md:col-span-8 group cursor-pointer" data-open-url="${escapeAttribute(featured.url)}">
            <div class="relative overflow-hidden rounded-xl aspect-[16/9] bg-surface-container mb-6">
              <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80" src="${WRITING_IMAGES[0]}"/>
              <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              <div class="absolute bottom-6 left-6 right-6">
                <div class="flex items-center gap-4 mb-3">
                  <span class="px-2 py-0.5 bg-primary/20 text-primary border-l-2 border-primary font-label text-[10px] tracking-widest uppercase">${escapeHtml(featured.category)}</span>
                  <span class="font-label text-[10px] text-gray-400 tracking-widest uppercase">${escapeHtml(featured.dateLabel)}</span>
                </div>
                <h2 class="text-3xl font-headline font-bold tracking-tight text-white group-hover:text-primary transition-colors">${escapeHtml(featured.title)}</h2>
              </div>
            </div>
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div class="flex gap-8">
                <div class="flex flex-col">
                  <span class="font-label text-[9px] text-gray-500 uppercase tracking-widest mb-1">Complexity</span>
                  <span class="font-label text-sm text-primary">${escapeHtml(complexityLabel(featured))}</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-label text-[9px] text-gray-500 uppercase tracking-widest mb-1">Read Time</span>
                  <span class="font-label text-sm text-on-surface">${escapeHtml(readTimeLabel(featured))}</span>
                </div>
              </div>
            </div>
          </article>
          <aside class="md:col-span-4 space-y-8">
            <section class="glass-panel p-6 rounded-xl border border-primary/20 shadow-xl shadow-primary/5">
              <div class="flex items-center gap-3 mb-4">
                <span class="material-symbols-outlined text-primary">bolt</span>
                <h3 class="font-headline font-bold text-lg tracking-tight">Active Pulse</h3>
              </div>
              <p class="text-sm text-secondary font-light leading-relaxed mb-6">James AI is currently surfacing <span class="text-primary font-label">"${escapeHtml(featured.title)}"</span> as the best starting point for this writing archive.</p>
              <div class="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                <div class="bg-primary h-full w-2/3 shadow-[0_0_10px_rgba(177,208,154,0.6)]"></div>
              </div>
            </section>
          </aside>
          <div class="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            ${renderWritingFeedCards(feedEntries)}
            <article class="p-8 rounded-xl bg-surface-container-lowest border-dashed border-2 border-outline-variant/20 hover:border-primary/30 transition-all duration-300 flex flex-col justify-center items-center text-center cursor-pointer group" data-page-link="home" data-focus-composer="true">
              <span class="material-symbols-outlined text-4xl text-gray-600 mb-4 group-hover:text-primary transition-colors">auto_stories</span>
              <h3 class="font-headline font-bold text-lg mb-2">Request Synthesis</h3>
              <p class="text-gray-500 text-xs font-label uppercase tracking-widest">Custom intelligence report generation</p>
            </article>
          </div>
        </div>
        <footer class="mt-20 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex gap-4">
            <button class="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center hover:border-primary transition-colors ${safePage <= 1 ? "opacity-40 cursor-not-allowed" : ""}" data-writing-page="${Math.max(1, safePage - 1)}"><span class="material-symbols-outlined text-sm">chevron_left</span></button>
            ${renderWritingPageButtons(pages.length, safePage)}
            <button class="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center hover:border-primary transition-colors ${safePage >= pages.length ? "opacity-40 cursor-not-allowed" : ""}" data-writing-page="${Math.min(pages.length, safePage + 1)}"><span class="material-symbols-outlined text-sm">chevron_right</span></button>
          </div>
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
              <span class="font-label text-[10px] uppercase tracking-widest text-gray-400">Library Sync: 100%</span>
            </div>
            <span class="font-label text-[10px] uppercase tracking-widest text-gray-500">Total Entries: ${writingPortfolio.length}</span>
          </div>
        </footer>
      </div>
    </main>
    <div class="hidden md:block fixed bottom-8 right-8">
      <button class="w-14 h-14 rounded-full neural-gradient text-on-primary flex items-center justify-center shadow-2xl shadow-primary/20 scale-100 hover:scale-110 active:scale-95 transition-transform duration-200" data-page-link="home" data-focus-composer="true">
        <span class="material-symbols-outlined">search</span>
      </button>
    </div>
    ${renderMobileBottomNav("writing")}
  `;
}

function renderWritingFeedCards(entries) {
  const paddedEntries = [...entries];

  while (paddedEntries.length < 4) {
    paddedEntries.push(null);
  }

  return paddedEntries
    .map((entry) => {
      if (!entry) {
        return `
          <article class="p-8 rounded-xl bg-surface-container-low border border-outline-variant/5 flex flex-col justify-center min-h-[280px]">
            <div class="mb-8">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-4 bg-primary/30"></div>
                <span class="font-label text-[10px] uppercase tracking-widest text-gray-500">Archive Slot</span>
              </div>
              <h3 class="text-xl font-headline font-bold text-on-surface leading-snug mb-4">More writing available</h3>
              <p class="text-secondary text-sm font-light line-clamp-3 mb-6">Switch pages or ask the assistant for a specific article, topic, or writing category.</p>
            </div>
          </article>
        `;
      }

      const complexity = complexityDots(entry);

      return `
        <article class="p-8 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all duration-300 group flex flex-col border border-outline-variant/5 cursor-pointer" data-open-url="${escapeAttribute(entry.url)}">
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-1 h-4 bg-primary"></div>
              <span class="font-label text-[10px] uppercase tracking-widest text-gray-400">${escapeHtml(entry.category)}</span>
            </div>
            <h3 class="text-xl font-headline font-bold text-on-surface leading-snug mb-4 group-hover:text-primary transition-colors">${escapeHtml(entry.title)}</h3>
            <p class="text-secondary text-sm font-light line-clamp-3 mb-6">${escapeHtml(entry.description)}</p>
          </div>
          <div class="mt-auto pt-6 border-t border-outline-variant/10 flex justify-between items-end">
            <div class="flex flex-col">
              <span class="font-label text-[8px] text-gray-500 uppercase mb-1">Neural complexity</span>
              <div class="flex gap-0.5">
                ${complexity.map((active) => `<span class="w-1.5 h-1.5 ${active ? "bg-primary" : "bg-surface-container-highest"} rounded-full"></span>`).join("")}
              </div>
            </div>
            <span class="font-label text-[10px] text-gray-500 uppercase">${escapeHtml(entry.dateLabel)}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderWritingPageButtons(totalPages, currentPage) {
  const buttons = [];
  const cappedPages = Math.max(1, totalPages);

  for (let page = 1; page <= Math.max(3, cappedPages); page += 1) {
    const isLivePage = page <= cappedPages;
    const active = currentPage === page;
    buttons.push(`
      <button class="w-10 h-10 rounded-full ${active ? "bg-primary text-on-primary" : "border border-outline-variant/20 text-xs font-label hover:border-primary transition-colors"} ${!isLivePage ? "opacity-30 cursor-not-allowed" : ""}" ${isLivePage ? `data-writing-page="${page}"` : ""}>${page}</button>
    `);
  }

  return buttons.join("");
}

function renderContactPage() {
  const contactLinks = [
    {
      label: "Email",
      title: CONTACT_EMAIL,
      description: "Best starting point for work, project, or collaboration inquiries.",
      url: CONTACT_MAILTO,
      icon: "mail",
      action: "Send Email"
    },
    {
      label: "LinkedIn",
      title: "James Lane on LinkedIn",
      description: "Professional profile, work history, and direct professional outreach.",
      url: LINKEDIN_URL,
      icon: "badge",
      action: "Open Profile"
    },
    {
      label: "GitHub",
      title: "Angry-TacoZ",
      description: "Public repositories, portfolio code, prototypes, and technical artifacts.",
      url: GITHUB_URL,
      icon: "code",
      action: "Open GitHub"
    },
    {
      label: "X",
      title: "@JamesLaneAI",
      description: "Public updates, AI workflow notes, and short-form project context.",
      url: X_URL,
      icon: "alternate_email",
      action: "Open X"
    },
    {
      label: "Medium",
      title: "@Angry_TacoZ",
      description: "Published essays, AI analysis, civic commentary, and personal narrative writing.",
      url: MEDIUM_URL,
      icon: "article",
      action: "Read Writing"
    },
    {
      label: "Consulting",
      title: "JamesLaneAI.com",
      description: "Public-facing AI consulting and workflow automation services site.",
      url: CONSULTING_URL,
      icon: "language",
      action: "Open Site"
    }
  ];

  return `
    <header class="fixed top-0 w-full z-50 bg-[#121415]/80 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 h-16 w-full shadow-2xl shadow-black/40">
      <div class="text-lg md:text-xl font-bold tracking-tighter text-[#B1D09A] font-headline">${`<span class="md:hidden">JAMES AI</span><span class="hidden md:inline">THE LIVING INTELLIGENCE</span>`}</div>
      <nav class="hidden md:flex items-center gap-4 md:gap-8 font-headline font-bold tracking-tight overflow-x-auto no-scrollbar">
        ${renderPrimaryNavLinks("contact", "top")}
      </nav>
      <div class="flex items-center gap-4">
        <button class="hover:bg-[#282A2C] transition-all duration-300 p-2 rounded-full scale-95 active:scale-90 transition-transform" data-page-link="home" data-focus-composer="true" aria-label="Ask assistant">
          <span class="material-symbols-outlined text-[#B1D09A]">account_circle</span>
        </button>
      </div>
    </header>
    <aside class="h-screen w-64 fixed left-0 top-0 border-r border-[#282A2C]/50 bg-[#0C0E10] flex-col h-full pt-20 pb-8 hidden lg:flex">
      <div class="px-6 mb-8">
        <div class="text-[#B1D09A] font-bold font-label text-xs uppercase tracking-widest mb-1">CONTACT HUB</div>
        <div class="text-gray-500 font-label text-[10px] tracking-widest">Public Profiles</div>
      </div>
      <nav class="flex-grow">
        ${renderPrimaryNavLinks("contact", "side")}
      </nav>
      <div class="px-4 mb-8">
        <button class="w-full py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-label text-[10px] font-bold tracking-widest rounded-lg shadow-lg shadow-primary/10" data-open-url="${escapeAttribute(CONTACT_MAILTO)}">EMAIL JAMES</button>
      </div>
      <div class="border-t border-[#282A2C]/50 pt-6">
        <div class="flex items-center gap-3 text-gray-500 px-4 py-2 hover:bg-[#282A2C] font-label text-[10px] uppercase tracking-widest transition-all cursor-pointer" data-page-link="projects"><span class="material-symbols-outlined text-sm">hub</span><span>Artifacts</span></div>
        <div class="flex items-center gap-3 text-gray-500 px-4 py-2 hover:bg-[#282A2C] font-label text-[10px] uppercase tracking-widest transition-all cursor-pointer" data-page-link="home"><span class="material-symbols-outlined text-sm">home</span><span>Nexus</span></div>
      </div>
    </aside>
    <main class="lg:ml-64 pt-24 px-4 sm:px-5 md:px-12 pb-28 md:pb-24 min-h-screen">
      <section class="max-w-7xl mx-auto mb-14">
        <div class="flex items-center gap-3 mb-4">
          <div class="h-px w-12 bg-primary"></div>
          <span class="font-label text-primary text-xs uppercase tracking-[0.3em]">Direct Channels</span>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-10 items-end">
          <div>
            <h1 class="text-4xl sm:text-5xl md:text-7xl font-headline font-extrabold tracking-tighter mb-6 text-on-surface">CONTACT <span class="text-primary">JAMES</span></h1>
            <p class="max-w-2xl text-base sm:text-lg text-gray-400 font-body leading-relaxed">Use these public channels for work inquiries, profile review, writing, code, and project context. Email is the cleanest path for direct outreach.</p>
          </div>
          <div class="glass-panel rounded-xl p-6 border border-primary/20 bg-surface-container-low/70">
            <div class="font-label text-[10px] uppercase tracking-[0.25em] text-primary mb-3">Primary Contact</div>
            <a class="text-2xl sm:text-3xl font-headline font-bold tracking-tight text-on-surface hover:text-primary transition-colors [overflow-wrap:anywhere]" href="${CONTACT_MAILTO}">${CONTACT_EMAIL}</a>
            <p class="text-sm text-on-surface-variant mt-4 leading-relaxed">For roles, collaborations, project questions, or consulting conversations, start here and include the context you want reviewed.</p>
          </div>
        </div>
      </section>
      <section class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        ${contactLinks.map(renderContactLinkCard).join("")}
      </section>
      <section class="max-w-7xl mx-auto mt-16">
        <div class="bg-surface-container-lowest border border-outline-variant/5 rounded-2xl p-8 md:p-10">
          <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 class="text-2xl md:text-3xl font-headline font-bold tracking-tight mb-3">Need context before reaching out?</h2>
              <p class="text-gray-400 font-body leading-relaxed">The assistant can answer source-backed questions about James's work style, projects, writing, role fit, and accessibility context before you contact him directly.</p>
            </div>
            <button class="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-label font-bold text-xs uppercase tracking-widest rounded-lg transition-transform active:scale-95 shadow-xl shadow-primary/10" data-page-link="home" data-focus-composer="true">ASK ASSISTANT</button>
          </div>
        </div>
      </section>
    </main>
    <footer class="bg-surface-container-lowest py-12 px-4 md:px-8 border-t border-outline-variant/10">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="text-[#B1D09A] font-bold font-headline tracking-tighter text-lg">THE LIVING INTELLIGENCE</div>
        <div class="flex flex-wrap justify-center gap-8">
          <a class="text-gray-500 hover:text-primary transition-colors font-label text-[10px] uppercase tracking-[0.2em]" href="${CONTACT_MAILTO}">Email</a>
          <a class="text-gray-500 hover:text-primary transition-colors font-label text-[10px] uppercase tracking-[0.2em]" href="${LINKEDIN_URL}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a class="text-gray-500 hover:text-primary transition-colors font-label text-[10px] uppercase tracking-[0.2em]" href="${GITHUB_URL}" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a class="text-gray-500 hover:text-primary transition-colors font-label text-[10px] uppercase tracking-[0.2em]" href="${X_URL}" target="_blank" rel="noopener noreferrer">X</a>
          <a class="text-gray-500 hover:text-primary transition-colors font-label text-[10px] uppercase tracking-[0.2em]" href="${MEDIUM_URL}" target="_blank" rel="noopener noreferrer">Medium</a>
        </div>
        <div class="text-gray-600 font-label text-[10px] uppercase tracking-widest">PUBLIC CONTACT SURFACE</div>
      </div>
    </footer>
    ${renderMobileBottomNav("contact")}
  `;
}

function renderContactLinkCard(link) {
  return `
    <article class="glass-panel bg-surface-container-low rounded-xl border border-outline-variant/10 p-6 hover:border-primary/30 hover:bg-surface-container-high/70 transition-all cursor-pointer min-h-[230px] flex flex-col" data-open-url="${escapeAttribute(link.url)}">
      <div class="flex items-start justify-between gap-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <span class="material-symbols-outlined text-primary">${escapeHtml(link.icon)}</span>
        </div>
        <span class="font-label text-[10px] uppercase tracking-widest text-primary">${escapeHtml(link.label)}</span>
      </div>
      <h2 class="text-2xl font-headline font-bold tracking-tight text-on-surface mb-3 [overflow-wrap:anywhere]">${escapeHtml(link.title)}</h2>
      <p class="text-sm text-on-surface-variant leading-relaxed mb-6">${escapeHtml(link.description)}</p>
      <div class="mt-auto flex items-center justify-between pt-5 border-t border-outline-variant/10">
        <span class="font-label text-[10px] uppercase tracking-widest text-gray-500">${escapeHtml(link.action)}</span>
        <span class="material-symbols-outlined text-primary">arrow_forward</span>
      </div>
    </article>
  `;
}

function renderEvidencePage() {
  const context = pageState.latestContext ?? buildLatestContext(pageState.modeId);
  const matches = context?.matches?.length ? context.matches : fallbackEvidenceMatches();
  const primary = matches[0];
  const secondary = matches.slice(1, 4);
  const groupBreakdown = sourceGroupBreakdown(matches);
  const progressBars = buildEvidenceBars(groupBreakdown);

  return `
    <nav class="fixed top-0 w-full z-50 bg-[#121415]/80 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 h-16 w-full shadow-2xl shadow-black/40">
      <div class="text-lg md:text-xl font-bold tracking-tighter text-[#B1D09A] font-headline">${`<span class="md:hidden">JAMES AI</span><span class="hidden md:inline">THE LIVING INTELLIGENCE</span>`}</div>
      <div class="hidden md:flex items-center gap-4 md:gap-8 font-headline font-bold tracking-tight overflow-x-auto no-scrollbar">
        ${renderPrimaryNavLinks("evidence", "top")}
      </div>
      <div class="flex items-center gap-4">
        <button class="hover:bg-[#282A2C] transition-all duration-300 p-2 rounded-full scale-95 active:scale-90 transition-transform" data-page-link="home" data-focus-composer="true">
          <span class="material-symbols-outlined text-[#B1D09A]">account_circle</span>
        </button>
      </div>
    </nav>
    <aside class="h-screen w-64 fixed left-0 top-0 border-r border-[#282A2C]/50 bg-[#0C0E10] flex flex-col h-full pt-20 pb-8 hidden lg:flex">
      <div class="px-6 mb-8">
        <div class="text-[#B1D09A] font-bold font-label text-xs uppercase tracking-widest mb-1">SYNTHETIC CURATOR</div>
        <div class="text-gray-500 font-label text-[10px] tracking-widest">Active Protocol: v2.0.4</div>
      </div>
      <nav class="flex-grow">
        ${renderPrimaryNavLinks("evidence", "side")}
      </nav>
      <div class="px-4 mb-8">
        <button class="w-full py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-label text-[10px] font-bold tracking-widest rounded-lg shadow-lg shadow-primary/10" data-page-link="home" data-focus-composer="true">ASK ASSISTANT</button>
      </div>
      <div class="border-t border-[#282A2C]/50 pt-6">
        <div class="flex items-center gap-3 text-gray-500 px-4 py-2 hover:bg-[#282A2C] font-label text-[10px] uppercase tracking-widest transition-all" data-page-link="projects"><span class="material-symbols-outlined text-sm">hub</span><span>Artifacts</span></div>
        <div class="flex items-center gap-3 text-gray-500 px-4 py-2 hover:bg-[#282A2C] font-label text-[10px] uppercase tracking-widest transition-all" data-page-link="home"><span class="material-symbols-outlined text-sm">home</span><span>Nexus</span></div>
      </div>
    </aside>
    <main class="lg:ml-64 pt-24 px-4 sm:px-5 md:px-12 pb-28 md:pb-24 technical-grid min-h-screen">
      <header class="max-w-7xl mx-auto mb-16">
        <div class="flex items-center gap-3 mb-4">
          <div class="h-px w-12 bg-primary"></div>
          <span class="font-label text-primary text-xs uppercase tracking-[0.3em]">System Verification</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-headline font-extrabold tracking-tighter mb-6 text-on-surface">EVIDENCE <span class="text-primary">VAULT</span></h1>
        <p class="max-w-2xl text-base sm:text-lg text-gray-400 font-body leading-relaxed">Latest answer trace from ${escapeHtml(context?.modeLabel ?? "Profile")} mode, grounded in approved source documents and public project or writing records.</p>
      </header>
      <section class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        <div class="md:col-span-8 glass-panel rounded-xl overflow-hidden group">
          <div class="p-1 bg-surface-container-high border-b border-outline-variant/10 flex justify-between items-center px-4">
            <div class="flex gap-1.5">
              <div class="w-2.5 h-2.5 rounded-full bg-error/30"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-primary/30"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-primary/30"></div>
            </div>
            <span class="font-label text-[10px] text-gray-500 tracking-widest">${escapeHtml(primary?.sourceLabel ?? "APPROVED_SOURCE.DOC")}</span>
          </div>
          <div class="relative aspect-video bg-surface-container-lowest p-8 flex items-center justify-center">
            <img alt="Neural Architecture" class="w-full h-full object-cover rounded opacity-80 group-hover:opacity-100 transition-opacity duration-500" src="${WRITING_IMAGES[1]}"/>
            <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <div class="font-label text-[10px] text-primary uppercase tracking-widest mb-1">${escapeHtml(context?.modeLabel ?? "Profile")} / Latest Answer</div>
                <div class="text-xl font-bold font-headline tracking-tight">${escapeHtml(primary?.title ?? "No source selected")}</div>
              </div>
              <div class="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                <span class="material-symbols-outlined text-primary text-xs" style="font-variation-settings: 'FILL' 1;">verified</span>
                <span class="font-label text-[10px] text-primary uppercase font-bold tracking-widest">Verified</span>
              </div>
            </div>
          </div>
          <div class="p-6 bg-surface-container-high/50">
            <p class="text-sm text-gray-300 leading-relaxed font-body">${escapeHtml(primary ? primary.items.map(normalizeEvidenceLine).filter(Boolean).slice(0, 3).join(" ") : "Ask a question on the home screen to populate this vault with a specific evidence trace.")}</p>
          </div>
        </div>
        <div class="md:col-span-4 flex flex-col gap-6">
          <div class="bg-surface-container-high rounded-xl p-6 relative overflow-hidden group">
            <div class="flex justify-between items-start mb-8">
              <div>
                <div class="font-label text-[10px] text-primary uppercase tracking-widest mb-1">Matched Sources</div>
                <div class="text-2xl font-bold font-headline">${matches.length} <span class="text-sm font-normal text-gray-500">TOTAL</span></div>
              </div>
              <span class="material-symbols-outlined text-primary/40">speed</span>
            </div>
            <div class="h-24 flex items-end gap-1">
              ${progressBars.map((height) => `<div class="flex-1 bg-primary/20 group-hover:bg-primary/40 transition-all rounded-t-sm" style="height: ${height}%"></div>`).join("")}
            </div>
            <div class="mt-4 pt-4 border-t border-outline-variant/10">
              <div class="flex justify-between text-[10px] font-label text-gray-500 uppercase tracking-widest">
                <span>Status: In Scope</span>
                <span>Mode: ${escapeHtml(context?.modeLabel ?? "Profile")}</span>
              </div>
            </div>
          </div>
          <div class="bg-surface-container-high rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div class="font-label text-[10px] text-gray-500 uppercase tracking-widest mb-4">Source Weights</div>
              <div class="space-y-4">${renderEvidenceWeightRows(groupBreakdown)}</div>
            </div>
            <div class="mt-8 flex items-center gap-2">
              <span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span class="text-[10px] font-label text-primary uppercase tracking-widest">Question: ${escapeHtml(truncate(context?.question ?? "No active question", 42))}</span>
            </div>
          </div>
        </div>
        <div class="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">${renderEvidenceSourceCards(secondary)}</div>
      </section>
      <section class="max-w-7xl mx-auto mt-24">
        <div class="bg-surface-container-lowest border border-outline-variant/5 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl font-headline font-bold tracking-tight mb-4">Request a Deep Audit</h2>
              <p class="text-gray-400 mb-8 font-body leading-relaxed">Need a tighter trace? Jump back into the assistant and ask for specific projects, articles, fit claims, or supporting evidence.</p>
              <div class="flex flex-wrap gap-4">
                <button class="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-label font-bold text-xs uppercase tracking-widest rounded-lg transition-transform active:scale-95 shadow-xl shadow-primary/10" data-page-link="home" data-focus-composer="true">ASK A SOURCE QUESTION</button>
                <button class="px-8 py-4 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label font-bold text-xs uppercase tracking-widest rounded-lg border border-outline-variant/20 transition-all" data-page-link="writing">VIEW WRITING ARCHIVE</button>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-4 p-4 bg-surface-container-high/40 rounded-xl border border-outline-variant/10">
                <div class="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary"><span class="material-symbols-outlined">shield</span></div>
                <div>
                  <div class="text-xs font-label text-primary uppercase tracking-widest font-bold">SOURCE-BOUND</div>
                  <div class="text-[10px] text-gray-500">Responses are constrained to approved documents and published public sources.</div>
                </div>
              </div>
              <div class="flex items-center gap-4 p-4 bg-surface-container-high/40 rounded-xl border border-outline-variant/10">
                <div class="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary"><span class="material-symbols-outlined">lock</span></div>
                <div>
                  <div class="text-xs font-label text-primary uppercase tracking-widest font-bold">BOUNDARY ENFORCED</div>
                  <div class="text-[10px] text-gray-500">Writing is treated as published opinion and analysis, not hidden cognition or private truth.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer class="bg-surface-container-lowest py-12 px-4 md:px-8 border-t border-outline-variant/10">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="text-[#B1D09A] font-bold font-headline tracking-tighter text-lg">THE LIVING INTELLIGENCE</div>
        <div class="flex gap-8">
          <a class="text-gray-500 hover:text-primary transition-colors font-label text-[10px] uppercase tracking-[0.2em]" href="mailto:tiburo13@gmail.com">Contact</a>
          <a class="text-gray-500 hover:text-primary transition-colors font-label text-[10px] uppercase tracking-[0.2em]" href="#" data-page-link="home">Nexus</a>
          <a class="text-gray-500 hover:text-primary transition-colors font-label text-[10px] uppercase tracking-[0.2em]" href="#writing" data-page-link="writing">Evolution</a>
          <a class="text-gray-500 hover:text-primary transition-colors font-label text-[10px] uppercase tracking-[0.2em]" href="#projects" data-page-link="projects">Artifacts</a>
        </div>
        <div class="text-gray-600 font-label text-[10px] uppercase tracking-widest">© 2024 SYSTEM CORE VER 2.0.4</div>
      </div>
    </footer>
    ${renderMobileBottomNav("evidence")}
  `;
}

function renderEvidenceWeightRows(groupBreakdown) {
  const groups = ["resume-pdf", "projects-catalog", "writing-corpus"];

  return groups
    .map((group) => {
      const percent = groupBreakdown[group] ?? 0;

      return `
        <div>
          <div class="flex justify-between text-xs font-label mb-1.5">
            <span class="text-on-surface">${escapeHtml(sourceGroupLabel(group))}</span>
            <span class="text-primary">${percent}%</span>
          </div>
          <div class="h-1 w-full bg-surface-container-lowest rounded-full overflow-hidden">
            <div class="h-full bg-primary" style="width: ${percent}%"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderEvidenceSourceCards(matches) {
  const paddedMatches = [...matches];

  while (paddedMatches.length < 3) {
    paddedMatches.push(null);
  }

  return paddedMatches
    .map((match, index) => {
      if (!match) {
        return `
          <div class="bg-surface-container-low border border-outline-variant/10 rounded-xl overflow-hidden group hover:border-primary/30 transition-colors">
            <div class="aspect-video relative">
              <img alt="Evidence placeholder" class="w-full h-full object-cover" src="${WRITING_IMAGES[(index + 2) % WRITING_IMAGES.length]}"/>
              <div class="absolute inset-0 bg-surface-container-lowest/50"></div>
            </div>
            <div class="p-5">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold font-headline tracking-tight text-lg">Awaiting more sources</h3>
                <div class="px-2 py-0.5 bg-primary/10 rounded-sm"><span class="font-label text-[9px] text-primary uppercase font-bold tracking-widest">ID: SRC-00</span></div>
              </div>
              <p class="text-xs text-gray-500 mb-4 font-body leading-relaxed">Ask another question to expand the evidence trace and populate additional source cards.</p>
              <div class="flex items-center gap-2 text-primary">
                <span class="material-symbols-outlined text-sm">check_circle</span>
                <span class="font-label text-[10px] uppercase font-bold tracking-widest">Ready</span>
              </div>
            </div>
          </div>
        `;
      }

      const matchUrl = extractMatchUrl(match);

      return `
        <div class="bg-surface-container-low border border-outline-variant/10 rounded-xl overflow-hidden group hover:border-primary/30 transition-colors" ${matchUrl ? `data-open-url="${escapeAttribute(matchUrl)}"` : ""}>
          <div class="aspect-video relative">
            <img alt="Evidence reference" class="w-full h-full object-cover" src="${WRITING_IMAGES[(index + 2) % WRITING_IMAGES.length]}"/>
            <div class="absolute inset-0 bg-surface-container-lowest/20 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div class="p-5">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-bold font-headline tracking-tight text-lg">${escapeHtml(match.title)}</h3>
              <div class="px-2 py-0.5 bg-primary/10 rounded-sm"><span class="font-label text-[9px] text-primary uppercase font-bold tracking-widest">ID: SRC-0${index + 1}</span></div>
            </div>
            <p class="text-xs text-gray-500 mb-4 font-body leading-relaxed">${escapeHtml(match.items.map(normalizeEvidenceLine).filter(Boolean).slice(0, 2).join(" "))}</p>
            <div class="flex items-center gap-2 text-primary">
              <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              <span class="font-label text-[10px] uppercase font-bold tracking-widest">Audit Passed</span>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderArtDesignPage() {
  const featured = artDesignPortfolio.find((entry) => entry.variant === "feature") ?? artDesignPortfolio[0];
  const supporting = artDesignPortfolio.filter((entry) => entry.id !== featured.id);

  return `
    <header class="fixed top-0 w-full z-50 bg-[#121415]/80 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 h-16 w-full shadow-2xl shadow-black/40">
      <div class="text-lg md:text-xl font-bold tracking-tighter text-[#B1D09A] font-['Inter']">JAMES AI</div>
      <nav class="hidden md:flex items-center gap-4 md:gap-8 font-['Inter'] font-bold tracking-tight overflow-x-auto no-scrollbar">
        ${renderPrimaryNavLinks("design", "top")}
      </nav>
      <button class="hover:bg-[#282A2C] transition-all duration-300 p-2 rounded-full scale-95 active:scale-90 transition-transform" data-page-link="home" data-focus-composer="true">
        <span class="material-symbols-outlined text-[#B1D09A]">account_circle</span>
      </button>
    </header>
    <aside class="h-screen w-64 fixed left-0 top-0 border-r border-[#282A2C]/50 bg-[#0C0E10] flex-col pt-20 pb-8 z-40 hidden lg:flex">
      <div class="px-6 mb-10">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded bg-surface-container-high border border-outline-variant/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">palette</span>
          </div>
          <div>
            <h3 class="text-[#B1D09A] font-bold font-label text-[10px] uppercase tracking-widest leading-none">VISUAL SYSTEMS</h3>
            <p class="text-gray-500 text-[9px] font-label tracking-tighter">Art Direction / Design</p>
          </div>
        </div>
      </div>
      <nav class="flex-grow space-y-1">
        ${renderPrimaryNavLinks("design", "side")}
      </nav>
      <div class="px-4 mt-auto">
        <button class="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-label text-[10px] font-bold tracking-widest py-3 rounded-lg hover:opacity-90 transition-all uppercase flex items-center justify-center gap-2" data-page-link="home" data-focus-composer="true">
          <span class="material-symbols-outlined text-sm">bolt</span>ASK ASSISTANT
        </button>
      </div>
    </aside>
    <main class="lg:pl-64 pt-16 min-h-screen technical-grid">
      <div class="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-8 py-8 md:py-12 pb-28 md:pb-16">
        <section class="relative overflow-hidden rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-lowest/70 mb-8 md:mb-10">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(177,208,154,0.16),transparent_30%),linear-gradient(135deg,rgba(132,161,111,0.12),transparent_55%)]"></div>
          <div class="relative grid grid-cols-1 xl:grid-cols-12 gap-8 p-6 sm:p-8 md:p-10 xl:p-12 items-end">
            <div class="xl:col-span-5">
              <div class="flex items-center gap-2 mb-5">
                <div class="w-1.5 h-6 bg-primary"></div>
                <span class="font-label text-xs uppercase tracking-[0.3em] text-primary">Visual Systems / Art Direction</span>
              </div>
              <h1 class="text-5xl sm:text-6xl md:text-7xl font-extrabold font-headline tracking-tighter text-on-surface mb-5 md:mb-6 leading-none">ART &amp; DESIGN LENS</h1>
              <p class="text-on-surface-variant text-base sm:text-lg max-w-xl leading-relaxed">
                A focused gallery of AI-assisted visual explorations: technical diagrams, brand marks, event posters, community graphics, and concept-art packaging.
              </p>
              <div class="mt-7 flex flex-wrap gap-2">
                ${["Technical Layout", "Brand Identity", "Event Art", "Poster Concepts"].map((tag) => `<span class="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label text-[10px] uppercase tracking-[0.18em]">${escapeHtml(tag)}</span>`).join("")}
              </div>
            </div>
            <article class="xl:col-span-7 group cursor-pointer" data-open-url="${escapeAttribute(featured.image)}">
              <div class="relative overflow-hidden rounded-2xl border border-primary/20 bg-surface-container shadow-2xl shadow-black/40">
                <img class="w-full aspect-[16/10] object-cover opacity-90 group-hover:scale-[1.02] transition-transform duration-700" src="${escapeAttribute(featured.image)}" alt="${escapeAttribute(featured.alt)}"/>
                <div class="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
                <div class="absolute left-5 right-5 bottom-5">
                  <span class="inline-flex mb-3 px-3 py-1 rounded bg-primary/10 text-primary border border-primary/20 font-label text-[10px] uppercase tracking-widest">${escapeHtml(featured.category)}</span>
                  <h2 class="text-2xl md:text-4xl font-headline font-extrabold tracking-tighter text-on-surface group-hover:text-primary transition-colors">${escapeHtml(featured.title)}</h2>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="art-design-grid">
          ${supporting.map((entry) => renderArtDesignCard(entry)).join("")}
        </section>

        <footer class="mt-16 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex flex-wrap items-center gap-8">
            <div><p class="font-label text-[10px] text-gray-500 uppercase tracking-widest mb-1">VISUAL_ARTIFACTS</p><p class="text-2xl font-headline font-bold text-on-surface tracking-tighter">${artDesignPortfolio.length}</p></div>
            <div><p class="font-label text-[10px] text-gray-500 uppercase tracking-widest mb-1">FORMAT_RANGE</p><p class="text-2xl font-headline font-bold text-on-surface tracking-tighter">MIXED</p></div>
            <div><p class="font-label text-[10px] text-gray-500 uppercase tracking-widest mb-1">DISPLAY_ASSETS</p><p class="text-2xl font-headline font-bold text-on-surface tracking-tighter">OPTIMIZED</p></div>
          </div>
          <div class="text-right">
            <p class="font-label text-[10px] text-gray-600 uppercase tracking-[0.2em]">Designed &amp; Compiled by James AI Core</p>
            <p class="font-label text-[10px] text-gray-700 uppercase tracking-[0.2em] mt-1">© 2024 THE LIVING INTELLIGENCE. ALL RIGHTS RESERVED.</p>
          </div>
        </footer>
      </div>
    </main>
    <div class="hidden md:flex fixed bottom-8 right-8 z-50">
      <button class="w-14 h-14 bg-gradient-to-br from-primary to-primary-container rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center group hover:scale-110 transition-all" data-page-link="home" data-focus-composer="true">
        <span class="material-symbols-outlined text-on-primary text-3xl group-hover:rotate-12 transition-transform" style="font-variation-settings: 'FILL' 1;">bolt</span>
      </button>
    </div>
    ${renderMobileBottomNav("design")}
  `;
}

function renderArtDesignCard(entry) {
  const isWide = entry.variant === "wide";
  const isPoster = entry.variant === "poster";
  const cardClass = isWide ? "art-design-card--wide" : isPoster ? "art-design-card--poster" : "";
  const imageClass = isPoster ? "aspect-[3/4]" : isWide ? "aspect-[16/7]" : "aspect-[4/3]";
  const contentClass = isWide ? "min-h-[170px]" : "min-h-[230px]";
  const media = entry.mediaType === "video"
    ? `<video class="w-full ${imageClass} object-cover opacity-90 group-hover:scale-[1.035] transition-transform duration-700" src="${escapeAttribute(entry.image)}" autoplay muted loop playsinline aria-label="${escapeAttribute(entry.alt)}"></video>`
    : `<img class="w-full ${imageClass} object-cover opacity-90 group-hover:scale-[1.035] transition-transform duration-700" src="${escapeAttribute(entry.image)}" alt="${escapeAttribute(entry.alt)}"/>`;

  return `
    <article class="art-design-card ${cardClass} group rounded-xl overflow-hidden border border-outline-variant/10 bg-surface-container-low hover:border-primary/30 hover:bg-surface-container-highest/40 transition-all cursor-pointer" data-open-url="${escapeAttribute(entry.image)}">
      <div class="relative overflow-hidden bg-surface-container-lowest">
        ${media}
        <div class="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80"></div>
        <div class="absolute left-4 top-4">
          <span class="px-2.5 py-1 rounded bg-background/70 border border-primary/20 text-primary font-label text-[9px] uppercase tracking-widest">${escapeHtml(entry.category)}</span>
        </div>
      </div>
      <div class="p-5 md:p-6 flex flex-col ${contentClass}">
        <h3 class="text-xl md:text-2xl font-headline font-bold tracking-tight text-on-surface mb-3 group-hover:text-primary transition-colors">${escapeHtml(entry.title)}</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-5">${escapeHtml(entry.description)}</p>
        <div class="mt-auto flex flex-wrap gap-2">
          ${entry.tags.map((tag) => `<span class="px-2 py-0.5 rounded bg-surface-container-highest text-gray-300 font-label text-[9px] uppercase tracking-[0.14em]">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
    </article>
  `;
}

function renderHealthPage() {
  return `
    <header class="fixed top-0 w-full z-50 bg-[#121415]/80 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 h-16 w-full shadow-2xl shadow-black/40">
      <div class="text-lg md:text-xl font-bold tracking-tighter text-[#B1D09A] font-['Inter']">JAMES AI</div>
      <nav class="hidden md:flex items-center gap-4 md:gap-8 font-['Inter'] font-bold tracking-tight overflow-x-auto no-scrollbar">
        ${renderPrimaryNavLinks("health", "top")}
      </nav>
      <button class="hover:bg-[#282A2C] transition-all duration-300 p-2 rounded-full scale-95 active:scale-90 transition-transform" data-page-link="home" data-focus-composer="true">
        <span class="material-symbols-outlined text-[#B1D09A]">account_circle</span>
      </button>
    </header>
    <aside class="h-screen w-64 fixed left-0 top-0 border-r border-[#282A2C]/50 bg-[#0C0E10] flex-col pt-20 pb-8 z-40 hidden lg:flex">
      <div class="px-6 mb-10">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded bg-surface-container-high border border-outline-variant/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">health_and_safety</span>
          </div>
          <div>
            <h3 class="text-[#B1D09A] font-bold font-label text-[10px] uppercase tracking-widest leading-none">ACCESSIBILITY</h3>
            <p class="text-gray-500 text-[9px] font-label tracking-tighter">Work Design / Fit</p>
          </div>
        </div>
      </div>
      <nav class="flex-grow space-y-1">
        ${renderPrimaryNavLinks("health", "side")}
      </nav>
      <div class="px-4 mt-auto">
        <button class="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-label text-[10px] font-bold tracking-widest py-3 rounded-lg hover:opacity-90 transition-all uppercase flex items-center justify-center gap-2" data-page-link="home" data-target-mode="health" data-focus-composer="true">
          <span class="material-symbols-outlined text-sm">bolt</span>ASK ASSISTANT
        </button>
      </div>
    </aside>
    <main class="lg:pl-64 pt-16 min-h-screen technical-grid">
      <div class="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-8 py-8 md:py-12 pb-28 md:pb-16">
        <section class="relative overflow-hidden rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-lowest/70 mb-8 md:mb-10">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(177,208,154,0.16),transparent_28%),linear-gradient(135deg,rgba(132,161,111,0.12),transparent_58%)]"></div>
          <div class="relative grid grid-cols-1 xl:grid-cols-12 gap-8 p-6 sm:p-8 md:p-10 xl:p-12 items-end">
            <div class="xl:col-span-7">
              <div class="flex items-center gap-2 mb-5">
                <div class="w-1.5 h-6 bg-primary"></div>
                <span class="font-label text-xs uppercase tracking-[0.3em] text-primary">${escapeHtml(healthProfileIntro.eyebrow)}</span>
              </div>
              <h1 class="text-5xl sm:text-6xl md:text-7xl font-extrabold font-headline tracking-tighter text-on-surface mb-5 md:mb-6 leading-none">${escapeHtml(healthProfileIntro.title)}</h1>
              <p class="text-on-surface-variant text-base sm:text-lg max-w-3xl leading-relaxed">${escapeHtml(healthProfileIntro.summary)}</p>
            </div>
            <article class="xl:col-span-5 rounded-2xl border border-primary/20 bg-surface-container-low p-6 md:p-8 shadow-2xl shadow-black/30">
              <div class="flex items-center gap-3 mb-5">
                <span class="material-symbols-outlined text-primary text-3xl">privacy_tip</span>
                <div>
                  <p class="font-label text-[10px] text-primary uppercase tracking-[0.24em]">BOUNDARY</p>
                  <h2 class="text-2xl font-headline font-extrabold tracking-tighter text-on-surface">Fit, Not Medical Advice</h2>
                </div>
              </div>
              <p class="text-on-surface-variant leading-relaxed">${escapeHtml(healthProfileIntro.boundary)}</p>
            </article>
          </div>
        </section>

        <section class="health-condition-grid">
          ${healthConditions.map((condition) => renderHealthConditionCard(condition)).join("")}
        </section>

        <footer class="mt-16 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex flex-wrap items-center gap-8">
            <div><p class="font-label text-[10px] text-gray-500 uppercase tracking-widest mb-1">DISCLOSED_CONTEXTS</p><p class="text-2xl font-headline font-bold text-on-surface tracking-tighter">${healthConditions.length}</p></div>
            <div><p class="font-label text-[10px] text-gray-500 uppercase tracking-widest mb-1">PRIMARY_GOAL</p><p class="text-2xl font-headline font-bold text-on-surface tracking-tighter">EARLY_FIT</p></div>
            <div><p class="font-label text-[10px] text-gray-500 uppercase tracking-widest mb-1">SOURCE_STYLE</p><p class="text-2xl font-headline font-bold text-on-surface tracking-tighter">LINKED</p></div>
          </div>
          <div class="text-right">
            <p class="font-label text-[10px] text-gray-600 uppercase tracking-[0.2em]">Health context is self-disclosed by James Lane</p>
            <p class="font-label text-[10px] text-gray-700 uppercase tracking-[0.2em] mt-1">Use only when relevant to work design, accommodation, and role fit.</p>
          </div>
        </footer>
      </div>
    </main>
    <div class="hidden md:flex fixed bottom-8 right-8 z-50">
      <button class="w-14 h-14 bg-gradient-to-br from-primary to-primary-container rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center group hover:scale-110 transition-all" data-page-link="home" data-target-mode="health" data-focus-composer="true">
        <span class="material-symbols-outlined text-on-primary text-3xl group-hover:rotate-12 transition-transform" style="font-variation-settings: 'FILL' 1;">bolt</span>
      </button>
    </div>
    ${renderMobileBottomNav("health")}
  `;
}

function renderHealthConditionCard(condition) {
  return `
    <article class="health-condition-card rounded-xl border border-outline-variant/10 bg-surface-container-low p-5 md:p-6 hover:border-primary/30 hover:bg-surface-container-highest/30 transition-all">
      <div class="flex items-start justify-between gap-4 mb-5">
        <div>
          <span class="inline-flex mb-3 px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20 font-label text-[9px] uppercase tracking-widest">${escapeHtml(condition.label)}</span>
          <h2 class="text-2xl md:text-3xl font-headline font-extrabold tracking-tight text-on-surface">${escapeHtml(condition.condition)}</h2>
        </div>
        <span class="material-symbols-outlined text-primary/60">medical_information</span>
      </div>
      <p class="text-on-surface-variant text-sm leading-relaxed mb-4">${escapeHtml(condition.description)}</p>
      <p class="text-on-surface text-sm leading-relaxed mb-5">${escapeHtml(condition.workImpact)}</p>
      <div class="border-t border-outline-variant/10 pt-5 mb-5">
        <p class="font-label text-[10px] uppercase tracking-[0.22em] text-primary mb-3">Best Accommodation Approaches</p>
        <ul class="space-y-3">
          ${condition.accommodations
            .map(
              (item) => `
                <li class="flex gap-3 text-sm text-on-surface-variant leading-relaxed">
                  <span class="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                  <span>${escapeHtml(item)}</span>
                </li>
              `
            )
            .join("")}
        </ul>
      </div>
      <div class="mt-auto">
        <p class="font-label text-[10px] uppercase tracking-[0.22em] text-gray-500 mb-3">Resources</p>
        <div class="flex flex-wrap gap-2">
          ${condition.resources
            .map(
              (resource) => `
                <a class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant hover:text-primary hover:border-primary/30 border border-outline-variant/10 font-label text-[10px] uppercase tracking-[0.14em] transition-colors" href="${escapeAttribute(resource.url)}" target="_blank" rel="noopener noreferrer">
                  ${escapeHtml(resource.label)}
                  <span class="material-symbols-outlined text-[13px]">open_in_new</span>
                </a>
              `
            )
            .join("")}
        </div>
      </div>
    </article>
  `;
}

function renderProjectsPage() {
  const filteredProjects = getFilteredProjects();
  const featured = filteredProjects[0] ?? liveProjects[0];
  const secondary = filteredProjects[1] ?? liveProjects[1];
  const tertiary = filteredProjects[2] ?? liveProjects[2];
  const detail = filteredProjects[3] ?? liveProjects[3];
  const compact = filteredProjects[4] ?? liveProjects[4];
  const highlight = filteredProjects[5] ?? liveProjects[5];
  const supplementalProjects = filteredProjects.slice(6);

  return `
    <header class="fixed top-0 w-full z-50 bg-[#121415]/80 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 h-16 w-full shadow-2xl shadow-black/40">
      <div class="text-lg md:text-xl font-bold tracking-tighter text-[#B1D09A] font-['Inter']">JAMES AI</div>
      <nav class="hidden md:flex items-center gap-4 md:gap-8 font-['Inter'] font-bold tracking-tight overflow-x-auto no-scrollbar">
        ${renderPrimaryNavLinks("projects", "top")}
      </nav>
      <div class="flex items-center gap-4">
        <div class="relative hidden md:flex items-center">
          <span class="material-symbols-outlined absolute right-3 text-gray-500 text-sm">search</span>
          <input class="bg-surface-container-lowest border-none rounded-lg text-xs py-1.5 pl-3 pr-10 focus:ring-1 focus:ring-primary/40 w-48 text-on-surface-variant font-label" placeholder="Profile Lens Search..." type="text" value="${escapeAttribute(pageState.projectQuery)}" data-project-search/>
        </div>
        <button class="hover:bg-[#282A2C] transition-all duration-300 p-2 rounded-full scale-95 active:scale-90 transition-transform" data-page-link="home" data-focus-composer="true">
          <span class="material-symbols-outlined text-[#B1D09A]">account_circle</span>
        </button>
      </div>
    </header>
    <aside class="h-screen w-64 fixed left-0 top-0 border-r border-[#282A2C]/50 bg-[#0C0E10] flex flex-col pt-20 pb-8 z-40 hidden lg:flex">
      <div class="px-6 mb-10">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded bg-surface-container-high border border-outline-variant/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">hub</span>
          </div>
          <div>
            <h3 class="text-[#B1D09A] font-bold font-label text-[10px] uppercase tracking-widest leading-none">CORE IDENTITY</h3>
            <p class="text-gray-500 text-[9px] font-label tracking-tighter">Systems-Oriented Candidate</p>
          </div>
        </div>
      </div>
      <nav class="flex-grow space-y-1">
        ${renderPrimaryNavLinks("projects", "side")}
      </nav>
      <div class="px-4 mt-auto">
        <button class="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-label text-[10px] font-bold tracking-widest py-3 rounded-lg hover:opacity-90 transition-all uppercase mb-6 flex items-center justify-center gap-2" data-page-link="home" data-focus-composer="true">
          <span class="material-symbols-outlined text-sm">bolt</span>ASK ASSISTANT
        </button>
        <div class="space-y-1">
          <a class="flex items-center gap-3 text-gray-600 px-4 py-2 hover:text-gray-400 transition-all font-label text-[10px] uppercase tracking-widest" href="#" data-page-link="home"><span class="material-symbols-outlined text-sm">home</span><span>Nexus</span></a>
          <a class="flex items-center gap-3 text-gray-600 px-4 py-2 hover:text-gray-400 transition-all font-label text-[10px] uppercase tracking-widest" href="#writing" data-page-link="writing"><span class="material-symbols-outlined text-sm">article</span><span>Evolution</span></a>
        </div>
      </div>
    </aside>
    <main class="lg:pl-64 pt-16 min-h-screen">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-5 md:px-8 py-8 md:py-12 pb-28 md:pb-12">
        <header class="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div class="max-w-2xl">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1.5 h-6 bg-primary"></div>
              <span class="font-label text-xs uppercase tracking-[0.3em] text-primary">Identity Subdirectory: core/projects</span>
            </div>
            <h1 class="text-5xl sm:text-6xl md:text-6xl font-extrabold font-headline tracking-tighter text-on-surface mb-5 md:mb-6 leading-none">PROJECT LENS</h1>
            <p class="text-on-surface-variant text-base sm:text-lg max-w-lg leading-relaxed">An interactive profile of James Lane's work, shipped artifacts, and public demos. Search narrows the lens without removing the real project data.</p>
          </div>
          <div class="w-full md:w-auto space-y-4">
            <div class="relative flex items-center md:hidden">
              <span class="material-symbols-outlined absolute right-3 text-gray-500 text-sm">search</span>
              <input class="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-lg text-xs py-3 pl-4 pr-10 focus:ring-1 focus:ring-primary/40 text-on-surface-variant font-label" placeholder="Search projects..." type="text" value="${escapeAttribute(pageState.projectQuery)}" data-project-search/>
            </div>
            <div class="flex w-full md:w-auto items-center gap-4 border border-outline-variant/10 bg-surface-container-lowest/50 backdrop-blur p-1 rounded-xl">
              <button class="flex-1 md:flex-none ${pageState.projectView === "grid" ? "bg-surface-container-high text-primary" : "text-gray-500 hover:text-gray-300"} px-4 py-2 rounded-lg font-label text-xs font-bold tracking-widest" data-project-view="grid">GRID_VIEW</button>
              <button class="flex-1 md:flex-none ${pageState.projectView === "list" ? "bg-surface-container-high text-primary" : "text-gray-500 hover:text-gray-300"} px-4 py-2 rounded-lg font-label text-xs font-bold tracking-widest" data-project-view="list">LIST_VIEW</button>
            </div>
          </div>
        </header>
          ${
            pageState.projectView === "list"
              ? renderProjectList(filteredProjects)
              : `
          <div class="artifacts-grid grid grid-cols-1 gap-5 xl:gap-6">
            ${renderFeaturedProjectCard(featured)}
            ${renderProjectSummaryCard(secondary)}
            ${renderProjectImageCard(tertiary)}
            ${renderProjectDetailCard(detail)}
            ${renderProjectCompactCard(compact)}
            ${renderProjectHighlightCard(highlight)}
          </div>
          ${supplementalProjects.length ? renderSupplementalProjectCards(supplementalProjects) : ""}`
          }
          <footer class="mt-20 pt-10 border-t border-outline-variant/10">
          <div class="flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="flex items-center gap-12">
              <div><p class="font-label text-[10px] text-gray-500 uppercase tracking-widest mb-1">PROJECT_ARTIFACTS</p><p class="text-2xl font-headline font-bold text-on-surface tracking-tighter">${liveProjects.length}</p></div>
              <div><p class="font-label text-[10px] text-gray-500 uppercase tracking-widest mb-1">RESPONSE_FIDELITY</p><p class="text-2xl font-headline font-bold text-on-surface tracking-tighter">SOURCE-BOUND</p></div>
              <div><p class="font-label text-[10px] text-gray-500 uppercase tracking-widest mb-1">VERIFIED_SOURCES</p><p class="text-2xl font-headline font-bold text-on-surface tracking-tighter">${approvedSources.length}</p></div>
            </div>
            <div class="text-right">
              <p class="font-label text-[10px] text-gray-600 uppercase tracking-[0.2em]">Designed &amp; Compiled by James AI Core</p>
              <a class="inline-flex mt-3 font-label text-[10px] text-primary hover:text-on-surface uppercase tracking-[0.2em] transition-colors" href="${GITHUB_URL}" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
              <p class="font-label text-[10px] text-gray-700 uppercase tracking-[0.2em] mt-1">© 2024 THE LIVING INTELLIGENCE. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
    <div class="hidden md:flex fixed bottom-8 right-8 z-50">
      <button class="w-14 h-14 bg-gradient-to-br from-primary to-primary-container rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center group hover:scale-110 transition-all" data-page-link="home" data-focus-composer="true">
        <span class="material-symbols-outlined text-on-primary text-3xl group-hover:rotate-12 transition-transform" style="font-variation-settings: 'FILL' 1;">bolt</span>
      </button>
    </div>
    ${renderMobileBottomNav("projects")}
  `;
}

function renderFeaturedProjectCard(project) {
  const meta = PROJECT_PRESENTATION[project.id] ?? PROJECT_PRESENTATION["living-resume-ai"];

  return `
    <div class="artifact-card artifact-card--feature group relative overflow-hidden glass-panel rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all duration-500 cursor-pointer min-h-[420px] md:min-h-0" data-open-url="${escapeAttribute(project.url)}">
      <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-80"></div>
      <img alt="Dark aesthetic laboratory setting with holographic data projections" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4BS76XUmGNK-oP5g3xraE1xGQ5uvWTCgZjoHYQBhctlwJp-r6Kzf--nXR_WoM21XPVbrulCIJN2hZFIE7I305LM0dKpRo-NDQ4zLpy1H4tAvxuQF0q7CIgI8-YU8IwTsENmjPnLqr91Ohd8_beuenGWsc8-Fsv57cFQg8S7NwAc69iXMNfEu49xdZdbhBRsEMBrq6j6OHsAiX8a2SKQqlPKk3igWCdRgL7ZRJwPhX1pUozeoJv8klYY_FMm9CB4ecJCWmWMAH1rYo"/>
      <div class="absolute bottom-0 left-0 p-7 md:p-8 z-20 w-full min-w-0">
        <div class="flex items-center gap-3 mb-4">
          <span class="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded font-label text-[10px] tracking-widest uppercase">${escapeHtml(meta.emphasis)}</span>
          <span class="text-gray-500 font-label text-[10px] tracking-widest">${escapeHtml(meta.version)}</span>
        </div>
        <h2 class="artifact-title text-3xl xl:text-4xl font-headline font-extrabold text-on-surface mb-3 tracking-tighter">${escapeHtml(project.title)}</h2>
        <p class="text-on-surface-variant max-w-xl mb-5">${escapeHtml(meta.summary)}</p>
        <div class="flex items-center gap-4 xl:gap-6 flex-wrap">
          ${meta.featureBadges.map((badge, index) => `<div class="flex items-center gap-2 text-primary"><span class="material-symbols-outlined text-sm">${["psychology", "build", "auto_awesome"][index] ?? "bolt"}</span><span class="font-label text-[10px] uppercase tracking-widest font-bold">${escapeHtml(badge)}</span></div>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderProjectSummaryCard(project) {
  const meta = PROJECT_PRESENTATION[project.id] ?? PROJECT_PRESENTATION["caa-2026-pbm-regulatory-assistant"];
  return `
    <div class="artifact-card artifact-card--summary glass-panel rounded-xl border border-outline-variant/10 p-6 md:p-7 flex flex-col justify-between hover:bg-surface-container-highest/40 transition-all cursor-pointer min-h-[280px] md:min-h-0" data-open-url="${escapeAttribute(project.url)}">
      <div>
        <div class="flex justify-between items-start mb-6">
          <span class="material-symbols-outlined text-primary text-3xl">${meta.icon}</span>
          <span class="bg-surface-container-highest text-gray-400 px-2 py-1 rounded font-label text-[9px] tracking-widest uppercase">${escapeHtml(meta.emphasis)}</span>
        </div>
        <h3 class="artifact-title text-xl font-headline font-bold text-on-surface mb-2 tracking-tight">${escapeHtml(project.title)}</h3>
        <p class="text-on-surface-variant text-sm font-light leading-relaxed">${escapeHtml(meta.summary)}</p>
      </div>
      <div class="pt-6 mt-6 border-t border-outline-variant/10 flex justify-between items-center">
        <div class="flex -space-x-2"><div class="w-6 h-6 rounded-full border border-background bg-surface-container-highest flex items-center justify-center"><span class="material-symbols-outlined text-[10px]">description</span></div><div class="w-6 h-6 rounded-full border border-background bg-surface-container-highest flex items-center justify-center"><span class="material-symbols-outlined text-[10px]">link</span></div></div>
        <span class="material-symbols-outlined text-primary">arrow_forward</span>
      </div>
    </div>
  `;
}

function renderProjectImageCard(project) {
  const meta = PROJECT_PRESENTATION[project.id] ?? PROJECT_PRESENTATION["blkvue-ai-security-intake-bot"];
  return `
    <div class="artifact-card artifact-card--image glass-panel rounded-xl border border-outline-variant/10 p-6 md:p-7 hover:bg-surface-container-highest/40 transition-all cursor-pointer group min-h-[320px] md:min-h-0" data-open-url="${escapeAttribute(project.url)}">
      <div class="h-32 md:h-28 mb-5 bg-surface-container-lowest rounded-lg overflow-hidden relative">
        <img alt="Profile Lens visual" class="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNd1wlFdIcEyYmVYnTAbEuzmMuyz0yuj1iwfv1XaHKr1ZhggigKkZlZ5jBoemX5kp7PiEBT6Kb5ZHP4tc4WyltYCGJCC1jOLEOCzd-wbyCIO3RX5vhhGwoInYSRYyUpZhZ6p884Dp2e0XL5W3oHu961byWj3Qca6nrDmhpgKvoiLCj2mR4YCFeoNi7Iaf8vOG4PKslOb0Z8HacxU2aXa8mGeTjp9qLEFn9Mol1wSHbFVCBM7pS0bL72i2eMnCkzH8Jf56xouThkc6L"/>
        <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
      </div>
      <div class="flex items-center gap-2 mb-3"><span class="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(177,208,154,0.5)]"></span><span class="font-label text-[10px] uppercase tracking-widest text-primary font-bold">${escapeHtml(meta.emphasis)}</span></div>
      <h3 class="artifact-title text-lg font-headline font-bold text-on-surface mb-2 tracking-tight">${escapeHtml(project.title)}</h3>
      <p class="text-on-surface-variant text-sm font-light leading-relaxed mb-4">${escapeHtml(meta.summary)}</p>
      <div class="flex gap-2 flex-wrap">${meta.featureBadges.slice(0, 2).map((badge) => `<span class="px-2 py-0.5 bg-surface-container-highest text-gray-300 rounded font-label text-[9px]">${escapeHtml(badge.toUpperCase())}</span>`).join("")}</div>
    </div>
  `;
}

function renderProjectDetailCard(project) {
  const meta = PROJECT_PRESENTATION[project.id] ?? PROJECT_PRESENTATION["jameslaneai-com"];
  const detailTitle = escapeHtml(project.title)
    .replace(/([a-z])([A-Z])/g, "$1<wbr>$2")
    .replace(/\./g, "<wbr>.");
  return `
    <div class="artifact-card artifact-card--detail glass-panel rounded-xl border border-outline-variant/10 p-7 md:p-8 flex flex-col justify-between relative cursor-pointer min-h-[420px] md:min-h-0" data-open-url="${escapeAttribute(project.url)}">
      <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
      <div>
        <div class="flex flex-col items-start gap-3 mb-7">
          <div class="p-3 rounded-lg bg-surface-container-highest border border-outline-variant/20"><span class="material-symbols-outlined text-primary text-3xl" style="font-variation-settings: 'FILL' 1;">${meta.icon}</span></div>
          <div>
            <p class="font-label text-[10px] text-gray-500 tracking-widest uppercase">${escapeHtml(meta.emphasis)}</p>
            <h3 class="artifact-title text-lg xl:text-[1.45rem] leading-[1.08] font-headline font-extrabold text-on-surface tracking-tighter break-normal">${detailTitle}</h3>
          </div>
        </div>
        <p class="text-on-surface-variant text-[0.96rem] leading-relaxed mb-7">${escapeHtml(meta.summary)}</p>
        <ul class="space-y-4">${meta.detailBullets.map((bullet) => `<li class="flex items-start gap-3 text-sm text-on-surface font-light"><span class="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">check_circle</span><span class="min-w-0">${escapeHtml(bullet)}</span></li>`).join("")}</ul>
      </div>
      <button class="w-full py-4 border border-outline-variant/30 rounded-lg font-label text-[10px] font-bold tracking-widest text-on-surface hover:bg-surface-container-highest hover:border-primary/50 transition-all uppercase" data-open-url="${escapeAttribute(project.url)}">OPEN_PROJECT</button>
    </div>
  `;
}

function renderProjectCompactCard(project) {
  const meta = PROJECT_PRESENTATION[project.id] ?? PROJECT_PRESENTATION["cruisn-pa"];
  return `
    <div class="artifact-card artifact-card--compact glass-panel rounded-xl border border-outline-variant/10 p-6 md:p-7 flex flex-col justify-between hover:bg-surface-container-highest/40 transition-all cursor-pointer min-h-[280px] md:min-h-0" data-open-url="${escapeAttribute(project.url)}">
      <div>
        <div class="flex items-center gap-2 mb-4"><span class="material-symbols-outlined text-gray-500 text-xl">${meta.icon}</span><span class="text-gray-500 font-label text-[9px] tracking-widest uppercase">${escapeHtml(meta.emphasis)}</span></div>
        <h3 class="artifact-title text-lg font-headline font-bold text-on-surface mb-2 tracking-tight">${escapeHtml(project.title)}</h3>
        <p class="text-on-surface-variant text-sm font-light leading-relaxed">${escapeHtml(meta.summary)}</p>
      </div>
      <div class="flex items-center justify-between mt-4"><div class="flex gap-2"><span class="w-2 h-2 rounded-full bg-[#333537]"></span><span class="w-2 h-2 rounded-full bg-[#333537]"></span><span class="w-2 h-2 rounded-full bg-[#333537]"></span></div><span class="font-label text-[10px] text-primary uppercase">${escapeHtml(meta.shortLabel)}</span></div>
    </div>
  `;
}

function renderProjectHighlightCard(project) {
  const meta = PROJECT_PRESENTATION[project.id] ?? PROJECT_PRESENTATION["iron-shores-playable-demo"];
  const art = meta.art ?? {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Zq4IanyUguwUuEW8UqH97A39cS5pkPzmxuZnIPA1OdBB-TXLwVNSdo1ya_U-b4kXWWn_0aM49ubbN2IeG6O2zcvopzI2qUNhEiykED0w7XRoGBifLs1N8ailT0AlHDOuepeacbUrJXJMnxoxLzLE1W3JMs2cFZh9aWlm4cxj6hnOSr8U6fAOy2p0F0V9lmPZ3U6Usz8pJb-rWhB2LfG_A1DQp7K7lbogPVbgzRLkuWvbD3SWc58Rd4nKwIy5ppqfcDMOf6hDufeX",
    alt: "Abstract project highlight art"
  };
  const highlightActions = meta.highlightActions ?? [];
  return `
    <div class="artifact-card artifact-card--highlight glass-panel rounded-xl border border-outline-variant/10 p-6 md:p-7 flex items-center justify-between gap-6 xl:gap-8 group cursor-pointer min-h-[320px] md:min-h-0" data-open-url="${escapeAttribute(project.url)}">
      <div class="max-w-md min-w-0">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full mb-4"><span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span><span class="font-label text-[10px] text-on-surface-variant tracking-widest uppercase font-bold">${escapeHtml(meta.emphasis)}</span></div>
        <h3 class="artifact-title text-2xl xl:text-3xl font-headline font-extrabold text-on-surface mb-3 tracking-tighter leading-none">${escapeHtml(project.title)}</h3>
        <p class="text-on-surface-variant text-sm font-light leading-relaxed mb-4">${escapeHtml(meta.summary)}</p>
        ${
          highlightActions.length
            ? `<div class="flex gap-4 flex-wrap">
                ${highlightActions
                  .map((action) => renderProjectHighlightAction(action))
                  .join("")}
              </div>`
            : `<div class="flex flex-wrap gap-2">
                ${meta.featureBadges
                  .map(
                    (badge) =>
                      `<span class="px-3 py-1 bg-surface-container-highest text-gray-300 rounded-full font-label text-[9px] uppercase tracking-[0.18em]">${escapeHtml(badge)}</span>`
                  )
                  .join("")}
              </div>`
        }
      </div>
      <div class="hidden md:block w-44 h-44 xl:w-48 xl:h-48 relative shrink-0">
        <div class="absolute inset-0 bg-primary/20 rounded-[2rem] blur-[60px] group-hover:scale-125 transition-transform duration-700"></div>
        <div class="relative w-full h-full glass-panel rounded-[2rem] border border-primary/20 flex items-center justify-center overflow-hidden">
          <img alt="${escapeAttribute(art.alt)}" class="w-full h-full object-cover" src="${escapeAttribute(art.src)}"/>
        </div>
      </div>
    </div>
  `;
}

function renderProjectHighlightAction(action) {
  if (action.type === "page-link") {
    return `<button class="bg-primary text-on-primary px-6 py-2.5 rounded font-label text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-all" data-page-link="${escapeAttribute(action.page)}"${action.targetMode ? ` data-target-mode="${escapeAttribute(action.targetMode)}"` : ""}${action.focusComposer ? ` data-focus-composer="true"` : ""}>${escapeHtml(action.label)}</button>`;
  }

  if (action.type === "open-url") {
    return `<button class="text-on-surface px-6 py-2.5 border border-outline-variant/40 rounded font-label text-[10px] font-bold tracking-widest uppercase hover:bg-surface-container-high transition-all" data-open-url="${escapeAttribute(action.url)}">${escapeHtml(action.label)}</button>`;
  }

  return "";
}

function renderSupplementalProjectCards(projects) {
  return `
    <section class="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6">
      ${projects
        .map((project) => {
          const meta = PROJECT_PRESENTATION[project.id] ?? PROJECT_PRESENTATION["living-resume-ai"];

          return `
            <article class="artifact-card glass-panel rounded-xl border border-outline-variant/10 p-6 md:p-7 min-h-[360px] flex flex-col justify-between hover:border-primary/30 hover:bg-surface-container-highest/40 transition-all cursor-pointer" data-open-url="${escapeAttribute(project.url)}">
              <div>
                <div class="flex items-start justify-between gap-4 mb-8">
                  <span class="material-symbols-outlined text-primary text-3xl">${escapeHtml(meta.icon)}</span>
                  <span class="bg-surface-container-highest text-gray-400 px-2 py-1 rounded font-label text-[9px] tracking-widest uppercase">${escapeHtml(meta.emphasis)}</span>
                </div>
                <h3 class="artifact-title text-xl font-headline font-bold text-on-surface mb-3 tracking-tight">${escapeHtml(project.title)}</h3>
                <p class="text-on-surface-variant text-sm font-light leading-relaxed">${escapeHtml(project.description)}</p>
              </div>
              <div class="pt-6 mt-6 border-t border-outline-variant/10 flex items-center justify-between gap-4">
                <span class="font-label text-[10px] uppercase tracking-widest text-gray-500">${escapeHtml(project.ref)}</span>
                <span class="material-symbols-outlined text-primary">arrow_forward</span>
              </div>
            </article>
          `;
        })
        .join("")}
    </section>
  `;
}

function normalizeEvidenceLine(item) {
  if (!item) {
    return "";
  }

  const trimmed = item.trim();

  if (/^Live link:\s*/i.test(trimmed)) {
    return `The live link is ${trimmed.replace(/^Live link:\s*/i, "")}.`;
  }

  if (/^URL:\s*/i.test(trimmed)) {
    return `The URL is ${trimmed.replace(/^URL:\s*/i, "")}.`;
  }

  if (/^Summary:\s*/i.test(trimmed)) {
    return trimmed.replace(/^Summary:\s*/i, "");
  }

  if (/^Type:\s*/i.test(trimmed)) {
    return trimmed.replace(/^Type:\s*/i, "");
  }

  if (/^Headline:\s*/i.test(trimmed)) {
    return `The headline is "${trimmed.replace(/^Headline:\s*/i, "")}".`;
  }

  if (/^Date:\s*/i.test(trimmed)) {
    return `It is dated ${trimmed.replace(/^Date:\s*/i, "")}.`;
  }

  if (/^Demonstrates:\s*/i.test(trimmed)) {
    return `It demonstrates ${trimmed.replace(/^Demonstrates:\s*/i, "")}`;
  }

  return trimmed.endsWith(".") ? trimmed : `${trimmed}.`;
}

function extractMatchUrl(match) {
  for (const item of match.items) {
    const urlMatch = item.match(/https?:\/\/[^\s)]+/i);
    if (urlMatch) {
      return urlMatch[0];
    }
  }

  return "";
}

function getPageFromHash() {
  const hash = window.location.hash.replace(/^#/, "").trim().toLowerCase();
  if (hash === "evidence") {
    return "contact";
  }
  if (hash === "writing" || hash === "contact" || hash === "projects" || hash === "design" || hash === "health") {
    return hash;
  }
  return "home";
}

function deriveModeSupportTags(mode) {
  const tagMap = {
    profile: ["Nontraditional Candidate", "Systems Thinker", "Learns By Building"],
    fit: ["Strong Fit Signals", "Stretch Fit Framing", "Mismatch Risk"],
    evidence: ["Source Grounded", "Build Pattern", "Practical Reasoning"],
    projects: ["Live Projects", "Shipped Work", "Public Demos"],
    writing: ["Published Essays", "AI Analysis", "Public Argument"],
    health: ["Self-Disclosed Context", "Accommodation Fit", "Source Links"],
    resume: ["Current Role", "Enterprise Background", "Tools And Platforms"]
  };

  return tagMap[mode.id] ?? mode.briefingCards.map((card) => card.eyebrow).slice(0, 3);
}

function renderProjectList(projects) {
  return `
    <div class="flex flex-col gap-6">
      ${projects
        .map((project, index) => {
          const meta =
            PROJECT_PRESENTATION[project.id] ??
            PROJECT_PRESENTATION[Object.keys(PROJECT_PRESENTATION)[index % Object.keys(PROJECT_PRESENTATION).length]];

          return `
            <div class="glass-panel rounded-xl border border-outline-variant/10 p-6 md:p-8 hover:border-primary/30 hover:bg-surface-container-highest/40 transition-all cursor-pointer" data-open-url="${escapeAttribute(project.url)}">
              <div class="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div class="max-w-3xl">
                  <div class="flex flex-wrap items-center gap-3 mb-4">
                    <span class="material-symbols-outlined text-primary text-2xl">${escapeHtml(meta.icon)}</span>
                    <span class="font-label text-[10px] uppercase tracking-widest text-primary font-bold">${escapeHtml(meta.emphasis)}</span>
                    <span class="font-label text-[10px] uppercase tracking-widest text-gray-500">${escapeHtml(meta.version)}</span>
                  </div>
                  <h3 class="text-2xl font-headline font-bold text-on-surface tracking-tight mb-3">${escapeHtml(project.title)}</h3>
                  <p class="text-on-surface-variant text-sm md:text-base leading-relaxed mb-4">${escapeHtml(project.description)}</p>
                  <div class="flex flex-wrap gap-2">
                    ${meta.featureBadges
                      .map(
                        (badge) => `<span class="px-2 py-1 bg-surface-container-highest text-gray-300 rounded font-label text-[9px] uppercase tracking-widest">${escapeHtml(badge)}</span>`
                      )
                      .join("")}
                  </div>
                </div>
                <div class="md:text-right md:min-w-[220px]">
                  <div class="font-label text-[10px] uppercase tracking-widest text-gray-500 mb-2">${escapeHtml(project.ref)}</div>
                  <div class="text-primary font-label text-xs uppercase tracking-widest font-bold">${project.url.includes("github.com") ? "Open Repo" : "Open Live Project"}</div>
                </div>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function modeProgress(modeId) {
  return {
    profile: 85,
    fit: 76,
    evidence: 92,
    projects: 88,
    writing: 81,
    health: 79,
    resume: 73
  }[modeId] ?? 80;
}

function getSortedWritingEntries() {
  const entries = [...writingPortfolio];

  if (pageState.writingSort === "complexity") {
    return entries.sort((left, right) => writingComplexity(right) - writingComplexity(left));
  }

  return entries.sort((left, right) => parseDateLabel(right.dateLabel) - parseDateLabel(left.dateLabel));
}

function writingComplexity(entry) {
  const categoryBoost =
    entry.category === "AI analysis"
      ? 5
      : entry.category === "Personal-political essay"
        ? 4
        : entry.category === "Political essay"
          ? 3
          : 2;

  return categoryBoost * 10 + entry.demonstrates.length;
}

function complexityLabel(entry) {
  const score = writingComplexity(entry);
  if (score >= 50) return "0.89 / Alpha";
  if (score >= 40) return "0.76 / Beta";
  if (score >= 30) return "0.64 / Gamma";
  return "0.51 / Delta";
}

function readTimeLabel(entry) {
  const words =
    entry.description.split(/\s+/).length +
    entry.demonstrates.join(" ").split(/\s+/).length * 12 +
    (entry.headline ? entry.headline.split(/\s+/).length : 0);
  return `${Math.max(3, Math.round(words / 40))} MIN`;
}

function complexityDots(entry) {
  const score = Math.min(5, Math.max(1, Math.round(writingComplexity(entry) / 12)));
  return Array.from({ length: 5 }, (_, index) => index < score);
}

function buildTrendingVectors(entries) {
  const counts = new Map();
  for (const entry of entries) {
    const normalizedTag = entry.category.replace(/[^a-z0-9]+/gi, "_").toUpperCase();
    counts.set(normalizedTag, (counts.get(normalizedTag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 3)
    .map(([tag, count]) => ({ tag, count }));
}

function paginateEntries(entries, size) {
  const pages = [];
  for (let index = 0; index < entries.length; index += size) {
    pages.push(entries.slice(index, index + size));
  }
  return pages.length ? pages : [[]];
}

function fallbackEvidenceMatches() {
  const session = pageState.sessions[pageState.modeId];
  return session?.lastMatches ?? [];
}

function sourceGroupBreakdown(matches) {
  const raw = {};
  for (const match of matches) {
    const source = sourceCorpus.find((entry) => entry.id === match.ref);
    const group = source?.group ?? "resume-pdf";
    raw[group] = (raw[group] ?? 0) + 1;
  }
  const total = Object.values(raw).reduce((sum, value) => sum + value, 0) || 1;
  return Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, Math.round((value / total) * 100)]));
}

function buildEvidenceBars(groupBreakdown) {
  const values = Object.values(groupBreakdown);
  if (!values.length) {
    return [35, 45, 30, 55, 70, 52, 40];
  }
  return Array.from({ length: 7 }, (_, index) => {
    const value = values[index % values.length];
    return Math.max(20, Math.min(100, value));
  });
}

function sourceGroupLabel(group) {
  return {
    "resume-pdf": "RESUME_DOCS",
    "projects-catalog": "PROJECTS",
    "writing-corpus": "WRITING",
    "writing-supporting-analysis": "ANALYSIS",
    "writing-catalog": "WRITING_INDEX"
  }[group] ?? "OTHER";
}

function deriveEvidenceLabel(match, index) {
  const source = sourceCorpus.find((entry) => entry.id === match.ref);
  const group = source?.group ?? "resume-pdf";
  const prefix =
    {
      "resume-pdf": "CASE STUDY",
      "projects-catalog": "LIVE PROJECT",
      "writing-corpus": "WRITING",
      "writing-supporting-analysis": "ANALYSIS",
      "writing-catalog": "INDEX"
    }[group] ?? "SOURCE";
  return `${prefix} ${String(index + 1).padStart(2, "0")}`;
}

function getFilteredProjects() {
  const query = pageState.projectQuery.trim().toLowerCase();
  if (!query) {
    return liveProjects;
  }
  const filtered = liveProjects.filter((project) => {
    const haystack = `${project.title} ${project.description} ${project.ref}`.toLowerCase();
    return haystack.includes(query);
  });
  return filtered.length ? filtered : liveProjects;
}

function parseDateLabel(label) {
  const value = Date.parse(label);
  return Number.isNaN(value) ? 0 : value;
}

function truncate(value, length) {
  if (!value || value.length <= length) {
    return value ?? "";
  }
  return `${value.slice(0, Math.max(0, length - 3))}...`;
}

function renderPrimaryNavLinks(activePage, variant = "top") {
  const items = [
    { page: "home", label: "Nexus" },
    { page: "writing", label: "Evolution" },
    { page: "projects", label: "Artifacts" },
    { page: "design", label: "Design" },
    { page: "health", label: "Health" },
    { page: "contact", label: "Contact" }
  ];

  if (variant === "top") {
    return items
      .map((item) => {
        const active = item.page === activePage;
        return `<a class="${active ? "text-[#B1D09A] border-b-2 border-[#B1D09A] pb-1" : "text-[#E2E2E5]/60 hover:text-[#B1D09A]"} transition-all duration-300" href="${item.page === "home" ? "#" : `#${item.page}`}" data-page-link="${item.page}">${item.label}</a>`;
      })
      .join("");
  }

  if (variant === "side") {
    return items
      .map((item) => {
        const active = item.page === activePage;
        return `<a class="flex items-center gap-3 ${active ? "bg-[#121415] text-[#B1D09A] border-l-4 border-[#B1D09A]" : "text-gray-500 hover:bg-[#282A2C]"} px-6 py-3 transition-all font-label text-xs uppercase tracking-widest" href="${item.page === "home" ? "#" : `#${item.page}`}" data-page-link="${item.page}"><span class="material-symbols-outlined text-sm">${primaryPageIcon(item.page)}</span>${item.label}</a>`;
      })
      .join("");
  }

  return "";
}

function renderMobileBottomNav(activePage) {
  const items = [
    { page: "home", label: "Nexus", shortLabel: "NEXUS" },
    { page: "writing", label: "Evolution", shortLabel: "EVO" },
    { page: "projects", label: "Artifacts", shortLabel: "ART" },
    { page: "design", label: "Design", shortLabel: "DES" },
    { page: "health", label: "Health", shortLabel: "HLTH" },
    { page: "contact", label: "Contact", shortLabel: "CONT" }
  ];

  return `
    <div class="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-high border-t border-outline-variant/10 px-2 py-3 flex justify-around items-center z-50">
      ${items
        .map((item) => {
          const active = item.page === activePage;
          return `
            <div class="flex flex-col items-center gap-1 ${active ? "text-primary" : "text-gray-500"} min-w-[54px]" data-page-link="${item.page}">
              <span class="material-symbols-outlined" ${active ? 'style="font-variation-settings: \'FILL\' 1;"' : ""}>${primaryPageIcon(item.page)}</span>
              <span class="text-[9px] font-label uppercase">${item.shortLabel}</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function primaryPageIcon(page) {
  switch (page) {
    case "home":
      return "home";
    case "writing":
      return "article";
    case "projects":
      return "hub";
    case "design":
      return "palette";
    case "health":
      return "health_and_safety";
    case "contact":
      return "contact_mail";
    default:
      return "apps";
  }
}

function renderRichText(value) {
  return escapeHtml(value)
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}
