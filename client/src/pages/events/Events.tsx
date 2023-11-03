import { useEffect, useMemo, useState } from "react";
import { EventList } from "./EventList";
import { useGetEventsQuery } from "./eventHooks";
import Event from "../../models/Event";
import { EventEditorModal } from "./EventEditorModal";
import { EventDetails } from "./EventDetails";
import { Spinner } from "../../components/Spinner";
import { useSearchParams } from "react-router-dom";

export const Events = () => {
  const eventsQuery = useGetEventsQuery();
  const events = useMemo(() => eventsQuery.data ?? [], [eventsQuery.data])
  const [selectedEvent, setSelectedEvent] = useState<Event>()
  const [searchParams, setSearchParams] = useSearchParams();
  const item = searchParams.get("item");
  const selectedEventId = item ? item : events.length > 0 ? events[0].id : "";

  useEffect(() => {
    if (selectedEvent) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("item", selectedEvent.id.toString());
      setSearchParams(newSearchParams)
    }
  }, [selectedEvent, setSearchParams, searchParams])

  useEffect(() => {
    const event = events.find(e => e.id === Number(selectedEventId))
    setSelectedEvent(event)
  }, [selectedEventId, item, events])

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
