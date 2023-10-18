import { FC } from "react"
import { Game } from "../../models/Games"
import { GameEditorModal } from "./GameEditorModal"
import { useDeleteGameMutation } from "./gameHooks"
import { SessionConfig } from "./sessionConfig/SessionConfig"

export const GameDetails: FC<{
  selectedGame: Game,
  setSelectedGame: (g?: Game) => void
}> = ({ selectedGame, setSelectedGame }) => {
  const deleteGameMutation = useDeleteGameMutation();

  const deleteHandler = () => {
    deleteGameMutation.mutate(selectedGame.id)
    setSelectedGame(undefined)
  }

  return (
    <div className="col-md-8 col border rounded shadow-sm p-3" key={selectedGame.id}>
      <div className="row">
        <div className="col-lg-10 col-md-8 my-auto">
          <div className="fs-4 fw-bold text-truncate">{selectedGame.name}</div>
        </div>
        <div className="col-auto">
          <GameEditorModal existingGame={selectedGame} setSelectedGame={setSelectedGame} />
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-danger"
            onClick={deleteHandler}>
            <i className="bi bi-trash" />
          </button>
        </div>
      </div>
      <div>Created By: {selectedGame.createdBy}</div>
      <div>Details: {selectedGame.details}</div>
      <div className="text-break">Host Url: {selectedGame.hostUrl}</div>
      <div className="text-break">API Url: {selectedGame.apiUrl}</div>
      <div className="text-break">Repo Link: {selectedGame.repoLink}</div>
      <SessionConfig gameId={selectedGame.id} />
    </div>
  )
}
