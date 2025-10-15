import { useState, useContext } from "react";
import { SessionIdContext } from "../App";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Upload() {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const sessionId = useContext(SessionIdContext);

    async function sendData() {
        try {
            const response = await axios.post('http://localhost:8000/api', { data: text, sessionId: sessionId });
            console.log("Server Response: ", response.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function sendFile() {
        try {
            const formData = new FormData();
            formData.append('legalFile', file);
            formData.append('sessionId', sessionId);
            console.log("Uploading file: ", file);
            const response = await axios.post('http://localhost:8000/upload', formData , { headers : {'Content-Type' : 'multipart/form-data' }} );
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
            sendData();
            setText("");
            navigate("/simplify");
        }
        else if(file){
            console.log("File Available");
            sendFile();
            navigate("/simplify");
        }
    }

    return (<>
        <form onSubmit={handleUpload} encType="multipart/form-data">

            <p>Simplify Your Legal Document</p>
            <p>Paste your legal text or upload a document to get started</p>
            <label>Paste your Legal text:</label>
            <textarea name="legalText" id="text" onChange={(e) => { setText(e.target.value) }}></textarea>
            <p>or</p>

            <input type="file" name="legalFile" id="file" onChange={(e) => {setFile(e.target.files[0])}}></input>
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
            <button type="submit">Simplify Now</button>

        </form>
    </>);

}

export default Upload;