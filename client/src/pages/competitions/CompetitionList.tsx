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

  const upcoming = competitions.filter(c => new Date(c.endAt) >= new Date())
  const past = competitions.filter(c => new Date(c.endAt) < new Date())

  return (
    <div className='container'>
      <h1 className='text-center'>Competitions</h1>
      <div className='text-end'>
        <CompetitionEditorModal />
      </div>
      <div className="row">
        {upcoming.map((c) => (
          <div className='col-lg-3 col-md-6 col-12 my-1 px-1' key={c.id}>
            <CompetitionItem competition={c} />
          </div>
        ))}
      </ div>
      <hr />
      <div className='h3 text-center'>Past Competitions</div>
      <div className="row">
        {past.map((c) => (
          <div className='col-lg-3 col-md-6 col-12 my-1 px-1' key={c.id}>
            <CompetitionItem competition={c} />
          </div>
        ))}
      </ div>
    </div>
  )
}
