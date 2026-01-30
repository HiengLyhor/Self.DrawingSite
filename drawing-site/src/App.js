import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import ChatWidget from "./component/chat/ChatWidget";
import ShareWidget from "./component/share/ShareWidget";
import { styles } from "./styles/ChatStyle";
import { UtilFunctions } from "./utils/UtilFunctions";
import { socketService } from "./utils/SocketService";
import ToastContainer from "./component/ui/ToastContainer";
import './styles/App.css';

export default function App() {
  // --- REFS & STATE ---
  const [excalidrawApi, setExcalidrawApi] = useState(null);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [activeWidget, setActiveWidget] = useState(null);
  const [activeRoomId, setActiveRoomId] = useState(null);

  const isInitialSyncDone = useRef(true);
  const saveTimeout = useRef(null);

  // --- IDENTITY & ROOM SETUP ---
  const { roomId, roomName } = useMemo(() => {
    const id = localStorage.getItem("roomId") ?? UtilFunctions.generateRoomId();
    localStorage.setItem("roomId", id);
    return { roomId: id, roomName: UtilFunctions.getRoomName(id) };
  }, []);

  const user = useMemo(() => ({
    name: UtilFunctions.getOrGenerateIdentity(),
    color: UtilFunctions.getRandomColor()
  }), []);

  const storageKey = `excalidraw-room-${roomId}`;

  // --- INITIAL DATA LOADING ---
  const initialData = useMemo(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [storageKey]);

  // --- COLLABORATION HANDLERS ---
  const startCollaboration = useCallback((joinId) => {
    if (!excalidrawApi) return;

    const targetRoomId = joinId || roomId;
    setActiveRoomId(targetRoomId);

    // If I'm the owner (no joinId), I'm ready. 
    // If I'm joining, I wait for the owner's data to unlock.
    isInitialSyncDone.current = !joinId;

    socketService.connect(targetRoomId);
    setIsCollaborating(true);

    // OWNER: Always listen and respond
    socketService.onLoadRequest(() => {
      console.log("Owner: Pushing latest state to room...");
      const state = {
        elements: excalidrawApi.getSceneElements(),
        appState: excalidrawApi.getAppState(),
        files: excalidrawApi.getFiles(),
      };
      socketService.sendCurrentState(state, targetRoomId);
    });

    // JOINER: Unlock the board when state arrives
    socketService.onReceiveInitialState((incoming) => {
      console.log("Joiner: State received, unlocking edits.");
      isInitialSyncDone.current = true; // THIS UNLOCKS EDITING

      excalidrawApi.updateScene({
        elements: incoming.elements,
        appState: {
          ...incoming.appState,
          collaborators: new Map([["local", { username: user.name, color: user.color }]])
        },
        files: incoming.files,
      });
    });

    socketService.onDrawingUpdate((remoteElements) => {
      excalidrawApi.updateScene({
        elements: remoteElements,
        commitToHistory: false,
      });
    });
  }, [excalidrawApi, roomId, user]);

  // --- MAIN CHANGE HANDLER ---
  const handleChange = useCallback((elements, appState, files) => {
    // 1. Auto-save to LocalStorage
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

    // 2. Collaboration Broadcast
    const isLocalMutation = appState.editingElement || appState.draggingElement ||
      appState.resizingElement || appState.selectionElement;

    if (isCollaborating && activeRoomId && isLocalMutation) {
      if (isInitialSyncDone.current) {
        socketService.broadcastScene(elements, activeRoomId);
      } else {
        console.warn("Broadcast blocked: Waiting for initial sync from owner.");
      }
    }
  }, [isCollaborating, activeRoomId, storageKey]);

  // --- LIFECYCLE ---
  useEffect(() => {
    return () => {
      if (isCollaborating) socketService.disconnect();
    };
  }, [isCollaborating]);

  // Initialize collaborators on API load
  useEffect(() => {
    if (excalidrawApi) {
      excalidrawApi.updateScene({
        appState: {
          collaborators: new Map([["local", { username: user.name, color: user.color }]]),
        },
      });
    }
  }, [excalidrawApi, user]);

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
          onStartCollab={startCollaboration}
        />
        <ChatWidget
          roomName={roomName}
          username={user.name}
          color={user.color}
          isOpen={activeWidget === 'chat'}
          onToggle={() => toggleWidget('chat')}
        />
      </div>
      <ToastContainer />
    </div>
  );
}