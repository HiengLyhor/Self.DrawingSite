import { Excalidraw } from "@excalidraw/excalidraw";
import { useState } from "react";
import ChatWidget from "./component/chat/ChatWidget";
import ShareWidget from "./component/share/ShareWidget";
import './styles/App.css';
import { styles } from "./styles/ChatStyle";

export default function App() {

  const [excalidrawApi, setExcalidrawApi] = useState(null);
  const [activeWidget, setActiveWidget] = useState(null);

  const toggleWidget = (name) => {
    setActiveWidget(prev => (prev === name ? null : name));
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Excalidraw excalidrawAPI={(api) => setExcalidrawApi(api)} />

      <div style={styles.floatingActionContainer}>
        <ShareWidget
          roomId="Whiteboard-1"
          excalidrawApi={excalidrawApi}
          isOpen={activeWidget === 'share'}
          onToggle={() => toggleWidget('share')}
        />

        <ChatWidget
          roomId="Whiteboard-1"
          isOpen={activeWidget === 'chat'}
          onToggle={() => toggleWidget('chat')}
        />
      </div>
    </div>
  );
}