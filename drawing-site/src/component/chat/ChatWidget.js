import { useState } from "react";
import Chat from "./Chat";
import { styles } from "../../styles/ChatStyle";

export default function ChatWidget({ roomName, isOpen, onToggle, username, color }) {
    const [unreadCount, setUnreadCount] = useState(3);

    const handleChatToggle = () => {
        onToggle();

        if (!isOpen) {
            setUnreadCount(0);
        }
    };

    return (
        <>
            <div style={styles.floatingActionContainer}>
                <div style={{ position: "relative" }}>
                    <button onClick={handleChatToggle} style={styles.floatingBtn}>
                        {isOpen ? "✕" : "💬"}

                        {!isOpen && unreadCount > 0 && (
                            <span style={styles.badge}>{unreadCount}</span>
                        )}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div
                    className="animate-popup"
                    style={{
                        ...styles.overlay,
                        transformOrigin: "bottom right" // Animation starts from the button corner
                    }}
                >
                    <Chat roomName={roomName} onClose={onToggle} username={username} color={color} />
                </div>
            )}
        </>
    );
}