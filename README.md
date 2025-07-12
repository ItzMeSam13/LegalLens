# LegalLens
Team: rm -rf
Members: 
1.	Sampreet Kalkundrikar
2.	Prathamesh Naik(Leader)
3.	Gangavarrapu Kaarthikeya

🔍 Project Title: LegalLens – AI-Powered Legal Document Summarizer
📌 Theme Alignment: Tech for Underserved / Legal Empowerment
📝 Project Description:
LegalLens is a web-based tool that empowers users—especially those with limited legal literacy—to understand complex legal documents by summarizing them using AI. Users can upload PDFs, images, or text files containing legal agreements, and the system extracts and summarizes key information using a language model.
⚙️ How it Works:
•	Users upload a document.
•	Text is extracted using pdf-parse or Tesseract.js (OCR for scanned images).
•	The extracted content is sent to an AI (e.g., Cohere or Gemini) for summarization.
•	The response includes a plain-English explanation of key legal points like document type, clauses, parties, and obligations.

🧑‍💻 Tech Stack:
•	Frontend: Next.js (deployed on Vercel)
•	Backend: Express.js (deployed on Render)
•	Text Extraction: pdf-parse, Tesseract.js
•	AI Summarization: Cohere / Gemini (via API)
•	File Upload: Multer
🌐 Impact:
LegalLens makes legal documents accessible to everyday users who might not be able to afford a legal consultant—bridging the gap between law and common understanding.
