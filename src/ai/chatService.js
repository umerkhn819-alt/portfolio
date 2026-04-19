import { buildPortfolioContext } from "./portfolioContext";
import { buildFallbackResponse } from "./fallbackResponder";
import { hasOpenAiConfig, requestOpenAiAnswer } from "./openaiClient";

const portfolioContext = buildPortfolioContext();

export async function getAssistantReply(question, history) {
  if (hasOpenAiConfig()) {
    try {
      return await requestOpenAiAnswer({
        question,
        history,
        context: portfolioContext,
      });
    } catch {
      return buildFallbackResponse(question);
    }
  }

  return buildFallbackResponse(question);
}
