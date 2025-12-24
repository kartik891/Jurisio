import axios from 'axios';
import { SessionIdContext } from '../App';
import ReactMarkDow from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useContext, useState, useEffect } from 'react';

function Summarized() {

    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const sessionId = useContext(SessionIdContext);

    async function Summarize() {

        if (!sessionId) setError("SessionID not received. Upload Document again");

        try {
            const response = await axios.get(`http://localhost:8000/summary/${sessionId}`);

            const simplified = response.data;

            if ('Summarizer' in self) {
                const options = {
                    sharedContext: 'This is a scientific article',
                    type: 'key-points',
                    format: 'markdown',
                    length: 'medium',
                    language: 'en'
                };

                const availability = await Summarizer.availability();
                if (availability === 'unavailable') {
                    setError("The Summarizer API is not usabe in your device");
                } else {
                    const summarizer = await Summarizer.create(options);
                    const textFromSummarizer = await summarizer.summarize(simplified, {
                        context: 'The text is from for legal document preserve its technacality'
                    })
                    setSummary(textFromSummarizer);
                }
            }
        }

        catch (error) {
            setError("Summary of Document is not generated");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        Summarize();
    }, [sessionId])

    if (error) return <p>{error}</p>

    return (<>
        <h3>Summary of the Document</h3>
        {loading ? "Loading..." : ""}
        <ReactMarkDow remarkPlugins={[remarkGfm]}>
            {summary}
        </ReactMarkDow>
    </>);
}

export default Summarized