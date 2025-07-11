import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export const summarizeText = async (text) => {
  try {
    const prompt = `You are a legal assistant AI for a legal-tech app called "LegalLens". 

Summarize this legal document clearly in bullet points:
- Type of Document
- Key Purpose
- Parties Involved
- Important Clauses
- Rights & Responsibilities
- Any important dates
- Final outcome
- Plain English explanation

Only include sections if applicable. Don't repeat. Here's the text:\n\n${text}`;

    const response = await cohere.generate({
      model: "command",
      prompt,
      maxTokens: 400,
      temperature: 0.4,
    });

    return response.generations[0].text.trim();
  } catch (error) {
    console.error("Cohere Summarizer Error:", error);
    throw new Error("Summarization failed");
  }
};