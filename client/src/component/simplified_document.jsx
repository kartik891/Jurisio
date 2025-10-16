import axios from "axios";
import { useState, useEffect, useContext } from "react";
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

        const response = await axios.get(`http://localhost:8000/summary/${sessionId}`);
        console.log("Summary response:", response.data);
        setSimplified(response.data);
      } catch (err) {
        console.error("Error fetching Simplified:", err);
        setError("Error loading the data");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [sessionId]);

  if (error) return <p>{error}</p>;
  if (loading) return <p>Loading the summary...</p>;

  return (
    <div>
      <h3>Simplifed Document</h3>
      <p>{simplified}</p>
    </div>
  );
}

export default SimplifiedDocument;
