import { simplified } from "./textController.js";

export const getSimplified = (req, res) => {
    const { sessionId } = req.params;
    const record = simplified[sessionId];
    
    if (!record) return res.send("The Summary is not available");

    res.json(record.response);
}

export const getOriginal = (req, res) => {
    const { sessionId } = req.params;
    const record = simplified[sessionId];

    if (!record) return res.send("The Original File is not available");

    res.json(record.original);
}

export const getSummary = async (req, res) =>{
    const { sessionId } = req.params;
    const record = simplified[sessionId];

    if (!record) return res.send("The Original File is not available");

    res.send(record.response);
}

export const getRisk = async (req, res) => {
    const { sessionId } = req.params;
    const record = simplified[sessionId];

    if (!record) return res.send("The Original File is not available");

    res.send(record.original);
}

