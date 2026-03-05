import { useState, useEffect, useContext } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { simplifyContent } from "./upload";
import { SessionIdContext } from "../App";
import "./ui/simplify.css";
import "./ui/loading.css";

function SimplifiedDocument() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState("easy");
  const [error, setError] = useState(null);

  const sessionId = useContext(SessionIdContext);

  async function getDataFromRewriter(selectedLevel) {
    try {
      setLoading(true);
      setContent("");

      const sessionData = simplifyContent[sessionId];

      if (!sessionData) {
        setError("Original data not available");
        return;
      }

      const { extractedText } = sessionData;

      const writer = await Writer.create({
        tone: "formal",
        expectedInputLanguages: ["en"],
        expectedContextLanguages: ["en"],
        outputLanguage: "en",
        sharedContext: extractedText
      });

      const stream = writer.writeStreaming(
        `Simplify the text to ${selectedLevel} reading level. Highlight important parts using markdown.`
      );

      let result = "";

      for await (const chunk of stream) {
        result += chunk;
        setContent(result);
      }

    } catch (err) {
      setError("Error simplifying the document");
    } finally {
      setLoading(false);
    }
  }

  async function simplifiedText() {
    if ("Writer" in self) {
      const availability = await Writer.availability();
      if (availability !== "unavailable") {
        getDataFromRewriter(level);
      }
    } else {
      setError("Functionality not available");
    }
  }

  useEffect(() => {
    simplifiedText();
  }, [sessionId]);

  function handleLevelChange(e) {
    const newLevel = e.target.value;
    setLevel(newLevel);
    getDataFromRewriter(newLevel);
  }

  return (
    <div id="simplified-doc">
      <p id="simplified-heading">Simplified Document</p>

      <div className="simplify-hint">
        💡 Tip: Select any part of the text to simplify it further.
      </div>

      {/* Level Dropdown */}
      <div className="level-control">
        <label>Simplification Level: </label>
        <select value={level} onChange={handleLevelChange}>
          <option value="very easy">Very Easy</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {loading && <p className="loader"></p>}

      {error ? (
        <p>{error}</p>
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      )}
    </div>
  );
}

export default SimplifiedDocument;