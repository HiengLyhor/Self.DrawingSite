import { useState, useEffect, useCallback, useRef } from "react";
import { toastStyles } from "../../styles/ToastStyle";

const TOAST_TYPES = {
    success: "#059669", // Emerald Green
    error: "#dc2626",   // Red
    info: "#4f46e5",    // Indigo
    warning: "#d97706"  // Amber
};

export default function ToastContainer() {
    const [toast, setToast] = useState(null);
    const timerRef = useRef(null);

    const hideToast = useCallback(() => {
        setToast(null);
        if (timerRef.current) clearTimeout(timerRef.current);
    }, []);

    useEffect(() => {
        const handleEvent = (e) => {
            // Clear existing timer if a new toast comes in
            if (timerRef.current) clearTimeout(timerRef.current);

            setToast(e.detail);

            // Auto-hide after 5 seconds
            timerRef.current = setTimeout(hideToast, 5000);
        };

        window.addEventListener("SHOW_TOAST", handleEvent);
        return () => {
            window.removeEventListener("SHOW_TOAST", handleEvent);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [hideToast]);

    if (!toast) return null;

    const backgroundColor = TOAST_TYPES[toast.type] || "#333";

    return (
        <div style={toastStyles.container}>
            <div
                className="animate-popup"
                style={{ ...toastStyles.toast, backgroundColor }}
            >
                <span style={toastStyles.message}>{toast.message}</span>
                <button onClick={hideToast} style={toastStyles.closeBtn}>✕</button>
            </div>
        </div>
    );
}