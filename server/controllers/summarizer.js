import { CohereClient } from "cohere-ai";
import { translateToHindi } from "./translate.js"; 

const cohere = new CohereClient({
	token: process.env.COHERE_API_KEY,
});

export const summarizeText = async (text) => {
	try {
		const prompt = `You are a legal assistant AI working for a legal-tech app called "LegalLens".

Your task is to analyze and summarize legal documents for common users in a clear, concise, and structured manner.

Please follow this format:

1. Begin with a *short plain-English summary* (2-3 sentences) describing what the document is about in simple language.
2. Then, provide key details as *bullet points*, with each point starting with a clear, bolded heading followed by the explanation. Use formatting like:
   - *Type of Document*: [Document Type]
   - *Key Purpose*: [Purpose]
   - *Parties Involved*: [Party A, Party B, etc.]
   - *Important Clauses*: [Clause 1, Clause 2...]
   - *Rights & Responsibilities*: [Summary of obligations and rights]
   - *Important Dates*: [Mention key dates like start, end, signing]
   - *Final Outcome*: [Mention any conclusion or result of the document]
   - *Plain English Explanation*: [Explain the meaning in very simple English for a layperson]
   - *Simple Hindi Explanation*: [Translate above explanation in easy Hindi for common users]

Avoid repetition, and include only the applicable sections. Maintain legal accuracy but make it easy to understand.

Here is the document text:

[Insert Document Text Here]:\n\n${text}`;

		const response = await cohere.generate({
			model: "command",
			prompt,
			maxTokens: 400,
			temperature: 0.4,
		});

		const summary = response.generations[0].text.trim();
		const hindi = await translateToHindi(summary);
		return { summary, hindi };
	} catch (error) {
		console.error("Cohere Summarizer Error:", error);
		throw new Error("Summarization failed");
	}
};
