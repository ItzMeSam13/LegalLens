import Tesseract from "tesseract.js";

export const runOCR = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const imageBuffer = req.file.buffer;

    const { data: { text } } = await Tesseract.recognize(imageBuffer, "eng", {
      logger: m => console.log(m) // Optional: progress logs
    });

    res.json({
      success: true,
      filename: req.file.originalname,
      extractedText: text,
    });

  } catch (err) {
    console.error("OCR error:", err);
    res.status(500).json({ success: false, message: "OCR failed", error: err.message });
  }
};