import React, { useRef } from "react";
import { useGetSessionQuery } from "./sessionHooks";
import { Spinner } from "../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../../assets/WideContainer.module.scss";
import { WebsocketProvider } from "../../components/chat/WebsocketChatContext";
import { WebsocketChat } from "../../components/chat/WebsocketChat";
import toast from "react-hot-toast";

export const Session = () => {
  const sessionId = useParams<{ id: string }>().id;
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getSessionQuery = useGetSessionQuery(Number(sessionId));
  const session = getSessionQuery.data;

  const toggleFullScreen = () => {
    if (iframeRef.current && !document.fullscreenElement) {
      iframeRef.current.requestFullscreen().catch((err) => {
        toast.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  if (getSessionQuery.isLoading) return <Spinner />;
  if (getSessionQuery.isError) return <h1>Error getting session</h1>;
  if (!session) return <h1>No sessions</h1>;

  return (
    <WebsocketProvider>
      <div className={classes.customContainer + " mt-2"}>
        <div className="row w-100">
          <div className="col-lg-2 col-md-auto col-1 my-auto">
            <button className="btn" onClick={() => navigate(-1)}>
              <i className="bi-arrow-left fs-3"></i>
            </button>
          </div>
          <div className="col-md col-lg-8 col-10 my-auto">
            <h1 className="text-center my-auto">
              {!session.competitionId && "Sandbox"} {session.game?.name}{" "}
              {session.id}
            </h1>
          </div>
          <div className="col-md col-lg-8 col-10 my-auto">
            <h3 className="text-center my-auto">
              Api: {"http://" + session.hostUrl}
            </h3>
          </div>
        </div>
        <div className="row w-100">
          <div className="col-lg-9 col-12">
            <div className="position-relative" style={{ zIndex: 10 }}>
              <button
                className="btn btn-sm btn-outline-secondary bg-transparent position-absolute top-0 end-0 m-2"
                onClick={toggleFullScreen}
                style={{ zIndex: 20 }}
                title="Toggle Fullscreen"
              >
                <i className="bi-fullscreen"></i>
              </button>
              {!session.hostUrl ? (
                <div className="text-center">
                  <div className="fs-1">Unable to show game</div>
                  <div>
                    Please check the url is valid:{" "}
                    {session.hostUrl ? session.hostUrl : "None"}
                  </div>
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  src={"http://" + session.hostUrl}
                  className="w-100 rounded vh-100"
                  title={`Session${session.id}`}
                  style={{ zIndex: 1 }} // Ensure iframe is below the button
                ></iframe>
              )}
            </div>
          </div>
          <div className="col-lg-3 col-12 text-center mt-2 mt-lg-0">
            <WebsocketChat group={`session${sessionId}`} />
          </div>
        </div>
      </div>
    </WebsocketProvider>
  );
};
