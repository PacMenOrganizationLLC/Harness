import {
  useGetSessionQuery,
} from "./sessionHooks";
import { Spinner } from "../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../../assets/WideContainer.module.scss";
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

      <div className={classes.customContainer + " mt-2"}>
        <div className="row">
          <div className="col-lg-2 col-md-4 col-1 my-auto">
            <button className="btn" onClick={() => navigate(-1)}>
              <i className="bi-arrow-left fs-3" />
            </button>
          </div>
          <div className="col-md-4 col-lg-8 col-10">
            <h1 className="text-center">{!session.competitionId && "Sandbox"} {session.game?.name} {session.id}</h1>
          </div>
        </div>
        {!session.hostUrl || !session.hostUrl.includes("http") ? (
          <div className="text-center">
            <div className="fs-1">Unable to show game</div>
            <div>
              Please check the url is valid:{" "}
              {session.hostUrl ? session.hostUrl : "None"}
            </div>
          </div>
        ) : (
          <iframe
            src={session.hostUrl}
            className="h-100 w-100 rounded"
            title={`Session${session.id}`}
          ></iframe>
        )}
        {/* <div className="col-lg-2 text-center">
            <WebsocketChat />
          </div> */}
      </div>
    </WebsocketProvider>
  );
};
