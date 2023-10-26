import { FC } from "react"
import Event from "../../models/Event"
import { EventEditorModal } from "./EventEditorModal"
import { useDeleteEventMutation } from "./eventHooks"
import { CompetitionEditorModal } from "../competitions/CompetitionEditorModal"
import { CompetitionList } from "../competitions/CompetitionList"

export const EventDetails: FC<{
  selectedEvent: Event,
  setSelectedEvent: (e?: Event) => void
}> = ({ selectedEvent, setSelectedEvent }) => {
  const deleteEventMutation = useDeleteEventMutation();
  const deleteHandler = () => {
    deleteEventMutation.mutate(selectedEvent.id)
    setSelectedEvent(undefined)
  }
  return (
    <div className="col-md-8 col border rounded shadow-sm p-3" key={selectedEvent.id}>
      <div className="row">
        <div className="col-lg-10 col-md-8 my-auto">
          <div className="fs-4 fw-bold text-truncate">{selectedEvent.name}</div>
        </div>
        <div className="col-auto">
          <EventEditorModal existingEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-danger"
            onClick={deleteHandler}>
            <i className="bi bi-trash" />
          </button>
        </div>
      </div>
      <div>{selectedEvent.description}</div>
      <div><i className="bi-calendar-date me-1" />{new Date(selectedEvent.day).toDateString()}</div>
      <div><i className="bi-pin-map me-1" />{selectedEvent.location}</div>
      <div className="row border-top mt-3 pt-2">
        <div className="col my-auto">
          <div className="fs-5">Competitions:</div>
        </div>
        <div className="col-auto">
          <CompetitionEditorModal eventId={selectedEvent.id} />
        </div>
      </div>
      <CompetitionList eventId={selectedEvent.id} />
    </div>
  )
}
