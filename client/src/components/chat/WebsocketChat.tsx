import React, { FormEvent, useContext, useState } from "react";
import { WebsocketContext } from "./WebsocketChatContext";

export const WebsocketChat = () => {
  const context = useContext(WebsocketContext);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) {
      context.sendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="container text-center">
      <h1>Chat</h1>
      <div className="border rounded vh-50 frosted-glass"
        style={{ height: "75ex" }}>
        {context.messages.map((message, index) => (
          <div key={index}>
            {message.from === "received" ? (
              <div className="text-start">
                <span className="border rounded bg-primary-subtle px-2">{message.content}</span>
              </div>
            ) : (
              <div className="text-end">
                <span className="border rounded bg-success-subtle px-2">{message.content}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <div className="row my-1">
          <div className="col offset-lg-4 offset-md-2">
            <input
              type="text"
              autoFocus
              className="form-control"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-lg-4 col-md-2 col-auto text-start">
            <button type="submit"
              className="btn btn-primary">Send</button>
          </div>
        </div>
      </form>
    </div>
  );
};