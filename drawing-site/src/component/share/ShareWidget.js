import { shareDrawingStyles } from "../../styles/ShareDrawingStyle";
import { useState } from "react";
import { socketService } from "../../utils/SocketService";
import { UtilFunctions } from "../../utils/UtilFunctions";

export default function ShareWidget({ roomId, excalidrawApi, isOpen, onToggle, onStartCollab }) {
    const [mode, setMode] = useState("share"); // "share" or "join"
    const [shareCode, setShareCode] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = async () => {
        if (!excalidrawApi) return;
        setLoading(true);
        try {

            UtilFunctions.showToast("Generating your code...");

            onStartCollab();
            const drawingData = {
                elements: excalidrawApi.getSceneElements(),
                appState: excalidrawApi.getAppState(),
            };
            const code = await socketService.shareDrawing(drawingData, roomId);
            // const code = "AB12FE";
            setShareCode(code);
        } catch (err) {
            // alert("Error sharing: " + err);
            UtilFunctions.showToast("Error sharing: " + err, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = async () => {
        if (!inputCode.trim()) return;
        setLoading(true);
        try {

            socketService.connect("pending");
            // 1. Join by code and get the session data from the server
            const session = await socketService.joinByCode(inputCode.trim().toUpperCase());

            // 2. Start collaboration using the OWNER'S roomId
            onStartCollab(session.roomId);

            onToggle();
            UtilFunctions.showToast("Connected to friend's board!", "success");
        } catch (err) {
            UtilFunctions.showToast("Join failed: " + err, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        UtilFunctions.showToast("Code copied to clipboard!");
    };

    return (
        <div style={{ position: "relative" }}>
            <button onClick={onToggle} style={shareDrawingStyles.shareBtn}>
                {loading ? "⌛" : "🎨"}
            </button>

            {isOpen && (
                <div className="animate-popup" style={shareDrawingStyles.popup}>
                    <div style={shareDrawingStyles.shareHeader}>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <span
                                onClick={() => setMode("share")}
                                style={{ cursor: "pointer", fontWeight: mode === "share" ? "bold" : "normal", borderBottom: mode === "share" ? "2px solid #4f46e5" : "none" }}
                            >Share</span>
                            <span
                                onClick={() => setMode("join")}
                                style={{ cursor: "pointer", fontWeight: mode === "join" ? "bold" : "normal", borderBottom: mode === "join" ? "2px solid #4f46e5" : "none" }}
                            >Join</span>
                        </div>
                        <button onClick={onToggle} style={shareDrawingStyles.closeBtn}>✕</button>
                    </div>

                    <div style={shareDrawingStyles.shareBody}>
                        {mode === "share" ? (
                            <>
                                <p style={{ fontSize: "12px", color: "#666" }}>Generate a temporary code:</p>
                                {shareCode ? (
                                    <div style={shareDrawingStyles.codeBox}>{shareCode}</div>
                                ) : (
                                    <button onClick={handleShare} style={shareDrawingStyles.sendBtn}>Generate Code</button>
                                )}
                                {shareCode && (
                                    <button onClick={handleCopy} style={{ ...shareDrawingStyles.sendBtn, backgroundColor: isCopied ? "#059669" : "#4f46e5" }}>
                                        {isCopied ? "✅ Copied!" : "Copy Code"}
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                <p style={{ fontSize: "12px", color: "#666" }}>Enter friend's code:</p>
                                <input
                                    value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                                    placeholder="e.g. ABEF96"
                                    style={{ width: "90%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", marginBottom: "10px", textAlign: "center", textTransform: "uppercase" }}
                                />
                                <button onClick={handleJoin} style={shareDrawingStyles.sendBtn}>Join Board</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}