import { FC } from "react";
import { Competition } from "../../models/Competition";
import { useGetGamesQuery } from "../games/gameHooks";
import { useNavigate } from "react-router-dom";
import { getTimeNoSeconds } from "../../helpers/dateAndTimeHelpers";

interface CompetitionItemProps {
  competition: Competition;
}

export const CompetitionItem: FC<CompetitionItemProps> = ({ competition }) => {
  const navigate = useNavigate();
  const getGamesQuery = useGetGamesQuery();
  const games = getGamesQuery.data ?? [];

  // const deleteCompetitionMutation = useDeleteCompetitionMutation();

  // const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.stopPropagation();
  //   deleteCompetitionMutation.mutate(competition.id);
  // }

  const getGameName = (gameId: number) => {
    const game = games.find((g) => g.id === gameId);
    return game?.name ?? "";
  };

  return (
    <div className="card h-100">
      <button
        className="btn text-reset p-0"
        onClick={() => navigate(`/competition/${competition.id}`)}
      >
        <div className="card-body">
          <div className="card-title fs-5 text-truncate">
            {getGameName(competition.gameId)}
          </div>
          <div>
            {new Date(competition.startAt).toLocaleDateString()},{" "}
            {getTimeNoSeconds(competition.startAt)} -{" "}
            {new Date(competition.endAt).toLocaleDateString()},{" "}
            {getTimeNoSeconds(competition.endAt)}
          </div>
          <div>
            <i className="bi-pin-map me-1" />
            {competition.location}
          </div>
          {/* <div className="row text-center mt-2">
            <div className="col">
              <button className="btn btn-outline-danger" onClick={deleteHandler}>
                <i className="bi bi-trash" />
              </button>
            </div>
          </div> */}
        </div>
      </button>
    </div>
  );
};
