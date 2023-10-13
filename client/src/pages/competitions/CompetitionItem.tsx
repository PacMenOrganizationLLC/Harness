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
    <div className="col-2 card m-1">
      <div>
        ID: {competition.id}
      </div>
      <div>
        Game: {getGameName(competition.gameId)}
      </div>
      <div>
        Start: {new Date(competition.startAt).toLocaleTimeString()}
      </div>
      <div>
        End: {new Date(competition.endAt).toLocaleTimeString()}
      </div>
      <div>
        Location: {competition.location}
      </div>
      <div className="row text-center">
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
  )
}
