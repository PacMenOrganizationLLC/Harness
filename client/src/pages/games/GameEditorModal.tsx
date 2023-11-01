import { FC, FormEvent, useState } from "react"
import { Game } from "../../models/Games"
import { CustomModal, ModalButton, useModal } from "../../components/CustomModal"
import { TextInput, useTextInput } from "../../components/forms/TextInput"
import { useAddGameMutation, useUpdateGameMutation } from "./gameHooks"

export const GameEditorModal: FC<{
  existingGame?: Game,
  setSelectedGame: (g?: Game) => void
}> = ({ existingGame, setSelectedGame }) => {
  const addGameMutation = useAddGameMutation();
  const updateGameMutation = useUpdateGameMutation();
  const nameControl = useTextInput(existingGame?.name ?? "")
  const hostUrlControl = useTextInput(existingGame?.hostUrl ?? "")
  const repoLinkControl = useTextInput(existingGame?.repoLink ?? "")
  const detailsControl = useTextInput(existingGame?.details ?? "")
  const createdByControl = useTextInput(existingGame?.createdBy ?? "")
  const [supportsMultiSessions, setSupportsMultiSessions] = useState(existingGame?.supportsMultiSessions ?? true)

  const gameEditorControls = useModal("Game Editor", "lg")

  const ModalButton: ModalButton = ({ showModal }) => (
    <div>
      {existingGame ? (
        <button className="btn btn-outline-secondary"
          onClick={showModal}>
          <i className="bi bi-pencil" />
        </button>
      ) : (
        <button className="btn btn-outline-info"
          onClick={showModal}>
          New
        </button>
      )
      }
    </div>
  )

  console.log(supportsMultiSessions)

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
    }
    if (existingGame) {
      updateGameMutation.mutate(newGame)
    }
    else {
      addGameMutation.mutate(newGame)
    }
    setSelectedGame(undefined)

    closeHandler();
  }

  const closeHandler = () => {
    nameControl.setValue("")
    repoLinkControl.setValue("")
    hostUrlControl.setValue("")
    detailsControl.setValue("")
    createdByControl.setValue("")
    gameEditorControls.hide()
  }

  const canSubmit = nameControl.value !== ""
    && ((!supportsMultiSessions && hostUrlControl.value !== "") || supportsMultiSessions)
    && createdByControl.value !== ""
  return (
    <CustomModal ModalButton={ModalButton} controls={gameEditorControls}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title fw-bold fs-4">
            {existingGame ? "Edit Game" : "New Game"}
          </div>
          <button className="btn-close"
            onClick={closeHandler}
            aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form onSubmit={submitHandler}>
            <TextInput control={nameControl}
              label="*Name"
              labelClassName="col-12" />
            <div className="form-check form-switch mt-2">
              <input className="form-check-input"
                type="checkbox"
                id="supportsMultiSessionsSwitch"
                onChange={() => setSupportsMultiSessions(s => !s)}
                checked={supportsMultiSessions} />
              <label className="form-check-label"
                htmlFor="supportsMultiSessionsSwitch">
                Game Supports Multiple Sessions
              </label>
            </div>
            {!supportsMultiSessions && (
              <TextInput control={hostUrlControl}
                label="*Host URL"
                placeholder="https://your_server"
                labelClassName="col-12" />
            )}
            <TextInput control={repoLinkControl}
              label="Repo Link"
              placeholder="https://github.com/your_repo"
              labelClassName="col-12" />
            <TextInput control={detailsControl}
              label="Details"
              placeholder="Rules, Instructions, etc."
              isTextArea={true}
              labelClassName="col-12" />
            <TextInput control={createdByControl}
              label="*Created By"
              placeholder="John Smith"
              labelClassName="col-12" />
            <div className="small">*Required</div>
            <div className="row text-center my-2">
              <div className="col">
                <button className="btn btn-secondary"
                  type="button"
                  onClick={closeHandler}>Close</button>
              </div>
              <div className="col">
                <button className="btn btn-primary"
                  disabled={!canSubmit}
                  type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CustomModal>
  )
}
