import pkg from "pdfjs-dist/legacy/build/pdf.js";
const { getDocument } = pkg;

export const extractTextFromPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }

    const data = new Uint8Array(req.file.buffer);
    const pdf = await getDocument({ data }).promise;

    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(" ");
      extractedText += pageText + "\n\n";
    }

    res.json({
      success: true,
      filename: req.file.originalname,
      extractedText: extractedText.trim(),
    });

  } catch (err) {
    console.error("PDF extraction error:", err);
    res.status(500).json({
      success: false,
      message: "PDF text extraction failed",
      error: err.message,
    });
  }
};