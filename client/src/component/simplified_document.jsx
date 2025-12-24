import axios from "axios";
import { useState, useEffect, useContext } from "react";
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { SessionIdContext } from "../App";

function SimplifiedDocument() {
  const [simplified, setSimplified] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sessionId = useContext(SessionIdContext);

  useEffect(() => {
    async function getData() {
      try {
        if (!sessionId) return;

        const response = await axios.get(`http://localhost:8000/simplified/${sessionId}`);
        console.log("Simplified response:", response.data);

        setSimplified(response.data || "");
      } catch (err) {
        console.error("Error fetching Simplified:", err?.response?.data || err.message);
        setError(err?.response?.data?.message || "Error loading the data");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [sessionId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Simplifed Document</h3>
      { loading ? "Loading..." : ""}
      <ReactMarkdown remarkPlugins = {[remarkGfm]}>
        {simplified}
      </ReactMarkdown>
    </div>
  );
}

export default SimplifiedDocument;
