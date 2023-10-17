import { useEffect, useState } from "react";
import { EventList } from "./EventList";
import { useGetEventsQuery } from "./eventHooks";
import Event from "../../models/Event";
import { EventEditorModal } from "./EventEditorModal";
import { EventDetails } from "./EventDetails";
export const Events = () => {
  const eventsQuery = useGetEventsQuery();
  const [selectedEvent, setSelectedEvent] = useState<Event>()

  useEffect(()=>{
    if (eventsQuery.data && eventsQuery.data.length > 0){
      setSelectedEvent(eventsQuery.data[0])
    }
  }, [eventsQuery.data])
  
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center">Events</h1>
          <div className="row">
            <div className="col-md-4">
              <div className="text-end mb-2 d-md-none">
                <EventEditorModal setSelectedEvent={setSelectedEvent} />
              </div>
              {eventsQuery.data && (
                <EventList events={eventsQuery.data} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
              )}
              <div className="text-center d-none d-md-block">
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
