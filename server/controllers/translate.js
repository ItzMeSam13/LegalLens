import fetch from "node-fetch";

export const translateToHindi = async (text) => {
  try {
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: "hi",
        format: "text"
      }),
    });

    const data = await res.json();
    return data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Translation failed");
  }
};