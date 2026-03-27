import "./styles.css";
import {
  approvedSources,
  assistantName,
  refusalMessage
} from "./data/resumeCorpus.js";
import { liveProjects } from "./data/liveProjects.js";
import { profileModes } from "./data/profileModes.js";
import { portfolioMedia } from "./data/portfolioMedia.js";
import { askAssistant } from "./lib/retrieval.js";
import { synthesize } from "./lib/synthesizer.js";

function createInitialSession(mode) {
  return {
    turns: [
      {
        role: "assistant",
        content: mode.welcomeMessage
      }
    ],
    latestMatches: []
  };
}

const state = {
  activeMode: profileModes[0].id,
  sessions: Object.fromEntries(profileModes.map((mode) => [mode.id, createInitialSession(mode)]))
};

function getActiveMode() {
  return profileModes.find((mode) => mode.id === state.activeMode) ?? profileModes[0];
}

function getCurrentSession() {
  return state.sessions[state.activeMode];
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function linkifyText(value) {
  const escaped = escapeHtml(value);

  return escaped.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noreferrer">$1</a>'
  );
}

function renderModeTabs() {
  return profileModes
    .map(
      (mode) => `<button
        class="mode-tab${mode.id === state.activeMode ? " is-active" : ""}"
        type="button"
        data-mode="${escapeHtml(mode.id)}"
      >${escapeHtml(mode.label)}</button>`
    )
    .join("");
}

function renderStarterQuestions(mode) {
  const chips = mode.starterQuestions
    .slice(0, 3)
    .map(
      (question) =>
        `<button class="starter-chip" type="button" data-question="${escapeHtml(question)}">${escapeHtml(
          question
        )}</button>`
    )
    .join("");

  const shortcuts = [];

  if (mode.id === "projects") {
    shortcuts.push(
      '<button class="starter-chip starter-chip-secondary" type="button" data-scroll="live-projects">Live Projects</button>',
      '<button class="starter-chip starter-chip-secondary" type="button" data-scroll="portfolio-examples">Portfolio Examples</button>'
    );
  }

  return `${chips}${shortcuts.join("")}`;
}

function renderFocusCard(mode) {
  const [primary, ...secondary] = mode.briefingCards;

  return `<article class="focus-card">
    <div class="focus-meta">
      <div>
        <div class="focus-eyebrow">${escapeHtml(primary.eyebrow)}</div>
        <h3>${escapeHtml(primary.title)}</h3>
      </div>
      <div class="focus-ref">${escapeHtml(primary.ref)}</div>
    </div>
    <p>${escapeHtml(primary.body)}</p>
    <div class="focus-support">
      ${secondary
        .map(
          (card) => `<span class="support-pill" title="${escapeHtml(card.ref)}">${escapeHtml(card.title)}</span>`
        )
        .join("")}
    </div>
  </article>`;
}

function renderPortfolioGallery() {
  if (getActiveMode().id !== "projects") {
    return "";
  }

  return `<section class="portfolio-gallery" id="portfolio-examples">
    <div class="portfolio-gallery-header">
      <div>
        <div class="meta-label">Portfolio Examples</div>
        <h3>Hosted Iron Tides media</h3>
      </div>
      <p>Direct media examples hosted with James AI.</p>
    </div>
    <div class="portfolio-grid">
      ${portfolioMedia
        .map(
          (item) => `<article class="portfolio-card">
            <video controls preload="metadata" src="${escapeHtml(item.url)}"></video>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <a class="portfolio-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Open media</a>
          </article>`
        )
        .join("")}
    </div>
  </section>`;
}

function renderProjectsGallery() {
  if (getActiveMode().id !== "projects") {
    return "";
  }

  return `<section class="portfolio-gallery" id="live-projects">
    <div class="portfolio-gallery-header">
      <div>
        <div class="meta-label">Live Projects</div>
        <h3>Resume-linked live demos and sites</h3>
      </div>
      <p>These links come directly from the approved resume and are intended as quick review paths for visitors.</p>
    </div>
    <div class="portfolio-grid">
      ${liveProjects
        .map(
          (item) => `<article class="portfolio-card project-card">
            <div class="project-card-header">
              <div class="meta-label">Live Project</div>
              <div class="focus-ref">${escapeHtml(item.ref)}</div>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <a class="portfolio-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Open live project</a>
            <div class="project-url">${linkifyText(item.url)}</div>
          </article>`
        )
        .join("")}
    </div>
  </section>`;
}

function renderTurns() {
  return getCurrentSession().turns
    .map((turn) => {
      const lines = turn.content.split("\n");
      const paragraphs = lines.map((line) => `<p>${linkifyText(line)}</p>`).join("");

      return `<article class="message message-${turn.role}">
        <div class="message-label">${turn.role === "assistant" ? "Assistant" : "You"}</div>
        <div class="message-body">${paragraphs}</div>
      </article>`;
    })
    .join("");
}

function renderSources() {
  const session = getCurrentSession();
  const mode = getActiveMode();
  const emptyMessage =
    mode.id === "projects"
      ? "Approved source sections for the latest projects answer will appear here."
      : "Approved source sections for the latest in-scope answer will appear here.";

  const latestEvidence =
    session.latestMatches.length === 0
      ? `<div class="source-empty">${escapeHtml(emptyMessage)}</div>`
      : session.latestMatches
          .map(
            (match) => `<article class="source-card">
              <div class="source-meta">${escapeHtml(match.referenceLabel)} | ${escapeHtml(match.sourceLabel)}</div>
              <h3>${escapeHtml(match.title)}</h3>
              <ul>
                ${match.items.map((item) => `<li>${linkifyText(item)}</li>`).join("")}
              </ul>
            </article>`
          )
          .join("");

  if (mode.id === "projects") {
    return `${renderProjectsGallery()}${renderPortfolioGallery()}${latestEvidence}`;
  }

  return latestEvidence;
}

function renderApp() {
  const root = document.querySelector("#app");
  const mode = getActiveMode();

  root.innerHTML = `
    <main class="app-shell">
      <section class="hero-card">
        <div class="eyebrow">Beyond the Resume</div>
        <h1>${assistantName}</h1>
        <p class="hero-copy">An interactive profile of James Lane's experience, work, and capabilities.</p>
        <div class="hero-note">Grounded in ${approvedSources.length} approved source files. The active lens shapes retrieval, but never expands beyond the approved corpus.</div>
      </section>
      <section class="workspace">
        <section class="chat-panel">
          <header class="panel-header panel-header-tight content-band content-band-shell">
            <div>
              <h2>${escapeHtml(mode.panelTitle)}</h2>
              <p>${escapeHtml(mode.description)}</p>
            </div>
            <div class="mode-row">${renderModeTabs()}</div>
          </header>
          <section class="content-band content-band-contrast">
            ${renderFocusCard(mode)}
            <div class="starter-row">${renderStarterQuestions(mode)}</div>
          </section>
          <section class="content-band content-band-silver conversation-band">
            <div class="conversation-scroll">${renderTurns()}</div>
          </section>
          <form class="composer content-band content-band-light" id="composer">
            <label class="composer-label" for="question">Question</label>
            <textarea
              id="question"
              name="question"
              rows="3"
              placeholder="${escapeHtml(mode.placeholder)}"
            ></textarea>
            <div class="composer-footer">
              <div class="composer-note">Enter submits. Shift+Enter adds a newline.</div>
              <button class="submit-button" type="submit">Ask Assistant</button>
            </div>
          </form>
        </section>
        <aside class="sources-panel">
          <header class="panel-header content-band content-band-shell">
            <div>
              <h2>${mode.id === "projects" ? "Live Projects and Media" : mode.id === "evidence" ? "Evidence for Latest Answer" : "Evidence for Latest Answer"}</h2>
              <p>${mode.id === "projects" ? "Resume-linked live project cards, hosted media, and the approved sections used for the latest projects answer appear here." : "Only the approved sections used for the latest in-scope answer are shown here."}</p>
            </div>
          </header>
          <section class="content-band content-band-silver sources-band">
            <div class="sources-scroll">${renderSources()}</div>
          </section>
          <div class="policy-card policy-card-muted">
            <div class="meta-label">Source boundary</div>
            <p>${escapeHtml(refusalMessage)}</p>
          </div>
        </aside>
      </section>
    </main>
  `;

  const textarea = document.querySelector("#question");
  const form = document.querySelector("#composer");

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.mode === state.activeMode) {
        return;
      }

      state.activeMode = button.dataset.mode;
      renderApp();
      document.querySelector("#question")?.focus();
    });
  });

  document.querySelectorAll("[data-question]").forEach((button) => {
    button.addEventListener("click", () => {
      textarea.value = button.dataset.question;
      textarea.focus();
    });
  });

  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(`#${button.dataset.scroll}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  textarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const question = textarea.value.trim();
    if (!question) {
      return;
    }

    const activeMode = getActiveMode();
    const session = getCurrentSession();
    const priorHistory = [...session.turns];
    session.turns.push({ role: "user", content: question });
    session.turns.push({ role: "assistant", content: "..." });
    session.latestMatches = [];
    renderApp();

    const response = askAssistant(question, priorHistory, {
      modeId: activeMode.id,
      preferredIntent: activeMode.defaultIntent
    });

    let answerText;
    if (response.refused) {
      answerText = response.answer;
      session.latestMatches = [];
    } else {
      answerText = await synthesize(question, response.matches, {
        mode: {
          id: activeMode.id,
          label: activeMode.label,
          answerStyle: activeMode.answerStyle,
          panelTitle: activeMode.panelTitle
        }
      });
      session.latestMatches = response.matches;
    }

    session.turns[session.turns.length - 1].content = answerText;
    renderApp();

    const nextTextarea = document.querySelector("#question");
    nextTextarea?.focus();
  });
}

renderApp();
