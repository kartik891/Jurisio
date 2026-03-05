import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ui/upload.css";
import "./ui/loading.css";
import { getData } from "../lib/extractText";
import { SessionIdContext } from "../App";

export const simplifyContent = {}

function Upload() {
    const [text, setText] = useState("");
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [level, setLevel] = useState("Basic");
    const [loading, setLoading] = useState(false);
    const sessionId = useContext(SessionIdContext);

    const navigate = useNavigate();

    async function handleUpload(e) {
        e.preventDefault();
        setLoading(true);

        try {
            let extracted = "";

            if (text.trim()) {
                extracted = text;
            }
            else if (file) {
                extracted = await getData(file);
            }
            else {
                alert("Please upload a file or paste text first.");
                return;
            }

            simplifyContent[sessionId] = { extractedText: extracted, level };

            setText("");
            setFile(null);

            navigate("/simplify");

        } catch (err) {
            console.error(err);
            setError("The document couldn't be processed.");
        } finally {
            setLoading(false);
        }
    }

    if (error) return <p>{error}</p>;

    return (
        <div id="upload-div">
            <form onSubmit={handleUpload}>
                <div id="upload-title">
                    <p>Simplify Your Document</p>
                    <p style={{ color: "hsl(0,0%, 60%)", fontSize: ".9rem" }}>
                        Your document is processed locally and never uploaded.
                    </p>
                </div>

                <textarea
                    name="legalText"
                    id="text"
                    className="upload-text"
                    placeholder="Paste your document here:"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                <div id="or-text">
                    <p>or</p>
                </div>

                <div id="file-upload">
                    {<input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />}
                </div>

                <div className="simplify-level">
                    <label htmlFor="level">Simplify Level</label>
                    <select
                        name="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option value="Basic">Basic</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Detailed">Detailed</option>
                    </select>
                </div>

                <div id="simplify-button">
                    <button type="submit" id="upload-button">
                        Simplify Now
                    </button>

                    {loading && <p className="loader"></p>}
                </div>
            </form>
        </div>
    );
}

export default Upload;