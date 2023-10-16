import { useState } from "react";
import { EventList } from "./EventList";
import { useGetEventsQuery } from "./eventHooks";
import Event from "../../models/Event";
import { EventEditorModal } from "./EventEditorModal";
import { EventDetails } from "./EventDetails";
export const Events = () => {
  const eventsQuery = useGetEventsQuery();
  const [selectedEvent, setSelectedEvent] = useState<Event>()

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center">Events</h1>
          <div className="row">
            <div className="col-md-4">
              {eventsQuery.data && (
                <EventList events={eventsQuery.data} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
              )}
              <div className="my-2 text-center">
                <EventEditorModal setSelectedEvent={setSelectedEvent} />
              </div>
            </div>
            <div className="col-md">
              {selectedEvent && (
                <EventDetails selectedEvent={selectedEvent}
                  setSelectedEvent={setSelectedEvent} />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
