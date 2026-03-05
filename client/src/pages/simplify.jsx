import Footer from "../component/footer";
import ButtonLayer from "../component/ButtonLayer";
import DocumentViewer from "../component/DocumentViewer";
import SelectionPopup from "../component/SelectionPopup";
import ExplanationPopup from "../component/ExplanationPopup";
import { useState, useEffect } from "react";
import '../component/ui/loading.css'
import '../component/ui/simplify.css';

function Simplify() {
    const [simplified, setSimplified] = useState(false);
    const [selectedText, setSelectedText] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [finalText, setFinalText] = useState(null);
    const [ongoing, setOngoing] = useState("");
    const [showExplainPopup, setShowExplainPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const simplDoc = document.getElementById("simplified-doc");

        const handleMouseUp = (e) => {
            const selection = window.getSelection();
            const text = selection.toString().trim();

            if (text && simplDoc && simplDoc.contains(selection.anchorNode)) {
                const rect = selection.getRangeAt(0).getBoundingClientRect();
                setPopupPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top + window.scrollY - 40,
                });
                setSelectedText(text);
                setShowPopup(true);
            } else {
                setShowPopup(false);
            }
        };

        if (simplDoc) simplDoc.addEventListener("mouseup", handleMouseUp);
        return () => simplDoc && simplDoc.removeEventListener("mouseup", handleMouseUp);
    }, []);

    const handleSimplifySelection = async () => {
        setShowPopup(false);
        setLoading(true);
        try {
            setShowExplainPopup(true);
            setOngoing('');
            const rewriter = await Rewriter.create({
                tone: 'more-casual',
                format: 'plain-text',
                length: 'as-is'
            });
            const stream = rewriter.rewriteStreaming(selectedText, {
                context: "Explain in simpler terms.",
                tone: "more-casual",
            });
            let final = "";
            for await (const chunk of stream) {
                setOngoing((prev) => prev + chunk);
                final += chunk;
            }
            setFinalText(final);
            setShowExplainPopup(true);
        } catch (err) {
            console.error("Error simplifying selection:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ButtonLayer 
                simplified={simplified} 
                onSimplifiedToggle={setSimplified}
            />
            <DocumentViewer simplified={simplified} />
            <Footer />
            <SelectionPopup 
                show={showPopup} 
                position={popupPosition} 
                onExplain={handleSimplifySelection}
            />
            <ExplanationPopup 
                show={showExplainPopup}
                position={popupPosition}
                loading={loading}
                ongoing={ongoing}
                finalText={finalText}
                onClose={() => { 
                    setShowExplainPopup(false); 
                    setFinalText(null); 
                    setOngoing(''); 
                    setSelectedText(''); 
                }}
            />
        </>
    );
}

export default Simplify;