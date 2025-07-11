import { runOCR } from "./ocr.js";
import { summarizeText } from "./summarizer.js";
import { extractTextFromBuffer } from "../utils/pdfExtract.js";

export const summarizeUploadedFile = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { mimetype, buffer, originalname } = file;

  try {
    let extractedText = "";

    if (mimetype === "text/plain") {
      extractedText = buffer.toString("utf-8");
    }

    else if (mimetype.startsWith("image/")) {
      const result = await Tesseract.recognize(buffer, "eng");
      extractedText = result.data.text;
    }

    else if (mimetype === "application/pdf") {
      extractedText = await extractTextFromBuffer(buffer);

      if (extractedText.length < 50) {
        const result = await Tesseract.recognize(buffer, "eng");
        extractedText = result.data.text;
      }
    }

    else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    const summary = await summarizeText(extractedText);

    res.status(200).json({
      success: true,
      filename: originalname,
      extractedText,
      summary
    });

  } catch (error) {
    console.error("Smart Summarizer Error:", error);
    res.status(500).json({ message: "Summarization failed", error: error.message });
  }
};