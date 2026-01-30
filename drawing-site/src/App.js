import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import ChatWidget from "./component/chat/ChatWidget";
import ShareWidget from "./component/share/ShareWidget";
import { styles } from "./styles/ChatStyle";
import { UtilFunctions } from "./utils/UtilFunctions";
import './styles/App.css';

export default function App() {
  const [excalidrawApi, setExcalidrawApi] = useState(null);
  const [activeWidget, setActiveWidget] = useState(null);
  const saveTimeout = useRef(null);

  // 1. Identity & Room Setup
  const roomId = useMemo(() => {
    const id = localStorage.getItem("roomId") ?? UtilFunctions.generateRoomId();
    localStorage.setItem("roomId", id);
    return id;
  }, []);

  const user = useMemo(() => ({
    name: UtilFunctions.getOrGenerateIdentity(),
    color: UtilFunctions.getRandomColor()
  }), []);

  const storageKey = `excalidraw-room-${roomId}`;

  // 2. Initial Data Loading
  const initialData = useMemo(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [storageKey]);

  // 3. Update Collaborators
  useEffect(() => {
    if (!excalidrawApi) return;

    excalidrawApi.updateScene({
      appState: {
        collaborators: new Map([
          ["local", { username: user.name, color: user.color }]
        ]),
      },
    });
  }, [excalidrawApi, user]);

  // 4. Persistence Logic
  const handleChange = useCallback((elements, appState, files) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      const persistableData = {
        elements,
        appState: {
          viewBackgroundColor: appState.viewBackgroundColor,
          currentItemFontFamily: appState.currentItemFontFamily,
          theme: appState.theme,
        },
        files,
      };
      localStorage.setItem(storageKey, JSON.stringify(persistableData));
    }, 300);
  }, [storageKey]);

  const toggleWidget = (name) => setActiveWidget(prev => (prev === name ? null : name));

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Excalidraw
        initialData={initialData}
        onChange={handleChange}
        excalidrawAPI={setExcalidrawApi}
      />

      <div style={styles.floatingActionContainer}>
        <ShareWidget
          roomId={roomId}
          excalidrawApi={excalidrawApi}
          isOpen={activeWidget === 'share'}
          onToggle={() => toggleWidget('share')}
        />
        <ChatWidget
          roomId={roomId}
          username={user.name}
          color={user.color}
          isOpen={activeWidget === 'chat'}
          onToggle={() => toggleWidget('chat')}
        />
      </div>
    </div>
  );
}