import { useGetSessionQuery } from "./sessionHooks";
import { Spinner } from "../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../../assets/WideContainer.module.scss"
import { StartGameModal } from "./StartGameModal";

export const Session = () => {
  const sessionId = useParams<{ id: string }>().id;
  const navigate = useNavigate();

  const getSessionQuery = useGetSessionQuery(Number(sessionId));
  const session = getSessionQuery.data;

  if (getSessionQuery.isLoading) return <Spinner />
  if (getSessionQuery.isError) return <h1>Error getting session</h1>
  if (!session) return <h1>No sessions</h1>

  return (
    <div className={classes.customContainer}>
      <div className="row">
        <div className="col-1 my-auto">
          <button className="btn"
            onClick={() => navigate(-1)}>
            <i className="bi-arrow-left fs-3" />
          </button>
          {sessionId && (
          <StartGameModal sessionId={sessionId}></StartGameModal>
          )}
          
        </div>
        <div className="col-10">
          <h1 className="text-center">{session.name}</h1>
        </div>
      </div>
      <div className="row vh-100">
        <div className="col-10 vh-100 border rounded px-0">
          {(!session.playUrl || !session.playUrl.includes("http")) ? (
            <div className="text-center">
              <div className="fs-1">Unable to show game</div>
              <div>Please check the url is valid: {session.playUrl ? session.playUrl : "None"}</div>
            </div>
          ) : (
            <iframe src={session.playUrl}
              className="h-100 w-100 rounded"
              title={`Session${session.playId}`}></iframe>
          )}
        </div>
        <div className="col text-center">
          <div className="border rounded"
            style={{ height: "20em" }}>
            Scoreboard coming soon
          </div>
          <div className="border rounded mt-2"
            style={{ height: "30em" }}>
            Chat coming soon
          </div>
        </div>
      </div>
      {/* <div className="row justify-content-center">
        <div className="col col-4 border border-3 rounded p-5">
          <div className="row justify-content-center">
            <div className="col">
              <TextInput
                control={passwordControl}
                placeholder="Password"
              />
            </div>
            <div className="col-auto">
              <button
                className={`btn btn-${hasStarted ? "danger" : "success"}`}
                onClick={() => setHasStarted((oldBool) => !oldBool)}
              >
                {hasStarted ? "End" : "Start"}
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
