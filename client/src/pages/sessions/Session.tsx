import {
  useGetGameScoreboardQuery,
  useGetSessionQuery,
  useStopSessionMutation,
} from "./sessionHooks";
import { Spinner } from "../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../../assets/WideContainer.module.scss";
import { StartGameModal } from "./StartGameModal";
import ScoreboardComponent from "../../components/ScoreboardDisplay";
import { useState } from "react";

export const Session = () => {
  const sessionId = useParams<{ id: string }>().id;
  const navigate = useNavigate();
  const [isStopped, SetisStopped] = useState(false);

  const getSessionQuery = useGetSessionQuery(Number(sessionId));
  const session = getSessionQuery.data;

  const stopSessionMutation = useStopSessionMutation(
    parseInt(String(sessionId))
  );

  const getScoreboardQuery = useGetGameScoreboardQuery(Number(sessionId));

  if (getSessionQuery.isLoading) return <Spinner />;
  if (getSessionQuery.isError) return <h1>Error getting session</h1>;
  if (!session) return <h1>No sessions</h1>;

  if (stopSessionMutation.data) {
    // console.log("data changed");
    console.log("data changed", stopSessionMutation.data);
  }
  return (
    <div className={classes.customContainer}>
      <div className="row">
        <div className="col-lg-2 col-md-4 col-1 my-auto">
          <button className="btn" onClick={() => navigate(-1)}>
            <i className="bi-arrow-left fs-3" />
          </button>
        </div>
        <div className="col-md col-10">
          <h1 className="text-center">{session.name}</h1>
        </div>
        {sessionId && (
          <div className="col-lg-1 col-md-2 col-6 px-0 text-center my-auto">
            <StartGameModal sessionId={sessionId}></StartGameModal>
          </div>
        )}
        <div className="col-lg-1 col-md-2 col-6 px-0 text-center my-auto">
          <button
            className="btn btn-outline-danger"
            disabled={isStopped}
            onClick={() => {
              stopSessionMutation.mutate();
              SetisStopped(true);
            }}
          >
            Stop Game
          </button>
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
        <div className="col-lg text-center">
          <div
            className="border rounded overflowy-scroll d-none d-lg-block"
            style={{ height: "20em", overflowX: "hidden" }}
          >
            {(getScoreboardQuery.data && (
              <ScoreboardComponent scoreBoard={getScoreboardQuery.data} />
            )) ??
              "Scoreboard coming soon"}
          </div>
          <div className="border rounded mt-2" style={{ height: "30em" }}>
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
