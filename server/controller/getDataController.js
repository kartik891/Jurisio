import { PDFParse } from "pdf-parse";

const simplified = {};

export const getData = (req, res) => {
    const {data, sessionId} = req.body;

    console.log("Text from the frontend", data);
    console.log(`Session ID: ${sessionId}`);
    const summary = `This is the content of summary: ${data}`;
    const originalText = `Text from the frontend i.e. Original Document: ${data}`;

    simplified[sessionId] = {
        response: summary,
        original: originalText
    }
    res.json({sessionId , message : "The session & summary was created successfully"});
}

export const getFile =  async (req, res) =>{
    const file = req.file;
    const sessionId = req.body.sessionId;

    const buffer = file.buffer;

    const parser = new PDFParse({ data : buffer });
    const fileResult = await parser.getText({parseHyperlinks: true});

    const regex = new RegExp(`-- \\d+ of \\d+ --`, 'g');
    const wholeText = fileResult.text;
    const pages = wholeText.split(regex).map(p => p.trim()).filter(p => p.length > 0);

    const info = await parser.getInfo();

    const originalFile = pages;
    const summary = `This is simplified version (to be implemented) Total Pages: ${info.total}`;

    console.log(info.pages);

    simplified[sessionId] = {
        response: summary,
        original: originalFile
    }

    res.send({sessionId, message: "The file was sent successfully"});
}

export const getSummary = (req, res) =>{
    const {sessionId} = req.params;
    const record = simplified[sessionId];

    if(!record) return res.send("The Summary is not available");

    res.json(record.response);
}

export const getSimplified = (req, res) =>{
    const {sessionId} = req.params;
    const record = simplified[sessionId];

    if(!record) return res.send("The Original File is not available");

    res.json(record.original);
}

