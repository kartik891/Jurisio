import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useEffect, useContext } from 'react';
import { SessionIdContext } from '../App';

function Benefits(){

        const [benefits, setBenefits] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const sessionId = useContext(SessionIdContext);
    
        async function listBenefits() {
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
    
                    const result = await session.prompt(`You are a legal analysis assistant that identifies and summarizes the benefits, rights, and protections offered in the following legal document.
Analyze the document and extract statements that:
- Grant rights, privileges, or advantages to a party
- Provide protection, indemnity, or warranty
- Guarantee services, compensation, or legal safeguards
For each benefit, include:
1. A short title (e.g., "Right to Termination Notice")
2. The exact clause text (quoted)
3. A plain-language explanation of what this benefit means and why it is positive for the party
Output in Markdown format as follows:
### ✅ [Title]
**Clause:** "..."  
**Explanation:** ...`);
                    console.log(result);
                    setBenefits(result);
                }
            } catch (error) {
                console.log(error);
                setError("The Risks were not extracted")
            }
            finally {
                setLoading(false);
                console.log("Benefits are working fine");
            }
        }
    
        useEffect(() => {
            listBenefits();
        }, [sessionId]);
    
        if (error) return <p>{error}</p>
    
    return (<>
                <h3>These are benefits</h3>
                { loading ? "Loading..." : ""}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {benefits}
                </ReactMarkdown>
            </>);
}

export default Benefits