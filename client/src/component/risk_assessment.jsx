import axios from "axios";
import { SessionIdContext } from "../App";
import { useState, useEffect, useContext } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function Assessment(){

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

                const result = await session.prompt(`You are a legal analysis assistant. Your task is to assess the *overall risk level* of a legal document.
First, identify the *type of document* (e.g., contract, NDA, MoU, agreement, policy, terms of service, etc.) and then analyze the content to decide if it poses significant or moderate risks.
### Instructions:
1. Read the text carefully.
2. Consider legal, financial, and compliance implications.
3. Focus on clauses that create:
   - Strict obligations
   - Heavy penalties
   - One-sided terms
   - Confidentiality or liability risks
   - Non-compliance with applicable laws
4. Then, based on the severity, classify the document as one of the following:
   - **Highly Risky** — contains clauses that could cause serious legal or financial damage or require immediate legal review.
   - **Moderately Risky** — issues exist but they are manageable or low impact and can be reviewed later.
5. Output should include the type of  document, classificatio of document(highly/ moderately) and the reason for it being (highly/ moderately)`);
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
                <h3>Risk Assessment</h3>
                { loading ? "Loading..." : ""}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {risks}
                </ReactMarkdown>
            </>);
}

export default Assessment