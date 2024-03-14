import { FC } from "react";
import { Game } from "../../models/Game";
import { useDeleteGameMutation } from "./gameHooks";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { ConfirmationToast } from "../../components/ConfirmationToast";

export const GameDetails: FC<{
  selectedGame: Game;
  setSelectedGame: (g?: Game) => void;
}> = ({ selectedGame, setSelectedGame }) => {
  const deleteGameMutation = useDeleteGameMutation();
  const BaseUrl = process.env.REACT_APP_API_URL + "/api/Game/Image/";

  const deleteHandler = () => {
    toast((t) => (
      <ConfirmationToast
        toastId={t.id}
        message={"Are you sure? This will permanently delete the game."}
        confirmHandler={() => {
          deleteGameMutation.mutate(selectedGame.id);
          toast.dismiss(t.id);
          setSelectedGame(undefined);
        }} />
    ), { duration: Infinity })
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
          <Link
            to={`/game/edit/${selectedGame.id}`}
            className="btn btn-outline-secondary"
          >
            <i className="bi-pencil" />
          </Link>
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-danger" onClick={deleteHandler}>
            <i className="bi bi-trash" />
          </button>
        </div>
      </div>
      <div><span className="fw-bold">Details:</span> {selectedGame.details}</div>
      <div className="text-break"><span className="fw-bold">Repo Link:</span> {selectedGame.repoLink}</div>
      <div><span className="fw-bold">Docker Image:</span> {selectedGame.dockerImage}</div>
      <div><span className="fw-bold">Api Sub Path:</span> {selectedGame.apiSubPath}</div>
      <div><span className="fw-bold">Session Duration:</span> {selectedGame.duration}</div>
      <div><span className="fw-bold">Max Number of Sessions:</span> {selectedGame.maxAmount}</div>
      <div><span className="fw-bold">Internal Port:</span> {selectedGame.internalPort}</div>

      <div className="fw-bold">How To Play:</div>
      {selectedGame.gameRules && (
        <ReactMarkdown>{selectedGame.gameRules}</ReactMarkdown>
      )}
      <div className="fw-bold">Getting Started:</div>
      {selectedGame.gettingStartedInstructions && (
        <ReactMarkdown>{selectedGame.gettingStartedInstructions}</ReactMarkdown>
      )}
      {selectedGame.imageSource && (
        <div className="my-2">
          <img src={BaseUrl + selectedGame.imageSource} alt="Game" className="img-fluid" style={{ maxHeight: "20ex" }} />
        </div>
      )}
    </div>
  );
};
