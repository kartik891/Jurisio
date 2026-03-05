import Redirect from "./redirect_button";
import { Home } from 'lucide-react';
import { useState } from "react";
import { jsPDF } from 'jspdf';

function ButtonLayer({ simplified, onSimplifiedToggle, onCopyClick }) {
    const [copy, setCopy] = useState(false);

    async function handleCopy() {
        const textToCopy = document.getElementById('simplified-doc').innerText;
        await navigator.clipboard.writeText(textToCopy);
        setCopy(true);
        setTimeout(() => setCopy(false), 2000);
    }

    function handleMode() {
        onSimplifiedToggle(!simplified);
    }

    function handleDownload() {
        try {
            const textToDownload = document.getElementById('simplified-doc').innerText || "";
            if (!textToDownload) return;

            const doc = new jsPDF({
                orientation: "portrait",
                unit: "pt",
                format: "a4",
            });

            doc.setFont("Helvetica", "normal");
            doc.setFontSize(12);

            const lines = doc.splitTextToSize(textToDownload, 500);
            doc.text(lines, 50, 60);
            doc.save("Simplified_Document.pdf");
        } catch (err) {
            console.error("Failed to generate PDF:", err);
        }
    }

    return (
        <div id="button-layer">
            <div id="back-button">
                <Redirect path="/" symbol={<Home />} text="Home" />
            </div>
            <button onClick={handleCopy} id="copy-button">
                {copy ? "Copied" : "Copy Simplified"}
            </button>
            <button onClick={handleDownload} id="download-button">Download</button>

            <label className="switch">
                <input type="checkbox" id="toggleSwitch" onChange={handleMode} />
                <span className="slider"></span>
            </label>
            <p>Only Simplified</p>
        </div>
    );
}

export default ButtonLayer;
