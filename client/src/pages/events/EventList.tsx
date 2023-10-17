import { FC } from "react"
import Event from "../../models/Event"
export const EventList: FC<{
  events: Event[],
  selectedEvent?: Event,
  setSelectedEvent: (e: Event) => void
}> = ({ events, selectedEvent, setSelectedEvent }) => {
  return (
    <div style={{ maxHeight: "50ex" }} className="overflow-auto border rounded mb-2">
      <div className="list-group shadow-sm"
        style={{ borderRadius: "0" }}>
        {events.map((e, index) => (
          <button className={`list-group-item list-group-item-action text-truncate border-0
            ${index !== events.length - 1 && "border-bottom"}
            ${e.id === selectedEvent?.id && "active"}`}
            onClick={() => setSelectedEvent(e)}
            key={e.id}>
            {e.name}
          </button>
        ))}
      </div>
    </div>
  )
}
