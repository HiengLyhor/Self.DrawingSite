export const styles = {

    floatingActionContainer: {
        position: "absolute",
        right: 5,
        bottom: 5,
        zIndex: 1000,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "15px",
    },

    // --- Functional Styles (Dynamic) ---
    messageWrapper: (isMe) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: isMe ? "flex-end" : "flex-start",
        width: "100%",
        position: "relative",
    }),

    bubble: (isMe) => ({
        maxWidth: "80%",
        padding: "8px 16px",
        fontSize: "14px",
        lineHeight: "1.4",
        borderRadius: isMe ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
        backgroundColor: isMe ? "#4f46e5" : "#e9e9eb",
        color: isMe ? "white" : "#1f2937",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        cursor: "pointer",
    }),

    timestamp: (isMe) => ({
        fontSize: "10px",
        color: "#9ca3af",
        marginTop: "4px",
        padding: isMe ? "0 4px 0 0" : "0 0 0 4px",
    }),

    // --- Layout Containers ---
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#fff",
        fontFamily: "sans-serif",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
    },

    overlay: {
        position: "absolute",
        right: 20,
        bottom: 70,
        width: 500,
        height: 720,
        minWidth: 250,
        minHeight: 300,
        background: "white",
        borderRadius: 12,
        boxShadow: "0 10px 40px rgba(0,0,0,.2)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        resize: "both",
        overflow: "hidden",
    },

    // --- Header ---
    header: {
        padding: "12px 16px",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    avatar: {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        backgroundColor: "#007bff",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
    },

    closeBtn: {
        border: "none",
        background: "none",
        fontSize: "18px",
        cursor: "pointer",
        color: "#888",
    },

    // --- Message List Area ---
    messageList: {
        flex: 1,
        padding: "16px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        backgroundColor: "#f9fafb",
    },

    senderName: {
        fontSize: "11px",
        color: "#888",
        marginLeft: "8px",
        marginBottom: "2px",
    },

    // --- System Messages ---
    systemWrapper: {
        display: "flex",
        justifyContent: "center",
        margin: "15px 0",
    },

    systemText: {
        fontSize: "11px",
        color: "#9ca3af",
        backgroundColor: "#f3f4f6",
        padding: "3px 10px",
        borderRadius: "10px",
        textTransform: "uppercase",
    },

    // --- Input Area ---
    inputArea: {
        display: "flex",
        padding: "15px",
        gap: "10px",
        borderTop: "1px solid #eee",
    },

    input: {
        flex: 1,
        padding: "10px 15px",
        borderRadius: "20px",
        border: "1px solid #ddd",
        outline: "none",
    },

    sendBtn: {
        backgroundColor: "#4f46e5",
        color: "white",
        border: "none",
        padding: "0 20px",
        borderRadius: "20px",
        cursor: "pointer",
        fontWeight: "bold",
    },

    // --- Floating Button ---
    buttonWrapper: {
        position: "absolute",
        right: 10,
        bottom: 10,
        zIndex: 1000,
    },

    floatingBtn: {
        position: "relative",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        border: "none",
        background: "#4f46e5",
        color: "white",
        cursor: "pointer",
        fontSize: "22px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },

    shareBtn: {
        position: "absolute",
        right: 75,
        bottom: 5,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
    },

    badge: {
        position: "absolute",
        top: -2,
        right: -2,
        backgroundColor: "#ef4444",
        color: "white",
        fontSize: "11px",
        fontWeight: "bold",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid white",
    },

    popup: {
        position: "absolute",
        bottom: 70,
        right: 0,
        width: "220px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        padding: "15px",
        zIndex: 1100,
    },
    shareHeader: { display: "flex", justifyContent: "space-between", marginBottom: "10px" },
    shareBody: { display: "flex", flexDirection: "column", gap: "10px", textAlign: "center" },
    codeBox: {
        fontSize: "20px",
        fontWeight: "bold",
        letterSpacing: "2px",
        padding: "10px",
        backgroundColor: "#f3f4f6",
        borderRadius: "8px",
        color: "#4f46e5"
    }
};