import {
  useGetSessionQuery,
} from "./sessionHooks";
import { Spinner } from "../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../../assets/WideContainer.module.scss";
import { WebsocketChat } from "../../components/chat/WebsocketChat";
import { WebsocketProvider } from "../../components/chat/WebsocketChatContext";

export const Session = () => {
  const sessionId = useParams<{ id: string }>().id;
  const navigate = useNavigate();

  const getSessionQuery = useGetSessionQuery(Number(sessionId));
  const session = getSessionQuery.data;

  if (getSessionQuery.isLoading) return <Spinner />;
  if (getSessionQuery.isError) return <h1>Error getting session</h1>;
  if (!session) return <h1>No sessions</h1>;

  return (
    <WebsocketProvider>

      <div className={classes.customContainer}>
        <div className="row">
          <div className="col-lg-2 col-md-4 col-1 my-auto">
            <button className="btn" onClick={() => navigate(-1)}>
              <i className="bi-arrow-left fs-3" />
            </button>
          </div>
          <div className="col-md-4 col-lg-8 col-10">
            <h1 className="text-center">{session.name}</h1>
          </div>
        </div>
        <div className="row vh-100 mt-1">
          <div className="col-lg-10 vh-100 border rounded px-0">
            {!session.playUrl || !session.playUrl.includes("http") ? (
              <div className="text-center">
                <div className="fs-1">Unable to show game</div>
                <div>
                  Please check the url is valid:{" "}
                  {session.playUrl ? session.playUrl : "None"}
                </div>
              </div>
            ) : (
              <iframe
                src={session.playUrl}
                className="h-100 w-100 rounded"
                title={`Session${session.playId}`}
              ></iframe>
            )}
          </div>
          <div className="col-lg-2 text-center">
            <WebsocketChat />
          </div>
        </div>
      </div>
    </WebsocketProvider>
  );
};
