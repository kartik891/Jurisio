import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export const getData = async (file) => {

    if (!file) {
        return "No file uploaded";
    }

    if (file.size > 20 * 1024 * 1024) {
        return "File too large to process";
    }

    try {

        const buffer = await file.arrayBuffer();

        /* PDF */

        if (file.type === "application/pdf") {

            const parser = new PDFParse({ data: buffer });

            const fileResult = await parser.getText({ parseHyperlinks: true });

            const regex = new RegExp(`-- \\d+ of \\d+ --`, "g");

            const wholeText = fileResult.text;

            const pages = wholeText
                .split(regex)
                .map(p => p.trim())
                .filter(p => p.length > 0);

            const info = await parser.getInfo();

            return pages;
        }

        /* DOCX */

        else if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {

            const result = await mammoth.extractRawText({ arrayBuffer: buffer });

            return result.value;
        }

        else {
            return "Only PDF & DOCX files are allowed";
        }

    } catch (error) {

        console.error("File processing error:", error);

        return "There was an issue processing the file.";

    }
};