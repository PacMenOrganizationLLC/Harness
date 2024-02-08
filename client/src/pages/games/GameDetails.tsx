import { FC, useEffect, useMemo } from "react";
import { Game } from "../../models/Games";
import { GameEditorModal } from "./GameEditorModal";
import { useDeleteGameMutation } from "./gameHooks";
import { SessionConfigList } from "./sessionConfig/SessionConfigList";
import { AddSessionConfigModal } from "./sessionConfig/AddSessionConfigModal";
import { useNavigate } from "react-router-dom";
import {
  useGetEndpointTypesQuery,
  useGetGameEndpointsQuery,
} from "./endpoints/endpointHooks";
import toast from "react-hot-toast";

export const GameDetails: FC<{
  selectedGame: Game;
  setSelectedGame: (g?: Game) => void;
}> = ({ selectedGame, setSelectedGame }) => {
  const endpointTypesQuery = useGetEndpointTypesQuery();
  const requiredEndpointTypes = useMemo(
    () =>
      endpointTypesQuery.data
        ? endpointTypesQuery.data.filter((t) => t.required === true)
        : undefined,
    [endpointTypesQuery.data]
  );
  const gameEndpointsQuery = useGetGameEndpointsQuery(selectedGame.id);
  const requiredEndpoints = useMemo(
    () =>
      gameEndpointsQuery.data
        ? gameEndpointsQuery.data.filter(
          (e) => e.endpointType?.required === true
        )
        : undefined,
    [gameEndpointsQuery.data]
  );
  const deleteGameMutation = useDeleteGameMutation();
  const navigate = useNavigate();
  const BaseUrl = process.env.REACT_APP_API_URL + "/api/Game/Image/";
  const needsEndpoints =
    requiredEndpointTypes &&
    requiredEndpoints &&
    requiredEndpointTypes.length > requiredEndpoints.length;

  useEffect(() => {
    if (needsEndpoints) {
      toast(
        (t) => (
          <div className="row">
            <div className="col-auto my-auto">
              <i className="bi-info-circle fs-3" />
            </div>
            <div className="col px-0">
              <div>{selectedGame.name} needs required endpoints.</div>
              <div>
                Click
                <span
                  role="button"
                  onClick={() => {
                    navigate(`/endpoints/${selectedGame.id}`);
                    toast.dismiss(t.id);
                  }}
                  className="text-primary mx-1"
                >
                  HERE
                </span>
                to configure them.
              </div>
            </div>
            <div className="col-auto my-auto">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="btn btn-outline-secondary py-1 px-2"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          </div>
        ),
        { position: "top-right", duration: Infinity }
      );
    }
  }, [needsEndpoints, selectedGame, navigate]);

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
          <GameEditorModal
            existingGame={selectedGame}
            setSelectedGame={setSelectedGame}
          />
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
      <div>
        <img src={BaseUrl + selectedGame.imageSource} alt="Game" />
      </div>
      <button
        className="btn btn-primary mt-2"
        onClick={() => navigate(`/endpoints/${selectedGame.id}`)}
      >
        Configure Endpoints
      </button>
      <div className="row border-top mt-3 pt-2">
        <div className="col my-auto">
          <div className="fs-5">Configurations:</div>
        </div>
        <div className="col-auto">
          <AddSessionConfigModal gameId={selectedGame.id} />
        </div>
      </div>
      <SessionConfigList gameId={selectedGame.id} />
    </div>
  );
};
