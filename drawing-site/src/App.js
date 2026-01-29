import { Excalidraw } from "@excalidraw/excalidraw";
import { useState, useEffect } from "react";
import ChatWidget from "./component/chat/ChatWidget";
import ShareWidget from "./component/share/ShareWidget";
import './styles/App.css';
import { styles } from "./styles/ChatStyle";
import { UtilFunctions } from "./utils/UtilFunctions";

export default function App() {

  const [excalidrawApi, setExcalidrawApi] = useState(null);
  const [activeWidget, setActiveWidget] = useState(null);

  const [user] = useState(() => ({
    name: UtilFunctions.getOrGenerateIdentity(),
    color: UtilFunctions.getRandomColor()
  }));

  useEffect(() => {
    if (excalidrawApi) {
      excalidrawApi.updateScene({
        appState: {
          collaborators: new Map([
            ["local", { username: user.name, color: user.color }]
          ])
        }
      });
    }
  }, [excalidrawApi, user]);

  const uniqueRoomId = UtilFunctions.generateRoomId();

  const toggleWidget = (name) => {
    setActiveWidget(prev => (prev === name ? null : name));
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawApi(api)}
      />

      <div style={styles.floatingActionContainer}>
        <ShareWidget
          roomId={uniqueRoomId}
          excalidrawApi={excalidrawApi}
          isOpen={activeWidget === 'share'}
          onToggle={() => toggleWidget('share')}
        />

        <ChatWidget
          roomId={uniqueRoomId}
          username={user.name}
          color={user.color}
          isOpen={activeWidget === 'chat'}
          onToggle={() => toggleWidget('chat')}
        />
      </div>
    </div>
  );
}