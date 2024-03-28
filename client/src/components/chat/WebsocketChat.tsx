import React, { FormEvent, useContext, useState, useEffect, useRef, FC } from "react";
import { WebsocketContext } from "./WebsocketChatContext";

export const WebsocketChat: FC<{
  group: string
}> = ({ group }) => {
  const context = useContext(WebsocketContext);
  const [inputValue, setInputValue] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement | null>(null); // Use this ref for the container

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      chatContainerRef.current.scrollTop = scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [context.messages]);

  useEffect(() => {
    if (context.isConnected) {
      context.joinGroup(group);
    } else {
      console.log("Connection not ready");
    }

    return () => {
      context.leaveGroup(group);
    };
  }, [group, context, context.isConnected]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue) {
      console.log("Sending to group", group, ":", inputValue);

      context.sendMessage(inputValue, group);
      setInputValue("");
    }

    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, 500);
  };

  return (
    <>
      <div
        ref={chatContainerRef}
        className="border rounded h-50 p-1 overflow-y-auto"
        style={{ maxHeight: "60vh", minHeight: "40vh" }}
      >
        {context.messages.map((message, index) => (
          <div key={index}>
            {message.from === "received" ? (
              <div className="text-start">
                <p className="m-0 ms-2" style={{ fontSize: "12px" }}>
                  Anonymous
                </p>
                <span
                  className="border rounded bg-primary-subtle mb-1 px-2 d-inline-block overflow-hidden"
                  style={{ maxWidth: "75%" }}
                >
                  {message.content}
                </span>
              </div>
            ) : (
              <div className="text-end">
                <p className="m-0 me-2" style={{ fontSize: "12px" }}>
                  You
                </p>
                <span
                  className="border rounded bg-success-subtle mb-1 px-2 d-inline-block overflow-hidden"
                  style={{ maxWidth: "75%" }}
                >
                  {message.content}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <div className="row my-1">
          <div className="col">
            <input
              type="text"
              autoFocus
              className="form-control"
              maxLength={300}
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary"
              disabled={isDisabled}>
              Send
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
