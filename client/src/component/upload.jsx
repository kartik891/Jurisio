import { useState, useContext } from "react";
import { SessionIdContext } from "../App";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Upload() {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [level, setLevel] = useState("basic");
    const navigate = useNavigate();
    const sessionId = useContext(SessionIdContext);

    async function sendData() {
        try {
            const response = await axios.post('http://localhost:8000/api', { data: text, sessionId: sessionId, level: level});
            console.log("Server Response: ", response.data)
            return response.data;
        } catch (error) {
            console.error('Error sending text:', error?.response?.data || error.message);
            throw error;
        }
    }

    async function sendFile() {
        try {
            const formData = new FormData();
            formData.append('legalFile', file);
            formData.append('sessionId', sessionId);
            formData.append('level', level);
            console.log("Uploading file: ", file);
            const response = await axios.post('http://localhost:8000/upload', formData , { headers : {'Content-Type' : 'multipart/form-data' }} );
            console.log("Server Response: ", response.data)
            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error?.response?.data || error.message);
            throw error;
        }
    }

    async function handleUpload(e) {
        e.preventDefault();
        if (text.trim()) {
            console.log("Data Available");
            console.log(`The text to be summarized:\n${text}`);
            try {
                await sendData();
                setText("");
                navigate("/simplify");
            } catch (err) {
                alert(err?.response?.data?.message || 'Failed to send text');
            }
        }
        else if(file){
            console.log("File Available");
            try {
                await sendFile();
                navigate("/simplify");
            } catch (err) {
                alert(err?.response?.data?.message || 'Failed to upload file');
            }
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
            <select name="level" id="simplification_level" onChange={(e) => {setLevel(e.target.value)}}>
                <option value="basic">Basic</option>
                <option value="moderate">Moderate</option>
                <option value="detailed">Detailed</option>
            </select>
            <button type="submit">Simplify Now</button>

        </form>
    </>);

}

export default Upload;
