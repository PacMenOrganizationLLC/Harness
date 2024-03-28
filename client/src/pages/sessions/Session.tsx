import { useGetSessionQuery } from "./sessionHooks";
import { Spinner } from "../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../../assets/WideContainer.module.scss";
import { WebsocketProvider } from "../../components/chat/WebsocketChatContext";
import { WebsocketChat } from "../../components/chat/WebsocketChat";

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
      <div className={classes.customContainer + " mt-2"}>
        <div className="row w-100">
          <div className="col-lg-2 col-md-auto col-1 my-auto">
            <button className="btn" onClick={() => navigate(-1)}>
              <i className="bi-arrow-left fs-3" />
            </button>
          </div>
          <div className="col-md col-lg-8 col-10 my-auto">
            <h1 className="text-center my-auto">
              {!session.competitionId && "Sandbox"} {session.game?.name}{" "}
              {session.id}
            </h1>
            <h3 className="text-right my-auto">
              {"http://" + session.hostUrl}
            </h3>
          </div>
        </div>
        <div className="row w-100">
          <div className="col-9">
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
                src={"http://" + session.hostUrl}
                className="w-100 rounded vh-100"
                title={`Session${session.id}`}
              ></iframe>
            )}
          </div>
          <div className="col-3 text-center">
            <WebsocketChat group={`session${sessionId}`} />
          </div>
        </div>
      </div>
    </WebsocketProvider>
  );
};
