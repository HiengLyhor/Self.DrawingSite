const animals = ["Panda", "Fox", "Koala", "Tiger", "Rabbit", "Dolphin", "Penguin", "Otter", "Elephant"];
const adjectives = ["Creative", "Swift", "Quiet", "Bright", "Happy", "Clever", "brave", "Zen"];
const colors = ["#4f46e5", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];

const adjectivesRoom = ["Golden", "Creative", "Swift", "Infinite", "Cozy", "Digital"];
const nouns = ["Canvas", "Whiteboard", "Studio", "Room", "Draft", "Space"];

export const UtilFunctions = {
    /**
     * Returns the current time in a human-readable format (e.g., "3:45 PM")
     * @returns {string}
     */
    getCurrentTime: () => {
        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        }).format(new Date());
    },

    /**
     * Generates a unique ID for message keys
     * @returns {string}
     */
    generateId: () => {
        return Math.random().toString(36).substring(2, 9);
    },

    /**
     * Generates a unique ID for room keys
     * @returns {string}
     */
    generateRoomId: () => {
        return Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padStart(6, '0');
    },

    /**
     * Generates a random username for each user
     * @returns {string}
     */
    getOrGenerateIdentity: () => {
        const savedName = localStorage.getItem("excalidraw_user_name");

        if (savedName) return savedName;

        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const animal = animals[Math.floor(Math.random() * animals.length)];
        const newName = `${adj} ${animal}`;

        localStorage.setItem("excalidraw_user_name", newName);
        return newName;
    },

    /**
     * Generates a random user color for each user
     * @returns {string}
     */
    getRandomColor: () => {

        const savedColor = localStorage.getItem("excalidraw_color");

        if (savedColor) return savedColor;

        const colorResult = colors[Math.floor(Math.random() * colors.length)];
        localStorage.setItem("excalidraw_color", colorResult);

        return colorResult;
    },

    getRoomName: (roomId) => {
        const charSum = roomId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

        const adj = adjectivesRoom[charSum % adjectivesRoom.length];
        const noun = nouns[charSum % nouns.length];
        const number = (charSum % 10) + 1;

        return `${adj} ${noun} ${number}`;
    },

    showToast(message, type = "success") {
        const event = new CustomEvent("SHOW_TOAST", {
            detail: { message, type }
        });
        window.dispatchEvent(event);
    }
};