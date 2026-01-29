import { io } from "socket.io-client";

// Update with your actual backend URL
const SOCKET_URL = "http://localhost:4000";

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect(roomId) {
        if (this.socket) return;
        this.socket = io(SOCKET_URL, { query: { roomId } });

        this.socket.on("connect", () => {
            console.log("Connected to WebSocket:", this.socket.id);
        });
    }

    // Core "Share" function
    shareDrawing(drawingData, roomId) {
        return new Promise((resolve, reject) => {
            if (!this.socket) return reject("Socket not connected");

            // Emit the event to the backend
            this.socket.emit("share_drawing", { drawingData, roomId });

            // Listen for the unique code response
            this.socket.once("share_code_generated", (data) => {
                resolve(data.shareCode);
            });

            // Handle errors
            this.socket.once("error", (err) => reject(err));
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export const socketService = new SocketService();