import { extractTextFromBuffer } from "../utils/pdfExtract.js";
import { runOCR } from "./ocr.js";
import { summarizeText } from "./summarizer.js";

export const handleupload = async (req, res) => {
	const file = req.file;

	if (!file) {
		return res.status(400).json({ message: "No file uploaded" });
	}

	const { mimetype, buffer, originalname } = file;

	try {
		if (mimetype === "text/plain") {
			const text = buffer.toString("utf-8");
			const summary = await summarizeText(text);
			return res.status(200).json({
				success: true,
				filename: originalname,
				source: "txt",
				extractedText: text,
				summary,
			});
		}

		if (mimetype.startsWith("image/")) {
			return runOCR(req, res);
		}

		if (mimetype === "application/pdf") {
			const text = await extractTextFromBuffer(buffer);
			

			if (text.length > 50) {
				const summary = await summarizeText(text);
				return res.status(200).json({
					success: true,
					filename: originalname,
					source: "pdfjs",
					extractedText: text,
					summary,
				});
			} else {
				return runOCR(req, res);
			}
		}

		return res.status(200).json({ message: "file uploaded successfully" });
	} catch (error) {
		console.error("Error handling upload:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
