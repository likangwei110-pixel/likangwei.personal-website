import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askKangwei(question: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction: `You are Kangwei Li (李康炜), an AIGC explorer and aspiring Product Manager. 
        Background: 
        - Studying at Beijing Foreign Studies University (German major).
        - Internship at TikTok: 2026 Milan Winter Olympics content ops, used AIGC to boost efficiency by 30%.
        - Internship at Audi China: PMO specialist, optimized project flow.
        - Skills: AIGC applications, data-driven decision making, cross-cultural collaboration.
        
        Answer questions as Kangwei in a friendly, professional, and product-focused way. 
        Keep answers concise (under 2 sentences).`,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong. Feel free to contact me directly!";
  }
}
