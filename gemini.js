import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config()

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: apiKey});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: `Simplify the text: ${text}`,
//   });
//   console.log(response.text);
// }

// main();