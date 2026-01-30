import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:4000";

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect(roomId) {
        if (this.socket?.connected && this.socket.io.opts.query.roomId === roomId) {
            return this.socket;
        }
        if (this.socket) this.socket.disconnect();

        this.socket = io(SOCKET_URL, {
            query: { roomId },
            reconnection: true
        });
        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    // Owner: Listen for server asking for state
    onLoadRequest(callback) {
        if (!this.socket) return;
        this.socket.off("request_current_state"); // Clean up old listeners
        this.socket.on("request_current_state", () => {
            console.log("Owner: Received request to sync canvas...");
            callback();
        });
    }

    // Owner: Send current state back to server
    sendCurrentState(drawingData, roomId) {
        if (this.socket) {
            this.socket.emit("provide_current_state", { drawingData, roomId });
        }
    }

    // Joiner: Receive the state from owner
    onReceiveInitialState(callback) {
        if (!this.socket) return;
        this.socket.off("initial_state_received");
        this.socket.on("initial_state_received", (data) => {
            if (data?.drawingData) callback(data.drawingData);
        });
    }

    // Joiner: Start the join process
    joinByCode(code) {
        return new Promise((resolve, reject) => {
            if (!this.socket) return reject("Socket not connected");
            this.socket.emit("join_by_code", code);
            this.socket.once("initial_state_received", (res) => resolve(res));
            this.socket.once("error", (err) => reject(err));
            setTimeout(() => reject("Sync Timeout"), 5000);
        });
    }

    // Continuous Syncing
    broadcastScene(elements, roomId) {
        if (this.socket?.connected) {
            this.socket.emit("drawing_update", { elements, roomId });
        }
    }

    onDrawingUpdate(callback) {
        if (!this.socket) return;
        this.socket.off("receive_drawing_update");
        this.socket.on("receive_drawing_update", (elements) => callback(elements));
    }

    shareDrawing(drawingData, roomId) {
        return new Promise((resolve, reject) => {
            if (!this.socket) return reject("Socket not connected");
            this.socket.emit("share_drawing", { drawingData, roomId });
            this.socket.once("share_code_generated", (data) => resolve(data.shareCode));
        });
    }
}

export const socketService = new SocketService();