function ExplanationPopup({ show, position, loading, ongoing, finalText, onClose }) {
    if (!show) return null;

    return (
        <div
            className="simplify-explain-popup"
            style={{ 
                position: 'absolute', 
                top: position.y + 40, 
                left: position.x, 
                transform: 'translate(-50%, 0)' 
            }}
        >
            <div className="content">
                <h3 style={{ fontWeight: 600 }}>Explanation</h3>
                {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="loader" />
                        <span>{ongoing}</span>
                    </div>
                ) : (
                    <>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{finalText}</p>
                    </>
                )}
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ExplanationPopup;
