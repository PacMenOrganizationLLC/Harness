import { FC } from 'react';
import { Competition } from '../../models/Competition';
import { useGetGamesQuery } from '../games/gameHooks';
import { useNavigate } from 'react-router-dom';

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
    const game = games.find((g) => g.id === gameId)
    return game?.name ?? ''
  }

  return (
    <div className='card'>
      <button className='btn text-reset p-0'
        onClick={() => navigate("/")}>
        <div className='card-body'>
          <div className='card-title fs-5'>{getGameName(competition.gameId)}</div>
          <div>
            {getTimeNoSeconds(competition.startAt)} - {getTimeNoSeconds(competition.endAt)}
          </div>
          <div>
            Location: {competition.location}
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
  )
}

function getTimeNoSeconds(input: Date | string | undefined) {
  if (!input) return ""
  const date = new Date(input);
  const formattedTime = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return formattedTime;
}
