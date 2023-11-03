import { FC, FormEvent, useEffect, useState } from "react";
import { TextInput, useTextInput } from "../../components/forms/TextInput";
import {
  CustomModal,
  ModalButton,
  useModal,
} from "../../components/CustomModal";
import { useStartSessionMutation, useGetGameConfigsQuery } from "./sessionHooks";
import { Session } from "../../models/Session";
import { Spinner } from "../../components/Spinner";
import { GameConfigTemplate, SessionConfig } from "../../models/SessionConfig";
import { start } from "repl";

export const StartGameModal: FC<{
  sessionId: string;
}> = ({ sessionId }) => {
  const [config, setConfig] = useState<SessionConfig>();
  const [keyList, setKeyList] = useState<GameConfigTemplate[]>();
  const configList = useGetGameConfigsQuery(sessionId);
  const startGame = useStartSessionMutation(Number.parseInt(sessionId));
  useEffect(() => {
    // Your function to convert string to format
    if(config){
        const displayConfig: GameConfigTemplate[] = JSON.parse(config.jsonConfig)
        setKeyList(displayConfig)
    }
  }, [config]);

  const StartSessionControl = useModal("Add Session");
  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      <button className="btn btn-outline-info px-2 py-1" onClick={showModal}>
        Start Game
      </button>
    </div>
  );

  const closeHandler = () => {
    setConfig(undefined);
    StartSessionControl.hide();
  };
//error handling

  if (configList.isLoading) return <Spinner />
  if (configList.isError) return <h3 className="text-center">Error getting game configs</h3>
  if (!configList.data) return <h3 className="text-center">Unable to get configs</h3>

  return (
    <CustomModal ModalButton={ModalButton} controls={StartSessionControl}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title fw-bold fs-4">Select Start Config</div>
          <button className="btn btn-primary" disabled={!config}
          onClick={() =>{
            // startGame(keyList)
            if(config){
                startGame.mutate(config)
                closeHandler
            }
          }

          }>Start Game</button>
          <button className="btn btn-close" onClick={closeHandler}></button>
        </div>
        <div className="modal-body">

            {config && (
                <>
                <p>{config.name}</p>
                <p>{config.jsonConfig}</p>
                {keyList?.map((k) => {
                    <p>{k.key}: {k.value}</p>
                })}
                </>
            )}

            {configList.data.map((c) => (
        <div className="col-lg-3 col-md-6 col-12 my-1 px-1" key={c.id}>
            <button className="btn btn-primary" onClick={ () =>{
                setConfig(c)
            }}>{c.name}</button>
        </div>
      ))}
           <p>hi</p>
        </div>
      </div>
    </CustomModal>
  );
};