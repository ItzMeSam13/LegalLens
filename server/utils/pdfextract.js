import pkg from "pdfjs-dist/legacy/build/pdf.js";
const { getDocument } = pkg;

export async function extractTextFromBuffer(buffer) {
	const data = new Uint8Array(buffer);
	const pdf = await getDocument({ data }).promise;

	let fullText = "";

	for (let i = 1; i <= pdf.numPages; i++) {
		const page = await pdf.getPage(i);
		const content = await page.getTextContent();

		const lines = [];
		let currentLine = [];
		let lastY = null;

		content.items.forEach(item => {
			const y = item.transform[5];
			const text = item.str.trim();

			if (text === "") return;

			if (lastY === null || Math.abs(lastY - y) < 5) {
				currentLine.push(text);
			} else {
				lines.push(currentLine.join(" "));
				currentLine = [text];
			}

			lastY = y;
		});

		if (currentLine.length) {
			lines.push(currentLine.join(" "));
		}

		fullText += lines.join("\n") + "\n\n";
	}

	return fullText.trim();
}
