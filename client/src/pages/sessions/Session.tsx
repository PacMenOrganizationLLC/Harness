import { FC, useState } from "react";
import { Session } from "../../models/Session";
import { TextInput, useTextInput } from "../../components/forms/TextInput";

export const SessionManagement: FC<{
  session?: Session;
}> = ({ session }) => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const passwordControl = useTextInput("");

  return (
    <div className="container">
      <h1 className="my-3">[Session] - [Game]</h1>
      <div className="row justify-content-center">
        <div className="col col-6 my-2">
          <p className="fs-2">Created: [date]</p>
        </div>
        <div className="col col-6">
          <p className="fs-2">Duration: [mm:ss]</p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col col-4 border border-3 rounded p-5">
          <div className="row justify-content-center">
            <div className="col">
              <TextInput
                control={passwordControl}
                placeholder="Admin password"
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
