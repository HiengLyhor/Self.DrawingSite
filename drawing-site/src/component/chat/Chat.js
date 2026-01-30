import { useState, useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { UtilFunctions } from "../../utils/UtilFunctions";
import { styles } from "../../styles/ChatStyle";

export default function Chat({ roomName, onClose, username, color }) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Welcome to the room!",
            sender: "system"
        },
        {
            id: 2,
            name: "Alex",
            text: "Check out this drawing!",
            sender: "other",
            timestamp: "3:45 PM"
        },
        {
            id: 3,
            text: "Alex left the room.",
            sender: "system"
        },
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;

        const newMessage = {
            id: UtilFunctions.generateId(),
            text: input,
            sender: "me",
            name: username,
            timestamp: UtilFunctions.getCurrentTime(),
        };

        console.debug(newMessage);
        console.debug(color);

        setMessages([...messages, newMessage]);
        setInput("");
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={styles.avatar}>{roomName?.[0] || "R"}</div>
                    <strong>Room: {roomName}</strong>
                </div>
                <button onClick={onClose} style={styles.closeBtn}>✕</button>
            </div>

            {/* Messages Area */}
            <div style={styles.messageList} ref={scrollRef}>
                {messages.map((m, i) => (
                    <MessageBubble key={i} message={m} />
                ))}
            </div>

            {/* Input Area */}
            <div style={styles.inputArea}>
                <input
                    placeholder="Type a message..."
                    style={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage} style={styles.sendBtn}>
                    Send
                </button>
            </div>
        </div>
    );
}
