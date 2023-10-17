import { FC, useState } from "react";
import { TextInput, useTextInput } from "../../components/forms/TextInput";
import { useGetSessionQuery } from "./sessionHooks";
import { Spinner } from "../../components/Spinner";

interface SessionProps {
  sessionId: number;
}

export const Session: FC<SessionProps> = ({ sessionId }) => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const passwordControl = useTextInput("");

  const getSessionQuery = useGetSessionQuery(sessionId);
  const session = getSessionQuery.data;

  if (getSessionQuery.isLoading) return <Spinner />
  if (getSessionQuery.isError) return <h1>Error getting session</h1>
  if (!session) return <h1>No sessions</h1>

  return (
    <div className="container">
      <h1 className="my-3">{session.name}</h1>
      <p className="fs-2">Created: {new Date(session.creationDate).toDateString()}</p>
      <div className="row justify-content-center">
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
      </div>
    </div>
  );
};
