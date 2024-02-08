import { FC, FormEvent, useState } from "react";
import { Game } from "../../models/Games";
import {
  CustomModal,
  ModalButton,
  useModal,
} from "../../components/CustomModal";
import { TextInput, useTextInput } from "../../components/forms/TextInput";
import { useAddGameMutation, useUpdateGameMutation } from "./gameHooks";
import ImageSubmit from "../../components/ImageSubmit";

export const GameEditorModal: FC<{
  existingGame?: Game;
  setSelectedGame: (g?: Game) => void;
}> = ({ existingGame, setSelectedGame }) => {
  const addGameMutation = useAddGameMutation();
  const updateGameMutation = useUpdateGameMutation();
  const nameControl = useTextInput(existingGame?.name ?? "");
  const hostUrlControl = useTextInput(existingGame?.hostUrl ?? "");
  const repoLinkControl = useTextInput(existingGame?.repoLink ?? "");
  const detailsControl = useTextInput(existingGame?.details ?? "");
  const createdByControl = useTextInput(existingGame?.createdBy ?? "");
  const [supportsMultiSessions, setSupportsMultiSessions] = useState(
    existingGame?.supportsMultiSessions ?? true
  );

  const [image, setImage] = useState("");
  const handleSetConvertedSrc = (imageSrc: string | undefined) => {
    // Implement the logic to set the converted source image here
    if (imageSrc) {
      const imageChoice = imageSrc.split("base64,")[1];
      setImage(imageChoice ?? "");
      console.log("Converted image source:", imageSrc);
      //data:image/png;base64,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
    }
  };

  const gameEditorControls = useModal("Game Editor", "lg");

  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      {existingGame ? (
        <button className="btn btn-outline-secondary" onClick={showModal}>
          <i className="bi bi-pencil" />
        </button>
      ) : (
        <button className="btn btn-outline-info" onClick={showModal}>
          New
        </button>
      )}
    </div>
  );

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newGame: Game = {
      id: existingGame?.id ?? 0,
      name: nameControl.value,
      repoLink: repoLinkControl.value,
      hostUrl: hostUrlControl.value,
      details: detailsControl.value,
      createdBy: createdByControl.value,
      createdAt: new Date(),
      supportsMultiSessions,
    };
    if (existingGame) {
      updateGameMutation.mutate(newGame);
    } else {
      addGameMutation.mutate(newGame);
    }
    setSelectedGame(undefined);

    closeHandler();
  };

  const closeHandler = () => {
    if (!existingGame) {
      nameControl.setValue("");
      repoLinkControl.setValue("");
      hostUrlControl.setValue("");
      detailsControl.setValue("");
      createdByControl.setValue("");
    }
    gameEditorControls.hide();
  };

  const canSubmit =
    nameControl.value !== "" &&
    ((!supportsMultiSessions && hostUrlControl.value !== "") ||
      supportsMultiSessions) &&
    createdByControl.value !== "";
  return (
    <CustomModal ModalButton={ModalButton} controls={gameEditorControls}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title fw-bold fs-4">
            {existingGame ? "Edit Game" : "New Game"}
          </div>
          <button
            className="btn-close"
            onClick={closeHandler}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form onSubmit={submitHandler}>
            <TextInput
              control={nameControl}
              label="*Name"
              labelClassName="col-12"
            />
            <div className="form-check form-switch mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="supportsMultiSessionsSwitch"
                onChange={() => setSupportsMultiSessions((s) => !s)}
                checked={supportsMultiSessions}
              />
              <label
                className="form-check-label"
                htmlFor="supportsMultiSessionsSwitch"
              >
                Game Supports Multiple Sessions
              </label>
            </div>
            {!supportsMultiSessions && (
              <TextInput
                control={hostUrlControl}
                label="*Host URL"
                placeholder="https://your_server"
                labelClassName="col-12"
              />
            )}
            <TextInput
              control={repoLinkControl}
              label="Repo Link"
              placeholder="https://github.com/your_repo"
              labelClassName="col-12"
            />
            <TextInput
              control={detailsControl}
              label="Details"
              placeholder="Rules, Instructions, etc."
              isTextArea={true}
              labelClassName="col-12"
            />
            <TextInput
              control={createdByControl}
              label="*Created By"
              placeholder="John Smith"
              labelClassName="col-12"
            />
            <div className="small">*Required</div>
            <div className="row text-center my-2">
              <div className="col">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={closeHandler}
                >
                  Close
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-primary"
                  disabled={!canSubmit}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="row text-center my-2">
              <div className="col">
                <ImageSubmit setConvertedSrc={handleSetConvertedSrc} />
                {image && <img src={image} />}
              </div>
            </div>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};
