import { FC } from "react"
import Event from "../../models/Event"
import { EventEditorModal } from "./EventEditorModal"
import { useDeleteEventMutation } from "./eventHooks"

export const EventDetails: FC<{
  selectedEvent: Event,
  setSelectedEvent: (e?: Event) => void
}> = ({ selectedEvent: selectedEvent, setSelectedEvent: setSelectedEvent }) => {
  const deleteEventMutation = useDeleteEventMutation();
  console.log(selectedEvent.day)
  const deleteHandler = () => {
    deleteEventMutation.mutate(selectedEvent.id)
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
      <div>Day: {new Date(selectedEvent.day).toString()}</div> 
      <div>Location: {selectedEvent.location}</div>

    </div>
  )
}
