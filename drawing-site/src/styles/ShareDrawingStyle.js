export const shareDrawingStyles = {

    popup: {
        position: "absolute",
        bottom: 70,
        right: 10,
        width: "220px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        padding: "15px",
        zIndex: 1100,
    },

    shareHeader: { 
        display: "flex", 
        justifyContent: "space-between", 
        marginBottom: "10px" 
    },

    shareBody: { 
        display: "flex", 
        flexDirection: "column", 
        gap: "10px", 
        textAlign: "center" 
    },

    codeBox: {
        fontSize: "20px",
        fontWeight: "bold",
        letterSpacing: "2px",
        padding: "10px",
        backgroundColor: "#f3f4f6",
        borderRadius: "8px",
        color: "#4f46e5"
    },

    shareBtn: {
        position: "absolute",
        right: 75,
        bottom: 5,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
    },

    closeBtn: {
        border: "none",
        background: "none",
        fontSize: "18px",
        cursor: "pointer",
        color: "#888",
    },

    sendBtn: {
        backgroundColor: "#4f46e5",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "20px",
        cursor: "pointer",
        fontWeight: "bold",
    },
};