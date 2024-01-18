import { useGetCompetitionsQuery } from './competitionHooks';
import { Spinner } from '../../components/Spinner';
import { CompetitionItem } from './CompetitionItem';
import { CompetitionEditorModal } from './CompetitionEditorModal';


export const CompetitionList = () => {
  const getCompetitionsQuery = useGetCompetitionsQuery();
  const competitions = getCompetitionsQuery.data ?? [];

  if (getCompetitionsQuery.isLoading) return <Spinner />
  if (getCompetitionsQuery.isError) return <div>Error getting competitions</div>
  if (!getCompetitionsQuery.data) return <div>No competitions</div>

  return (
    <div className='container'>
      <h1 className='text-center'>Competitions</h1>
      <div className='text-end'>
        <CompetitionEditorModal />
      </div>
      <div className="row">
        {competitions.map((c) => (
          <div className='col-lg-3 col-md-6 col-12 my-1 px-1' key={c.id}>
            <CompetitionItem competition={c} />
          </div>
        ))}
      </ div>
    </div>
  )
}
