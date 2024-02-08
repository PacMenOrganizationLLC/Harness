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
      console.log("Sending:", inputValue);

      context.sendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="container text-center">
      <h1 className="fs-5">Chat</h1>
      <div
        className="border rounded vh-50 p-1 overflow-y-scroll"
        style={{ height: "40ex" }}
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
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
