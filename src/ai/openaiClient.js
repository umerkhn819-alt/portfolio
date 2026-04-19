const OPENAI_URL = "https://api.openai.com/v1/responses";

function getApiKey() {
  return import.meta.env.VITE_OPENAI_API_KEY;
}

export function hasOpenAiConfig() {
  return Boolean(getApiKey());
}

export async function requestOpenAiAnswer({ question, context, history }) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Missing API key");
  }

  const conversation = history
    .slice(-6)
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const prompt = [
    context,
    "",
    "Recent conversation:",
    conversation || "(none)",
    "",
    `User question: ${question}`,
    "",
    "Answer clearly in 2-6 sentences. Use bullet points when useful.",
  ].join("\n");

  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.5,
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI error: ${res.status}`);
  }

  const data = await res.json();
  return data?.output_text?.trim() || "I could not generate a response.";
}
