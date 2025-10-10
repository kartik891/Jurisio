import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Upload() {
    const [text, setText] = useState("");
    const navigate = useNavigate();

    async function sendData(data) {
        try {
            const response = await axios.post('http://localhost:8000/api', { data: text },  { headers: { 'Content-Type': 'application/json' } });
            console.log("Server Response: ", response.data)
        } catch (error) {
            console.log(error);
        }
    }

    function handleUpload(e) {
        e.preventDefault();
        if (text.trim()) {
            console.log("Data Available");
            console.log(`The text to be summarized:\n${text}`);
            sendData(text);
            setText("");
            navigate("/simplify");
        }
    }

    return (<>
        <p>Simplify Your Legal Document</p>
        <p>Paste your legal text or upload a document to get started</p>
            <label>Paste your Legal text:</label>
            <textarea name="legalText" id="text" onChange={(e) => { setText(e.target.value) }}></textarea>
            <p>or</p>
            <input type="file" name="legalFile" id="file"></input>
            <label>Simplify Level</label>
            <select name="level" id="simplification_level">
                <option value="basic">Basic</option>
                <option value="moderate">Moderate</option>
                <option value="detailed">Detailed</option>
            </select>
            <label>Output Type</label>
            <select name="level" id="simplification_level">
                <option value="simplified">Simplified</option>
                <option value="summary">Summary</option>
                <option value="both">Both</option>
            </select>
            <button onClick={handleUpload}>Simplify Now</button>
    </>);
}

export default Upload