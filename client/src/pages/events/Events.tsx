import { useEffect, useState } from "react";
import { EventList } from "./EventList";
import { useGetEventsQuery } from "./eventHooks";
import Event from "../../models/Event";
import { EventEditorModal } from "./EventEditorModal";
import { EventDetails } from "./EventDetails";
import { Spinner } from "../../components/Spinner";
export const Events = () => {
  const eventsQuery = useGetEventsQuery();
  const [selectedEvent, setSelectedEvent] = useState<Event>()

  useEffect(() => {
    if (eventsQuery.data && eventsQuery.data.length > 0) {
      setSelectedEvent(eventsQuery.data[0])
    }
  }, [eventsQuery.data])

  if (eventsQuery.isLoading) return <Spinner />
  if (eventsQuery.isError) return <h3 className="text-center">Error getting events</h3>
  if (!eventsQuery.data) return <h3 className="text-center">Unable to get events</h3>

  return (
    <div className="container">
      <h1 className="text-center">Events</h1>
      <div className="row">
        <div className="col-md-4 col-12">
          <div className="text-end mb-2 d-md-none">
            <EventEditorModal setSelectedEvent={setSelectedEvent} />
          </div>
          <div className="mb-2 mb-md-0">
            <EventList events={eventsQuery.data}
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent} />
          </div>
          <div className="text-center my-2 d-none d-md-block">
            <EventEditorModal setSelectedEvent={setSelectedEvent} />
          </div>
        </div>
        {selectedEvent && (
          <EventDetails selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent} />
        )}
      </div>
    </div>
  );
};
