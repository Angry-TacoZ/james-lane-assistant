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
      return fallbackFormat(retrievedMatches);
    }

    const data = await response.json();
    return data.answer ?? fallbackFormat(retrievedMatches);
  } catch (err) {
    console.error("Synthesizer fetch failed:", err);
    return fallbackFormat(retrievedMatches);
  }
}

function fallbackFormat(retrievedMatches) {
  return retrievedMatches
    .map((match) => {
      const bullets = match.items.map((item) => `- ${item}`).join("\n");
      return `${match.title}\n${bullets}`;
    })
    .join("\n\n");
}
