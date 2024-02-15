import React, {
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";

import * as signalR from "@microsoft/signalr";

interface WebsocketChatContextType {
  messages: MessageType[];
  sendMessage: (msg: string) => void;
}

interface MessageType {
  from: "sent" | "received";
  content: string;
}

export const WebsocketContext = createContext<WebsocketChatContextType>({
  messages: [],
  sendMessage: () => { },
});

export const WebsocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const connection = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    console.log("Connecting to the WebSocket server...");
  
    if (window.location.hostname === 'localhost') {
      const serverUrl = "http://localhost:8000";
      connection.current = new signalR.HubConnectionBuilder()
        .withUrl(`${serverUrl}/ws/chat`)
        .build();
    } else {
      const serverUrl = "";
      connection.current = new signalR.HubConnectionBuilder()
        .withUrl(serverUrl)
        .build();
    }
  
    connection.current
      .start()
      .then(() => {
        console.log("Connected to the WebSocket server.");
      })
      .catch((error) => {
        console.error("WebSocket Error: ", error);
      });
  
    connection.current
      .on("messageReceived", (msg) => {
        console.log("Received a message:", msg);

        addMessage(msg, "received");
      });
  
    connection.current.onclose = () => {
      console.log("Disconnected from the server.");
    };
  
    return () => {
      connection.current?.stop();
    };
  }, []);

  const addMessage = (msg: string, type: "received" | "sent") => {
    setMessages((prev) => [...prev, { from: type, content: msg }]);
  };

  const sendMessage = (msg: string) => {
    if (connection.current?.state === signalR.HubConnectionState.Connected) {
      connection.current.invoke("NewMessage", msg);
      addMessage(msg, "sent");
    }
  };

  return (
    <WebsocketContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WebsocketContext.Provider>
  );
};