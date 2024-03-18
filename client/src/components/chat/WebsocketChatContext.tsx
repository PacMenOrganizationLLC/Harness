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
  sendMessage: (msg: string, group: string) => void;
  joinGroup: (group: string) => void;
  leaveGroup: (group: string) => void;
  isConnected: boolean;
}

interface MessageType {
  from: "sent" | "received";
  content: string;
}

export const WebsocketContext = createContext<WebsocketChatContextType>({
  messages: [],
  sendMessage: () => { },
  joinGroup: () => { },
  leaveGroup: () => { },
  isConnected: false
});

export const WebsocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const connection = useRef<signalR.HubConnection | null>(null);
  const actionQueue = useRef<Array<() => void>>([]);

  useEffect(() => {
    console.log("Connecting to the WebSocket server...");

    if (window.location.hostname === 'localhost') {
      const serverUrl = "http://localhost:8000";
      connection.current = new signalR.HubConnectionBuilder()
        .withUrl(`${serverUrl}/ws/chat`)
        .build();
    } else {
      const serverUrl = process.env.REACT_APP_API_URL + "/ws/chat" ?? "";
      connection.current = new signalR.HubConnectionBuilder()
        .withUrl(serverUrl)
        .build();
    }

    connection.current.start().then(() => {
      console.log("Connected to the WebSocket server.");
      setIsConnected(true);
      actionQueue.current.forEach(action => action());
      actionQueue.current = [];
    }).catch((error) => console.error("WebSocket Error: ", error));

    connection.current
      .on("messageReceived", (msg) => {
        console.log("Received a message:", msg);

        addMessage(msg, "received");
      });

    connection.current.onclose = () => {
      console.log("Disconnected from the server.");
    };

    return () => {
      connection.current?.stop().then(() => setIsConnected(false));
    };
  }, []);

  const addMessage = (msg: string, type: "received" | "sent") => {
    setMessages((prev) => [...prev, { from: type, content: msg }]);
  };

  const sendMessage = (msg: string, group: string) => {
    if (connection.current?.state === signalR.HubConnectionState.Connected) {
      connection.current.invoke("NewMessage", msg, group);
      addMessage(msg, "sent");
    }
  };

  const executeOrQueueAction = (action: () => void) => {
    if (isConnected) {
      action();
    } else {
      actionQueue.current.push(action);
    }
  };

  const joinGroup = (group: string) => {
    executeOrQueueAction(() => connection.current?.invoke("JoinGroup", group));
  };

  const leaveGroup = (group: string) => {
    executeOrQueueAction(() => connection.current?.invoke("LeaveGroup", group));
  };

  return (
    <WebsocketContext.Provider value={{ messages, sendMessage, joinGroup, leaveGroup, isConnected }}>
      {children}
    </WebsocketContext.Provider>
  );
};