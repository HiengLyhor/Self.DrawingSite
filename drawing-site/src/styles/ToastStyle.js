
export const toastStyles = {
    container: {
        position: "fixed",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        pointerEvents: "none", // Allow clicks to pass through to Excalidraw if not on toast
    },
    toast: {
        pointerEvents: "auto",
        backgroundColor: "#333",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "14px",
        animation: "slideUp 0.3s ease-out",
    },
    closeBtn: {
        background: "none",
        border: "none",
        color: "#aaa",
        cursor: "pointer",
        fontSize: "16px",
        padding: "0 4px",
    }
};