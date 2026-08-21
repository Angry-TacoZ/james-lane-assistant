const FUNCTION_URL = import.meta.env.VITE_SYNTHESIZE_URL;

export async function synthesize(question, retrievedMatches, options = {}) {
  try {
    const response = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, matches: retrievedMatches, mode: options.mode ?? null })
    });

    if (!response.ok) {
      console.error("Function error:", response.status);
      return formatFallbackAnswer(retrievedMatches);
    }

    const data = await response.json();
    return data.answer ?? formatFallbackAnswer(retrievedMatches);
  } catch (err) {
    console.error("Synthesizer fetch failed:", err);
    return formatFallbackAnswer(retrievedMatches);
  }
}

export function formatFallbackAnswer(retrievedMatches) {
  return retrievedMatches
    .map((match) => {
      const facts = match.items
        .map((item) => item.trim())
        .filter((item) => item && !item.endsWith(":"))
        .slice(0, 3);

      return facts.length ? `${match.title}: ${facts.join(" ")}` : match.title;
    })
    .join("\n\n");
}
