import Tesseract from "tesseract.js";
// summarizeText: function that takes a string of text and returns a summarized version (string or object)
// Expected input: extracted text from OCR
// Expected output: summary of the input text
import { summarizeText } from "./summarizer.js";
export const runOCR = async (req, res) => {
	try {
		if (!req.file) {
			return res
				.status(400)
				.json({ success: false, message: "No file uploaded" });
		}

		const imageBuffer = req.file.buffer;

		const {
			data: { text },
		} = await Tesseract.recognize(imageBuffer, "eng", {
			logger: (m) => console.log(m), // Optional: progress logs
		});
		const summary = await summarizeText(text);

		res.json({
			success: true,
			filename: req.file.originalname,
			extractedText: text,
			summary: summary,
		});
	} catch (err) {
		console.error("OCR error:", err);
		res
			.status(500)
			.json({ success: false, message: "OCR failed", error: err.message });
	}
};
