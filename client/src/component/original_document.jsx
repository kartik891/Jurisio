import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { SessionIdContext } from "../App";

function OgDocument() {
    const [originalData, setOriginalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sessionId = useContext(SessionIdContext);

    async function getOriginalData() {
        try {
            if (!sessionId) return;

            const response = await axios.get(`http://localhost:8000/simplified/${sessionId}`);
            const originalData = response.data;
            if(Array.isArray(originalData)){
                setOriginalData(originalData);
            }
            else{
                setOriginalData([originalData]);
            }
        } catch (err) {
            console.error("Error fetching summary:", err);
            setError("Error loading the data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getOriginalData();
    }, [sessionId]);

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading the summary...</p>;

    return (
        <div>
            <h3>Original Document</h3>
            <ul>
                {originalData.map((page, index) => (
                    <li key={index}><pre>{`Page ${index+1}\n`}{page}</pre></li>
                ))}
            </ul>
        </div>
    );
}

export default OgDocument;
