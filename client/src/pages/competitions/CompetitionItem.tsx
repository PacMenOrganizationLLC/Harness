import { FC } from 'react';
import { Competition } from '../../models/Competition';
import { useGetGamesQuery } from '../games/gameHooks';
import { CompetitionEditorModal } from './CompetitionEditorModal';
import { useDeleteCompetitionMutation } from './competitionHooks';

interface CompetitionItemProps {
  competition: Competition;
}

export const CompetitionItem: FC<CompetitionItemProps> = ({ competition }) => {
  const getGamesQuery = useGetGamesQuery();
  const games = getGamesQuery.data ?? [];


  const deleteCompetitionMutation = useDeleteCompetitionMutation();

  const deleteHandler = () => {
    deleteCompetitionMutation.mutate(competition.id);
  }

  const getGameName = (gameId: number) => {
    const game = games.find((g) => g.id === gameId)
    return game?.name ?? ''
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='card-title fs-5'>{getGameName(competition.gameId)}</div>
        <div>
          Start: {getTimeNoSeconds(competition.startAt)}
        </div>
        <div>
          End: {getTimeNoSeconds(competition.endAt)}
        </div>
        <div>
          Location: {competition.location}
        </div>
        <div className="row text-center my-1">
          <div className="col">
            <CompetitionEditorModal existingCompetition={competition} eventId={competition.id} />
          </div>
          <div className="col">
            <button className="btn btn-outline-danger" onClick={deleteHandler}>
              <i className="bi bi-trash" />
            </button>
          </div>
        </div>
      </div>
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
