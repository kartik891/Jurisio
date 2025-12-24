import axios from "axios";
import { useState, useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SessionIdContext } from "../App";

function OgDocument() {
    const [originalData, setOriginalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sessionId = useContext(SessionIdContext);

    async function getOriginalData() {
        try {
            if (!sessionId) return;
            const response = await axios.get(`http://localhost:8000/original/${sessionId}`);
            const originalData = response.data;
            setOriginalData(originalData);
        } catch (err) {
            console.error("Error fetching original:", err?.response?.data || err.message);
            setError(err?.response?.data?.message || "Error loading the data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getOriginalData();
    }, [sessionId]);

    function renderSingleDocument() {
        return (<ReactMarkdown remarkPlugins={[remarkGfm]}>
            {originalData}
        </ReactMarkdown>);
    }

    function renderArray(){
        return (originalData.map((page, index) => (
                        <li key={index}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {`### Page ${index + 1}\n\n${page}`}
                            </ReactMarkdown>
                        </li>
        )));
    }

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading the summary...</p>;

    return (
        <div>
            <h3>Original Document</h3>
            <ul>
                {Array.isArray(originalData) ? renderArray() : renderSingleDocument()}
            </ul>
        </div>
    );
}

export default OgDocument;
