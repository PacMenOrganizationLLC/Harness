import { FC } from "react"
import { Event } from "../../models/Event"
import { EventEditorModal } from "./EventEditorModal"
import { useDeleteEventMutation } from "./eventHooks"

export const GameDetails: FC<{
  selectedGame: Event,
  setSelectedEvent: (e?: Event) => void
}> = ({ selectedGame: selectedEvent, setSelectedEvent: setSelectedEvent }) => {
  const deleteGameMutation = useDeleteEventMutation();

  const deleteHandler = () => {
    deleteGameMutation.mutate(selectedEvent.id)
    setSelectedEvent(undefined)
  }
  return (
    <div className="col border rounded shadow-sm p-3" key={selectedEvent.id}>
      <div className="row">
        <div className="col my-auto">
          <div className="fs-4 fw-bold">{selectedEvent.name}</div>
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
      <div>Event Name: {selectedEvent.name}</div>
      <div>Details: {selectedEvent.description}</div>
      {/* <div>Day: {selectedEvent.day}</div> */}
      <div>Location: {selectedEvent.location}</div>
    </div>
  )
}
