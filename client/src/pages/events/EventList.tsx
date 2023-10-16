import { FC } from "react"
import Event from "../../models/Event"
export const EventList: FC<{
  events: Event[],
  selectedEvent?: Event,
  setSelectedEvent: (e: Event) => void
}> = ({ events, selectedEvent, setSelectedEvent }) => {
  return (
    <div className="list-group shadow-sm">
      {events.map((e) => (
        <div className={`list-group-item list-group-item-action text-truncate
          ${e.id === selectedEvent?.id && "active"}`}
          onClick={() => setSelectedEvent(e)}
          key={e.id}>
          {e.name}
        </div>
      ))}
    </div>
  )
}
