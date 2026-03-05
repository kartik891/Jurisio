import OgDocument from "./original_document";
import SimplifiedDocument from "./simplified_document";

function DocumentViewer({ simplified }) {
    return (
        <div id="simplify-compare">
            {simplified ? simplified : <OgDocument />}
            <SimplifiedDocument />
        </div>
    );
}

export default DocumentViewer;
