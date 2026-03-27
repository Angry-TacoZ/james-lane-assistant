const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

const anthropicKey = defineSecret("ANTHROPIC_API_KEY");
const ALLOWED_ORIGIN = "https://james-lane-web-resume.web.app";

const BAD_META_RESPONSE_PATTERN = /\b(incomplete|cut off|truncated|partially visible|missing or cut off|need the full text|full text of that document|additional source material|more of the document)\b/i;
const BAD_PROJECT_DENIAL_PATTERN = /\b(does not contain (any )?information about|cannot answer this question from the approved|can't answer this question from the approved)\b/i;
const PROJECT_NAME_PATTERNS = [
  /\bliving resume ai\b/i,
  /\bliving resume\b/i,
  /\bcbc proposal faq assistant\b/i,
  /\bcaa 2026 pbm regulatory assistant\b/i,
  /\bblkvue ai security intake bot\b/i,
  /\bjameslaneai\.com\b/i,
  /\biron shores\b/i,
  /\biron tides\b/i
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
- If the question is too abstract to fully resolve, state what the sources establish and then ask for one specific role or job posting to narrow the fit judgment.
- Do not answer broad fit questions by only reciting category definitions if the matched sources support a more concrete role-family answer.
- If the matched excerpts include concrete resume evidence such as tools, process skills, analytics work, or documented role experience, use that evidence in the fit judgment instead of speaking only at the abstract profile level.
- You may give a best-supported interpretation of likely fit when multiple excerpts point in the same direction, as long as you state any meaningful limits that remain.
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

exports.synthesize = onRequest(
  { secrets: [anthropicKey], cors: true },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
      res.set("Access-Control-Allow-Methods", "POST");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const { question, matches, mode } = req.body;

    if (!question || !matches || !Array.isArray(matches)) {
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
- Avoid sounding like a checklist reader when the matched sources support a more natural synthesis.
- Start by answering the user's real question directly instead of opening with long framing.
- If the matched source material contains concrete tools, methods, projects, or work examples that bear on the question, mention the strongest ones instead of speaking only in generalities.
- If the matched source material already contains concrete examples, do not say there are no concrete examples.
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
        res.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
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
          system: `${SYSTEM_PROMPT}\n\nREPAIR RULES:\n- Your previous answer improperly talked about the source excerpts as if they were incomplete or cut off. Do not do that.\n- Answer directly from the provided source material.\n- If the excerpts support a partial answer, give the partial answer directly.\n- If limits remain, describe them plainly without asking for more material or saying the excerpts are incomplete.`,
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

      res.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
      res.status(200).json({ answer });
    } catch (err) {
      console.error("Synthesizer error:", err);
      res.status(500).json({ error: "Internal error" });
    }
  }
);
