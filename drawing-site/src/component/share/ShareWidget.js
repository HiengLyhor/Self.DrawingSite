import { shareDrawingStyles } from "../../styles/ShareDrawingStyle";
import { useState } from "react";
import { socketService } from "../../utils/SocketService";

export default function ShareWidget({ roomId, excalidrawApi, isOpen, onToggle }) {
    const [shareCode, setShareCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = async () => {
        if (isOpen) {
            onToggle();
            return;
        }

        if (!excalidrawApi) return;
        setLoading(true);

        try {
            const drawingData = {
                elements: excalidrawApi.getSceneElements(),
                appState: excalidrawApi.getAppState(),
            };

            // const code = await socketService.shareDrawing(drawingData, roomId);
            const code = "ABEF96EC";
            setShareCode(code);

            onToggle();

        } catch (err) {
            alert("Error sharing drawing: " + err);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareCode);
            setIsCopied(true);

            // Revert back to "Copy Code" after 2 seconds
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <button
                onClick={handleShare}
                style={{
                    ...shareDrawingStyles.shareBtn,
                    background: "#fff",
                    color: "#4f46e5",
                    border: "2px solid #4f46e5"
                }}
            >
                {loading ? "⌛" : "🎨"}
            </button>

            {isOpen && (
                <div
                    className="animate-popup"
                    style={{
                        ...shareDrawingStyles.popup,
                        transformOrigin: "bottom right"
                    }}
                >
                    <div style={shareDrawingStyles.shareHeader}>
                        <span style={{ fontWeight: "bold" }}>Share Drawing</span>
                        <button onClick={onToggle} style={shareDrawingStyles.closeBtn}>✕</button>
                    </div>
                    <div style={shareDrawingStyles.shareBody}>
                        <p style={{ fontSize: "12px", color: "#666" }}>Give this code to your friends:</p>
                        <div style={shareDrawingStyles.codeBox}>{shareCode}</div>
                        <button
                            onClick={handleCopy}
                            style={{
                                ...shareDrawingStyles.sendBtn,
                                backgroundColor: isCopied ? "#059669" : "#4f46e5",
                                transition: "background-color 0.3s ease"
                            }}
                        >
                            {isCopied ? "✅ Copied!" : "Copy Code"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}