function SelectionPopup({ show, position, onExplain }) {
    if (!show) return null;

    return (
        <div
            className="simplify-popup"
            style={{
                position: "absolute",
                top: position.y,
                left: position.x,
                transform: "translate(-50%, -100%)",
                background: "hsl(0, 0%, 15%)",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "6px 10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                zIndex: 999,
            }}
        >
            <button onClick={onExplain}>Explain</button>
        </div>
    );
}

export default SelectionPopup;
