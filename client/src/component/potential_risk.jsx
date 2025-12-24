import axios from "axios";
import { SessionIdContext } from "../App";
import { useState, useEffect, useContext } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function Risks() {

    const [risks, setRisk] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sessionId = useContext(SessionIdContext);

    async function calculateRisk() {
        try {
            const availability = await LanguageModel.availability();

            const response = await axios.get(`http://localhost:8000/risks/${sessionId}`);
            const file = response.data;

            if (availability === 'unavailable') {
                setError("The Risks cannot be extracted in your device");
            }
            else {
                const session = await LanguageModel.create({
                    initialPrompts: [{ role: 'assistant', content: `The further answers will be based on the text provided: ${file}` }],
                    language: 'en'
                });

                const result = await session.prompt(`You are an AI legal assistant that identifies potential risks, liabilities, and obligations in the following document.
Analyze the text and return only the key risk statements, disclaimers, or clauses that might create legal, financial, or compliance exposure.
For each risk, include:
1. A short title (e.g., "Termination Clause Risk")
2. The exact clause text (quoted)
3. A short explanation in plain English (why it's risky)
Output in this Markdown format:
### ⚠️ [Title]
**Clause:** "..."  
**Explanation:** ...`);
                console.log(result);
                setRisk(result);
            }
        } catch (error) {
            console.log(error);
            setError("The Risks were not extracted")
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        calculateRisk();
    }, [sessionId]);

    if (error) return <p>{error}</p>

    return (<>
        <h3>This is summarized Risks</h3>
        {loading ? "Loading..." : ""}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {risks}
        </ReactMarkdown>
    </>);
}

export default Risks