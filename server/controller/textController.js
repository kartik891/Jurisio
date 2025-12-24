import { GoogleGenAI } from "@google/genai";
import { PDFParse } from "pdf-parse";
import mammoth from 'mammoth';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

export const simplified = {};

export async function simplify(text, level) {

    const ai = new GoogleGenAI({ apiKey: apiKey });

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Give ${level} simplification of : ${text}`
        })
        return response.text;
    } catch (error) {
        return 0;
    }
}


export const getData = async (req, res) => {
    const { data, sessionId, level } = req.body;

    if (!sessionId) return res.status(400).json({ message: 'sessionId is required' });

    const simplifiedText = await simplify(data, level);
    const originalText = data;

    if(!simplifiedText) return res.status(500).json({sessionId, message: "Error Simplifying the text"});

    simplified[sessionId] = {
        response: simplifiedText,
        original: originalText
    }

    res.status(201).json({ sessionId, message: "The session & simplify was created successfully" });
}

export const getFile = async (req, res) => {
    const file = req.file;
    const sessionId = req.body.sessionId || req.query?.sessionId || req.headers['sessionid'] || req.headers['session-id'];
    const level = req.body.level || req.query?.level || req.headers['level'];
    
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    if (!sessionId) {
        return res.status(400).json({ message: 'sessionId is required' });
    }

    const buffer = file.buffer;

    if (file.mimetype === 'application/pdf') {
        try {

            if (file.size > 20 * 1024 * 1024) {
                return res.status(400).json({ message: "File too large to process" });
            }

            const parser = new PDFParse({ data: buffer });
            const fileResult = await parser.getText({ parseHyperlinks: true });

            const regex = new RegExp(`-- \\d+ of \\d+ --`, 'g');
            const wholeText = fileResult.text;
            const pages = wholeText.split(regex).map(p => p.trim()).filter(p => p.length > 0);

            const info = await parser.getInfo();

            const originalFile = pages;
            const simplifiedText = await simplify(wholeText, level);

            console.log(info.pages);

            simplified[sessionId] = {
                response: simplifiedText,
                original: originalFile
            }

            return res.status(201).json({ sessionId, message: "The file was sent successfully" });

        } catch (error) {
            console.error("Error processing PDF:", error);
            return res.status(500).json({ message: "There was an issue while processing the PDF file." });
        }
    }
    else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        try {

            if (file.size > 20 * 1024 * 1024) {
                return res.status(400).json({ message: "File too large to process" });
            }

            const result = await mammoth.extractRawText({ buffer: file.buffer });
            const originalDocx = result.value;
            const simplifiedText = await simplify(originalDocx, level);

            simplified[sessionId] = {
                response: simplifiedText,
                original: originalDocx
            };

            return res.status(201).json({ sessionId, message: "The DOCX file was processed successfully" });

        } catch (err) {
            console.error("Error processing DOCX:", err);
            return res.status(500).json({ message: "There was an issue while processing the DOCX file." });
        }
    }
    else {
        return res.status(400).json({ message: 'Only PDF & DOCX files are allowed' });
    }
}

