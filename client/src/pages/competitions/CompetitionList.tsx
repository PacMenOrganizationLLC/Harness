import { FC } from 'react'
import { useGetCompetitionsQuery } from './competitionHooks';
import { Spinner } from '../../components/Spinner';
import { CompetitionItem } from './CompetitionItem';

interface CompetitionListProps {
  eventId: number;
}

export const CompetitionList: FC<CompetitionListProps> = ({ eventId }) => {
  const getCompetitionsQuery = useGetCompetitionsQuery();
  const competitions = getCompetitionsQuery.data ?? [];
  const filteredCompetitions = eventId ? competitions.filter((c) => c.eventId === eventId) : competitions

  if (getCompetitionsQuery.isLoading) return <Spinner />
  if (getCompetitionsQuery.isError) return <div>Error getting competitions</div>
  if (!getCompetitionsQuery.data) return <div>No competitions</div>

  return (
    <div className="row">
      {filteredCompetitions.map((c) => (
        <div className='col-lg-3 col-md-6 col-12 my-1 px-1' key={c.id}>
          <CompetitionItem competition={c} />
        </div>
      ))}
    </ div>
  )
}
