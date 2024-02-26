import { FC } from "react";
import { Game } from "../../models/Games";
import { useDeleteGameMutation } from "./gameHooks";
import { Link } from "react-router-dom";

export const GameDetails: FC<{
  selectedGame: Game;
  setSelectedGame: (g?: Game) => void;
}> = ({ selectedGame, setSelectedGame }) => {
  const deleteGameMutation = useDeleteGameMutation();
  const BaseUrl = process.env.REACT_APP_API_URL + "/api/Game/Image/";

  const deleteHandler = () => {
    deleteGameMutation.mutate(selectedGame.id);
    setSelectedGame(undefined);
  };

  return (
    <div
      className="col-md-8 col border rounded shadow-sm p-3"
      key={selectedGame.id}
    >
      <div className="row">
        <div className="col-lg-10 col-md-8 my-auto">
          <div className="fs-4 fw-bold text-truncate">{selectedGame.name}</div>
        </div>
        <div className="col-auto">
          <Link to={`/game/edit/${selectedGame.id}`}
            className="btn btn-outline-secondary">
            <i className="bi-pencil" />
          </Link>
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-danger" onClick={deleteHandler}>
            <i className="bi bi-trash" />
          </button>
        </div>
      </div>
      <div>Created By: {selectedGame.createdBy}</div>
      <div>Details: {selectedGame.details}</div>
      <div className="text-break">Host Url: {selectedGame.hostUrl}</div>
      <div className="text-break">Repo Link: {selectedGame.repoLink}</div>
      <div>How To Play: {selectedGame.gameRules}</div>
      <div>Getting Started: {selectedGame.gettingStartedInstructions}</div>
      {selectedGame.imageSource && (
        <div className="my-2">
          <img src={BaseUrl + selectedGame.imageSource} alt="Game" />
        </div>
      )}
    </div>
  );
};
