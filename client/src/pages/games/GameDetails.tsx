import { FC } from "react"
import { Game } from "../../models/Games"
import { GameEditorModal } from "./GameEditorModal"
import { useDeleteGameMutation } from "./gameHooks"

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
    <div className="col" key={selectedGame.id}>
      <div className="row">
        <div className="col my-auto">
          <div className="fs-4 fw-bold">{selectedGame.name}</div>
        </div>
        <div className="col-auto">
          <GameEditorModal existingGame={selectedGame} />
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-danger"
            onClick={deleteHandler}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
      </div>
      <div>Created By: {selectedGame.createdBy}</div>
      <div>Details: {selectedGame.details}</div>
      <div>Host Url: {selectedGame.hostUrl}</div>
      <div>Repo Link: {selectedGame.repoLink}</div>
    </div>
  )
}
