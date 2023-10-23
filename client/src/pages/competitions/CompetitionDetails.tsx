import { useNavigate, useParams } from "react-router-dom"
import { useDeleteCompetitionMutation, useGetCompetitionQuery } from "./competitionHooks"
import { Spinner } from "../../components/Spinner"
import { getTimeNoSeconds } from "../../helpers/dateAndTimeHelpers"
import { CompetitionEditorModal } from "./CompetitionEditorModal"

export const CompetitionDetails = () => {
  const competitionId = useParams<{ id: string }>().id
  const competitionQuery = useGetCompetitionQuery(Number(competitionId))
  const competition = competitionQuery.data
  const navigate = useNavigate();

  const deleteCompetitionMutation = useDeleteCompetitionMutation();

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteCompetitionMutation.mutate(Number(competitionId));
    navigate('/events');
  }

  if (competitionQuery.isLoading) return <Spinner />
  if (competitionQuery.isError) return <div>Error getting competition</div>
  if (!competition) return <div>Could not get competition</div>

  return (
    <div className="container">
      <div className="border rounded p-3">
        <div className="row">
          <div className="col text-start"><h1>{competition.event?.name}</h1></div>
          <div className="col-auto text-end my-auto">
            <div className="d-flex">
              <CompetitionEditorModal existingCompetition={competition} eventId={competition.eventId} />
              <button className="btn btn-outline-danger ms-2" onClick={deleteHandler}>
                <i className="bi bi-trash" />
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="text-truncate">
              <i className="bi-joystick" /> {competition.game?.name}
            </div>
            <div>
              <i className="bi-pin-map" /> {competition.event?.location} - {competition.location}
            </div>
          </div>
          <div className="col-md-6 text-center">
            <div>
              {competition.event ? new Date(competition.event.day).toDateString() : ''}
            </div>
            <div>
              {competition.startAt && getTimeNoSeconds(competition.startAt)} - {competition.endAt && getTimeNoSeconds(competition.endAt)}
            </div>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col">
            <h3>Prizes:</h3>
          </div>
          <div className="col text-end"><button className="btn btn-outline-secondary bi-plus" /></div>
        </div>
        <div className="row">
          {competition.competitionPrizes && competition.competitionPrizes.length > 0 ?
            competition.competitionPrizes.map(p => (
              <div className="col-lg-3 col-md-6 col-12 my-1 px-1">
                <div className="text-center border rounded my-1" key={p.id}>
                  <div>#{p.placement}</div>
                  <div className="text-truncate">{p.prize}</div>
                </div>
              </div>
            ))
            :
            <div className="col text-center">No prizes</div>
          }
        </div>
        <div className="row">
          <div className="col">
            <h3>Sessions:</h3>
          </div>
          <div className="col text-end"><button className="btn btn-outline-secondary bi-plus" /></div>
        </div>
        <div className="row">
          {competition.sessions && competition.sessions.length > 0 ?
            competition.sessions.map(s => (
              <div className="col-lg-3 col-md-6 col-12 my-1 px-1">
                <div className="text-center border rounded my-1" key={s.id}>
                  <div className="text-truncate">{s.name}</div>
                </div>
              </div>
            ))
            :
            <div className="col text-center">No sessions</div>
          }
        </div>
      </div>
    </div>
  );
}
