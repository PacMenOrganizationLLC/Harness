import { FC, useEffect, useState } from "react";
import {
  CustomModal,
  ModalButton,
  useModal,
} from "../../components/CustomModal";
import {
  useStartSessionMutation,
  useGetGameConfigsQuery,
} from "./sessionHooks";
import { Spinner } from "../../components/Spinner";
import { GameConfigTemplate, SessionConfig } from "../../models/SessionConfig";

export const StartGameModal: FC<{
  sessionId: string;
}> = ({ sessionId }) => {
  const [config, setConfig] = useState<SessionConfig>();
  const [displayConfig, setDisplayConfig] = useState<GameConfigTemplate[]>();
  const configList = useGetGameConfigsQuery(sessionId);
  const startGame = useStartSessionMutation(Number.parseInt(sessionId));

  const StartSessionControl = useModal("Add Session");
  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      <button className="btn btn-outline-info px-2 py-1" onClick={showModal}>
        Start Game
      </button>
    </div>
  );

  useEffect(() => {
    if (config) {
      setDisplayConfig(JSON.parse(config.jsonConfig));
    }
  }, [config]);

  const closeHandler = () => {
    setConfig(undefined);
    StartSessionControl.hide();
  };
  //error handling

  if (configList.isLoading) return <Spinner />;
  if (configList.isError)
    return <h3 className="text-center">Error getting game configs</h3>;
  if (!configList.data)
    return <h3 className="text-center">Unable to get configs</h3>;

  return (
    <CustomModal ModalButton={ModalButton} controls={StartSessionControl}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title fw-bold fs-4">Select Start Config</div>

          <button className="btn btn-close" onClick={closeHandler}></button>
        </div>
        <div className="modal-body">
          <select
            className="form-select"
            onChange={(e) => {
              setConfig(JSON.parse(e.target.value));
            }}
          >
            <option value="" disabled selected>
              Select Configuration
            </option>
            {configList.data.map((c) => (
              <option key={c.id} value={JSON.stringify(c)}>
                <div className="text-break">{c.name}</div>
              </option>
            ))}
          </select>
          {config && (
            <>
              <p>{config.name}</p>
              {displayConfig?.map((item) => (
                <p>
                  {item.key}: {item.value}
                </p>
              ))}
            </>
          )}
          <div className="text-end">
            <button
              className="btn btn-primary"
              disabled={!config}
              onClick={() => {
                if (config) {
                  startGame.mutate(config);
                  closeHandler();
                }
              }}
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};
