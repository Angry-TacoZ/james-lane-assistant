const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const approvedSourceAllowlist = require("./approved-source-allowlist.json");

const anthropicKey = defineSecret("ANTHROPIC_API_KEY");
const ALLOWED_ORIGINS = new Set([
  "https://jamesai.space",
  "https://www.jamesai.space",
  "https://james-lane-web-resume.web.app"
]);
const MAX_QUESTION_CHARS = 500;
const MAX_MATCHES = 8;
const MAX_ITEMS_PER_MATCH = 8;
const MAX_ITEM_CHARS = 800;
const MAX_REF_CHARS = 180;
const MAX_SOURCE_LABEL_CHARS = 80;
const MAX_TITLE_CHARS = 160;
const MAX_REQUEST_BYTES = 32000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 25;
const rateLimitBuckets = new Map();
const approvedMatchesByRef = new Map(Object.entries(approvedSourceAllowlist.refs || {}));

const BAD_META_RESPONSE_PATTERN = /\b(incomplete|cut off|truncated|partially visible|missing or cut off|need the full text|full text of that document|additional source material|more of the document|need source material|need more source|need a specific example|need.*specific example|to give.*meaningful example|source material.*specific example|source material.*concrete example)\b/i;
const BAD_PROJECT_DENIAL_PATTERN = /\b(does not contain (any )?information about|cannot answer this question from the approved|can't answer this question from the approved)\b/i;
const BAD_ROLEFIT_DEFERRAL_PATTERN = /\b(doesn['’]?t establish .* fit|cannot assess fit directly|can['’]?t assess fit directly|approved sources do not define the role requirements|doesn['’]?t define (that|the) position['’]?s .*requirements)\b/i;
const PROJECT_NAME_PATTERNS = [
  /\bliving resume ai\b/i,
  /\bliving resume\b/i,
  /\bcbc proposal faq assistant\b/i,
  /\blegitimate question response index\b/i,
  /\blqri\b/i,
  /\bcaa 2026 pbm regulatory assistant\b/i,
  /\bblkvue ai security intake bot\b/i,
  /\bjameslaneai\.com\b/i,
  /\bcogfit jobs\b/i,
  /\bcogfit-jobs\.web\.app\b/i,
  /\bmasters of metal\b/i,
  /\biron shores\b/i,
  /\biron tides\b/i
];
const WRITING_NAME_PATTERNS = [
  /\bdon['’]?t be duped by government propaganda\b/i,
  /\bthe constitution needs you\b/i,
  /\bvengeance is best not served at all\b/i,
  /\bis it 2025 or 1857\b/i,
  /\ball lives matter except for palestinians\b/i,
  /\bet tu,? mom\b/i,
  /\bode to miata\b/i,
  /\bp\(doom\) or big boon\b/i,
  /\bp doom or big boon\b/i
];

function fallbackFormat(retrievedMatches) {
  return retrievedMatches
    .map((match) => {
      const bullets = match.items.map((item) => `- ${item}`).join("\n");
      return `${match.title}\n${bullets}\n[${match.ref || match.title}]`;
    })
    .join("\n");
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function applyCors(req, res) {
  const origin = req.get("origin");
  if (ALLOWED_ORIGINS.has(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
  }
  res.set("Vary", "Origin");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  return origin;
}

function isAllowedBrowserOrigin(req) {
  const origin = req.get("origin");
  return ALLOWED_ORIGINS.has(origin);
}

function isAllowedHost(req) {
  const host = req.get("x-forwarded-host") || req.get("host") || "";
  return /^(jamesai\.space|www\.jamesai\.space|james-lane-web-resume\.web\.app)$/i.test(host);
}

function isAllowedFetchMetadata(req) {
  const fetchSite = req.get("sec-fetch-site");
  if (!fetchSite) {
    return false;
  }
  return fetchSite === "same-origin" || fetchSite === "same-site";
}

function getClientKey(req) {
  return req.ip || req.socket?.remoteAddress || "unknown";
}

function isRateLimited(req) {
  const now = Date.now();
  const clientKey = getClientKey(req);
  const existing = rateLimitBuckets.get(clientKey);

  if (!existing || now - existing.startedAt >= RATE_LIMIT_WINDOW_MS) {
    rateLimitBuckets.set(clientKey, { startedAt: now, count: 1 });
    return false;
  }

  existing.count += 1;
  return existing.count > MAX_REQUESTS_PER_WINDOW;
}

function cleanupRateLimitBuckets() {
  const now = Date.now();
  for (const [key, bucket] of rateLimitBuckets.entries()) {
    if (now - bucket.startedAt >= RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitBuckets.delete(key);
    }
  }
}

function isValidMatch(match) {
  const approvedMatch = match?.ref ? approvedMatchesByRef.get(match.ref) : null;
  const approvedItems = approvedMatch ? new Set(approvedMatch.items) : null;

  return (
    match &&
    typeof match === "object" &&
    typeof match.ref === "string" &&
    match.ref.length <= MAX_REF_CHARS &&
    Boolean(approvedMatch) &&
    typeof match.title === "string" &&
    match.title.length <= MAX_TITLE_CHARS &&
    match.title === approvedMatch.title &&
    typeof match.sourceLabel === "string" &&
    match.sourceLabel.length <= MAX_SOURCE_LABEL_CHARS &&
    match.sourceLabel === approvedMatch.sourceLabel &&
    typeof match.referenceLabel === "string" &&
    match.referenceLabel === approvedMatch.referenceLabel &&
    Array.isArray(match.items) &&
    match.items.length <= MAX_ITEMS_PER_MATCH &&
    match.items.every((item) => typeof item === "string" && item.length <= MAX_ITEM_CHARS && approvedItems.has(item.trim()))
  );
}

async function requestAnthropic({ apiKey, system, userMessage, maxAttempts = 3 }) {
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system,
        messages: [{ role: "user", content: userMessage }]
      })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        ok: true,
        text: data.content?.find((block) => block.type === "text")?.text ?? null
      };
    }

    const errorText = await response.text();
    const isRetryable = response.status === 529 || /overloaded/i.test(errorText);
    lastError = {
      status: response.status,
      text: errorText
    };

    console.error("Anthropic API error:", response.status, errorText);

    if (!isRetryable || attempt === maxAttempts) {
      break;
    }

    await delay(350 * attempt);
  }

  return {
    ok: false,
    error: lastError
  };
}

function getModePrompt(mode) {
  if (!mode || !mode.id) {
    return "Answer in a compact professional style rather than a checklist unless the question clearly calls for a list.";
  }

  if (mode.id === "profile") {
    return `${mode.answerStyle || "Start with a compact professional synthesis."}
- Treat the answer as a professional profile interpretation, not a FAQ extract.
- You may connect recurring patterns across multiple matched sections when that interpretation is directly supported by the provided excerpts.
- Prefer phrasing like "the sources portray," "the sources suggest," or "taken together, the sources point to" when you are synthesizing across excerpts.
- If the user asks whether James can do a kind of work, answer with the strongest documented capabilities and one or two concrete examples from the matched excerpts before naming any limits.
- Prefer one or two short paragraphs over bullet lists unless bullets are materially clearer.`;
  }

  if (mode.id === "fit") {
    return `${mode.answerStyle || "Give the fit conclusion first."}
- If the question is broad, identify the strongest fit pattern or likely fit class first.
- If the question is too abstract to fully resolve, still give the best conditional fit judgment the sources support first, then note what would narrow it further.
- Do not answer broad fit questions by only reciting category definitions if the matched sources support a more concrete role-family answer.
- If the matched excerpts include concrete resume evidence such as tools, process skills, analytics work, or documented role experience, use that evidence in the fit judgment instead of speaking only at the abstract profile level.
- You may give a best-supported interpretation of likely fit when multiple excerpts point in the same direction, as long as you state any meaningful limits that remain.
- If direct role proof is missing but the excerpts support adjacent evidence, give the conditional fit judgment instead of defaulting to "the sources do not establish this at all."
- Separate what is directly documented from what is a reasonable role-fit inference and from what remains unknown.
- Do not make missing exact role requirements the lead sentence if the excerpts support a conditional fit judgment.
- If the question mentions other candidates, college degrees, or credentials, do not compare unknown people. Instead, explain James's documented value, nontraditional-background framing, and any limits the approved sources establish.`;
  }

  if (mode.id === "evidence") {
    return `${mode.answerStyle || "Lead with the evidence pattern."}
- Lead with what the evidence most strongly shows, then cite the strongest examples.
- When the question is about AI, process improvement, workflow improvement, or business-facing evidence, prioritize the approved internal proposal, assistant, legislation-grounded, and workflow-tool examples before creative or game-development experimentation unless the question explicitly asks about game work.
- Avoid turning the answer into a long inventory unless the user explicitly asks for a full list.`;
  }

  if (mode.id === "projects") {
    return `${mode.answerStyle || "Lead with the most relevant live project."}
- Lead with the most relevant live project, demo, or hosted media example instead of speaking abstractly about the portfolio.
- If the matched excerpts contain a live link or hosted media URL, include it directly in the answer.
- Briefly explain what the project demonstrates, especially if it shows stakeholder-facing AI work, workflow improvement, hiring artifacts, or playable/public demo execution.
- If the user asks what to review first, name the strongest one or two options rather than listing everything.
- If the user names a specific project and the matched excerpts explicitly name that same project, answer from those excerpts directly and do not claim the approved sources lack information about it.
- If the matched excerpts are hosted media entries rather than a full project writeup, explain that those hosted clips are the approved project evidence currently available.`;
  }

  if (mode.id === "writing") {
    return `${mode.answerStyle || "Lead with the most relevant article or writing pattern."}
- Treat Medium pieces as published public writing and opinion analysis that James chose to publish.
- Do not describe published essays as hidden internal cognition, private thoughts, or profile truth beyond what the writing explicitly says.
- If the matched excerpts are the ChatGPT-linked memo, describe it as supporting analysis or research context, not as a James-authored Medium article.
- If the user asks what James has written, lead with the catalog or the strongest relevant article and include the live article link when present.
- If the user asks what a specific piece is about, answer from that piece directly and make the public-writing boundary explicit only if it is relevant to the question.`;
  }

  if (mode.id === "resume") {
    return `${mode.answerStyle || "Answer directly and factually."}
- Answer factually and directly with minimal framing.
- If multiple resume facts are relevant, group them into one compact answer instead of a checklist.`;
  }

  return mode.answerStyle || "Answer in a compact professional style rather than a checklist unless the question clearly calls for a list.";
}

function hasNamedProjectEvidence(question, matches) {
  const sourceText = matches
    .map((match) => `${match.title}\n${match.items.join("\n")}`)
    .join("\n")
    .toLowerCase();

  return PROJECT_NAME_PATTERNS.some((pattern) => pattern.test(question) && pattern.test(sourceText));
}

function hasNamedWritingEvidence(question, matches) {
  const sourceText = matches
    .map((match) => `${match.title}\n${match.items.join("\n")}`)
    .join("\n")
    .toLowerCase();

  return WRITING_NAME_PATTERNS.some((pattern) => pattern.test(question) && pattern.test(sourceText));
}

exports.synthesize = onRequest(
  { secrets: [anthropicKey], maxInstances: 2, concurrency: 10, timeoutSeconds: 30 },
  async (req, res) => {
    applyCors(req, res);

    if (req.method === "OPTIONS") {
      res.status(isAllowedBrowserOrigin(req) ? 204 : 403).send("");
      return;
    }

    if (!isAllowedBrowserOrigin(req) || !isAllowedHost(req) || !isAllowedFetchMetadata(req)) {
      res.status(403).json({ error: "Forbidden origin" });
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    if (Number(req.get("content-length") || "0") > MAX_REQUEST_BYTES) {
      res.status(413).json({ error: "Request too large" });
      return;
    }

    cleanupRateLimitBuckets();
    if (isRateLimited(req)) {
      res.status(429).json({ error: "Too many requests" });
      return;
    }

    const { question, matches, mode } = req.body;

    if (
      typeof question !== "string" ||
      question.length > MAX_QUESTION_CHARS ||
      !Array.isArray(matches) ||
      matches.length === 0 ||
      matches.length > MAX_MATCHES ||
      !matches.every(isValidMatch)
    ) {
      res.status(400).json({ error: "Missing question or matches" });
      return;
    }

    const SYSTEM_PROMPT = `You are James AI, an employer-facing assistant that represents James Lane.

Your only job is to synthesize the SOURCE MATERIAL below into a clear, conversational response.

STRICT RULES:
- Use ONLY facts present in the SOURCE MATERIAL. Do not add, invent, or rely on outside knowledge.
- You may synthesize and interpret relationships between the provided facts when that interpretation is directly supported by multiple excerpts.
- When an answer includes interpretation rather than a bare fact, keep it anchored with language like "the sources suggest," "the sources portray," or "taken together, the sources indicate."
- If the source material does not contain enough information to answer, say so plainly.
- Speak in third person about James Lane.
- Be direct, plain English, concise but complete.
- Include tradeoffs and limitations honestly - do not oversell.
- Do not use words like: exceptional, brilliant, visionary, passionate, rockstar, dynamic.
- Do not add qualifications or achievements not present in the source material.
- Do not simulate intimacy or act as James Lane in first person.
- Keep responses under 200 words unless the question genuinely requires more.
- When the source material refers to political or politically managed workplace environments, interpret that as internal workplace or organizational politics unless a government or public-policy context is explicitly stated in the source.
- If the source material explicitly lists strengths, value factors, or capabilities that are relevant to the question, name those factors directly.
- Do not say the source material fails to specify factors if those factors are explicitly present in the matched source material.
- If the source material does not establish whether those factors fully compensate for a gap in a specific context, say that limitation plainly after naming the documented factors.
- Do not ask the user for additional source material. Answer only from the provided matches and state limits plainly when needed.
- Treat the matched excerpts as the complete approved material available for this answer. Do not describe them as incomplete, cut off, truncated, partially visible, or missing unless one of the excerpts explicitly says that.
- Do not ask for the full text of a document, more of a document section, or additional source material.
- Do not use general job-market or training knowledge to explain what a role typically entails if that is not explicitly stated in the matched source material.
- If the question is about fit for a role and the matched source material does not define that role's duties, say that the approved sources do not define the role requirements rather than filling them in from general knowledge.
- Do not define a role by saying what it "typically," "usually," or "generally" involves unless that description is explicitly present in the matched source material.
- When direct evidence for a role is missing, you may infer cautiously from adjacent documented traits, projects, communication patterns, and experiences if multiple matched excerpts support that inference.
- Distinguish clearly between confirmed evidence, reasonable inference, and unknowns or remaining gaps.
- Do not refuse a role-fit question if the matched source material supports a conditional or adjacent-evidence assessment. Refuse only when the approved matches make even a conditional assessment impossible.
- For broad job titles, answer with a fit range or fit category when possible, rather than saying no assessment is possible.
- Avoid sounding like a checklist reader when the matched sources support a more natural synthesis.
- Start by answering the user's real question directly instead of opening with long framing.
- If the matched source material contains concrete tools, methods, projects, or work examples that bear on the question, mention the strongest ones instead of speaking only in generalities.
- If the matched source material already contains concrete examples, do not say there are no concrete examples.
- If the user asks for an example, choose the clearest concrete project, work item, process change, or artifact in the matched excerpts and explain what it demonstrates.
- Do not say you need a more specific example when the matched excerpts contain any project, job, tool, artifact, workflow, or documented behavior that can illustrate the answer.
- When the matched source material is public writing, treat it as published essays or analysis that James chose to make public, not as hidden internal cognition or private thought beyond the text itself.
- Use bullets only when they make the answer clearer than prose.

MODE GUIDANCE:
${getModePrompt(mode)}`;

    const sourceMaterial = matches
      .map((match) => {
        const items = match.items.join("\n- ");
        return `[${match.sourceLabel} / ${match.title}]\n- ${items}`;
      })
      .join("\n\n");

    const userMessage = `SOURCE MATERIAL:\n${sourceMaterial}\n\nQUESTION: ${question}`;

    try {
      const initialResponse = await requestAnthropic({
        apiKey: anthropicKey.value(),
        system: SYSTEM_PROMPT,
        userMessage
      });

      if (!initialResponse.ok) {
        res.status(200).json({ answer: fallbackFormat(matches) });
        return;
      }

      const text = initialResponse.text;

      if (!text) {
        res.status(502).json({ error: "No text in response" });
        return;
      }

      let answer = text;

      if (BAD_META_RESPONSE_PATTERN.test(answer)) {
        const repairResponse = await requestAnthropic({
          apiKey: anthropicKey.value(),
          system: `${SYSTEM_PROMPT}\n\nREPAIR RULES:\n- Your previous answer improperly talked about the source excerpts as if they were incomplete, cut off, or lacked a usable example. Do not do that.\n- Answer directly from the provided source material.\n- If the user asked for an example, choose the clearest concrete project, work item, process change, or artifact from the excerpts and explain what it demonstrates.\n- If the excerpts support a partial answer, give the partial answer directly.\n- If limits remain, describe them plainly without asking for more material or saying the excerpts are incomplete.`,
          userMessage,
          maxAttempts: 2
        });

        if (repairResponse.ok) {
          const repairedText = repairResponse.text;
          if (repairedText && !BAD_META_RESPONSE_PATTERN.test(repairedText)) {
            answer = repairedText;
          } else {
            answer = fallbackFormat(matches);
          }
        } else {
          answer = fallbackFormat(matches);
        }
      }

      if (mode?.id === "projects" && BAD_PROJECT_DENIAL_PATTERN.test(answer) && hasNamedProjectEvidence(question, matches)) {
        const repairResponse = await requestAnthropic({
          apiKey: anthropicKey.value(),
          system: `${SYSTEM_PROMPT}\n\nPROJECT REPAIR RULES:\n- Your previous answer incorrectly denied information about a project even though the provided excerpts explicitly name it.\n- Answer directly from the named project excerpts.\n- If the excerpts are portfolio-media entries, explain that those hosted clips are the approved project evidence currently available.\n- Include live links or hosted media URLs when they are present in the excerpts.\n- Do not tell the user the approved sources lack information about the project if the project is named in the provided excerpts.`,
          userMessage,
          maxAttempts: 2
        });

        if (repairResponse.ok) {
          const repairedText = repairResponse.text;
          if (repairedText && !BAD_PROJECT_DENIAL_PATTERN.test(repairedText)) {
            answer = repairedText;
          } else {
            answer = fallbackFormat(matches);
          }
        } else {
          answer = fallbackFormat(matches);
        }
      }

      if (mode?.id === "writing" && BAD_PROJECT_DENIAL_PATTERN.test(answer) && hasNamedWritingEvidence(question, matches)) {
        const repairResponse = await requestAnthropic({
          apiKey: anthropicKey.value(),
          system: `${SYSTEM_PROMPT}\n\nWRITING REPAIR RULES:\n- Your previous answer incorrectly denied information about a writing sample even though the provided excerpts explicitly name it.\n- Answer directly from the named writing excerpts.\n- If the excerpts are published Medium pieces, describe them as public writing or opinion analysis.\n- If the excerpts are the linked ChatGPT memo, describe it as supporting analysis, not a James-authored Medium article.\n- Do not tell the user the approved sources lack information about the writing sample if the sample is named in the provided excerpts.`,
          userMessage,
          maxAttempts: 2
        });

        if (repairResponse.ok) {
          const repairedText = repairResponse.text;
          if (repairedText && !BAD_PROJECT_DENIAL_PATTERN.test(repairedText)) {
            answer = repairedText;
          } else {
            answer = fallbackFormat(matches);
          }
        } else {
          answer = fallbackFormat(matches);
        }
      }

      if (mode?.id === "fit" && BAD_ROLEFIT_DEFERRAL_PATTERN.test(answer)) {
        const repairResponse = await requestAnthropic({
          apiKey: anthropicKey.value(),
          system: `${SYSTEM_PROMPT}\n\nROLE-FIT REPAIR RULES:\n- Your previous answer over-deferred because the role was not defined exactly.\n- Give the best conditional fit judgment the provided excerpts support.\n- Lead with the fit assessment, not with the lack of a formal role definition.\n- Separate direct evidence, adjacent evidence, and unknowns.\n- If the role looks plausible but not fully proven, say so plainly using language like stretch fit, plausible fit, adjacent evidence, or conditional fit.\n- Do not ask for a job description unless it is a brief optional note after you have already answered from the provided material.`,
          userMessage,
          maxAttempts: 2
        });

        if (repairResponse.ok) {
          const repairedText = repairResponse.text;
          if (repairedText && !BAD_ROLEFIT_DEFERRAL_PATTERN.test(repairedText)) {
            answer = repairedText;
          } else {
            answer = fallbackFormat(matches);
          }
        } else {
          answer = fallbackFormat(matches);
        }
      }

      res.status(200).json({ answer });
    } catch (err) {
      console.error("Synthesizer error:", err);
      res.status(500).json({ error: "Internal error" });
    }
  }
);

exports._test = {
  isValidMatch
};
