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
    }
};