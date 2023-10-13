import { FC } from "react"
import { Event } from "../../models/Event"
export const GameList: FC<{
  events: Event[],
  selectedEvent?: Event,
  setSelectedEvent: (g: Event) => void
}> = ({ events: events, selectedEvent: selectedGame, setSelectedEvent: setSelectedEvent }) => {
  return (
    <div className="list-group shadow-sm">
      {events.map((e) => (
        <div className={`list-group-item list-group-item-action 
          ${e.id === selectedGame?.id && "active"}`}
          onClick={() => setSelectedEvent(e)}
          key={e.id}>
          {e.name}
        </div>
      ))}
    </div>
  )
}
