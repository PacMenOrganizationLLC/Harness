import { useNavigate, useParams } from "react-router-dom"
import { useDeleteCompetitionMutation, useGetCompetitionQuery } from "./competitionHooks"
import { Spinner } from "../../components/Spinner"
import { getTimeNoSeconds } from "../../helpers/dateAndTimeHelpers"
import { CompetitionEditorModal } from "./CompetitionEditorModal"
import { AddSessionModal } from "../sessions/AddSessionModal"
import { useGetSessionsQuery } from "../sessions/sessionHooks"
import { SessionItem } from "../sessions/SessionItem"

export const CompetitionDetails = () => {
  const competitionId = useParams<{ id: string }>().id
  const getSessionsQuery = useGetSessionsQuery(Number(competitionId));
  const sessions = getSessionsQuery.data ?? []
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
      <div className="row">
        <div className="col-3 my-auto">
          <button className="btn"
            onClick={() => navigate(-1)}>
            <i className="bi-arrow-left fs-3" />
          </button>
        </div>
        <div className="col-6 text-center">
          <h1>{competition.event?.name}</h1>
        </div>
        <div className="col-2 text-end my-auto">
          <CompetitionEditorModal existingCompetition={competition} eventId={competition.eventId} />
        </div>
        <div className="col-1 my-auto">
          <button className="btn btn-outline-danger" onClick={deleteHandler}>
            <i className="bi bi-trash" />
          </button>
        </div>
      </div>
      <div>
        <i className="bi-joystick" /> {competition.game?.name}
      </div>
      <div>
        <i className="bi-pin-map" /> {competition.event?.location} - {competition.location}
      </div>
      <div>
        <i className="bi-calendar-event" /> {competition.event ? new Date(competition.event.day).toDateString() : ''}
        <span className="ms-1">
          @ {getTimeNoSeconds(competition.startAt)} - {getTimeNoSeconds(competition.endAt)}
        </span>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h3>Prizes:</h3>
        </div>
        <div className="col-auto my-auto">
          <button className="btn btn-outline-info bi-plus-lg px-2 py-1" />
        </div>
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
          <div className="col">No prizes</div>
        }
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h3>Sessions:</h3>
        </div>
        <div className="col-auto my-auto">
          <AddSessionModal competitionId={competition.id} />
        </div>
      </div>
      <div className="row">
        {sessions.map((s) => (
          <div className="col-lg-3 col-md-6 col-12 my-1 px-1" key={s.id}>
            <SessionItem session={s} />
          </div>
        ))}
      </div>
    </div >
  );
}
