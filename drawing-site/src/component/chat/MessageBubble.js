import { useState } from "react";
import { styles } from "../../styles/ChatStyle";

export function MessageBubble({ message }) {
    const [isHovered, setIsHovered] = useState(false);
    const { text, sender, name, timestamp } = message;

    if (sender === "system") {
        return (
            <div style={styles.systemWrapper}>
                <span style={styles.systemText}>{text}</span>
            </div>
        );
    }

    const isMe = sender === "me";

    return (
        <div 
            style={styles.messageWrapper(isMe)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!isMe && <span style={styles.senderName}>{name}</span>}

            <div
                style={{
                    ...styles.bubble(isMe),
                    /* Add a slight 'lift' effect on hover */
                    transform: isHovered ? "translateY(-1px)" : "translateY(0)",
                    transition: "all 0.2s ease",
                    filter: isHovered ? "brightness(0.95)" : "none",
                }}
            >
                {text}
            </div>

            {/* Timestamp appears based on hover state */}
            <div
                style={{
                    ...styles.timestamp(isMe),
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.2s ease",
                    pointerEvents: "none",
                }}
            >
                {timestamp}
            </div>
        </div>
    );
}