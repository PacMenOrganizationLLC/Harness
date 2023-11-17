import { Spinner } from "../../components/Spinner";
import { useGetEventsQuery, useGetPastEventsQuery } from "../events/eventHooks";
import { EventCarousel } from "./EventCarousel";

export const Home = () => {
  const getPastEventsQuery = useGetPastEventsQuery();
  const getEventsQuery = useGetEventsQuery();
  const pastEvents = getPastEventsQuery.data ?? [];
  const events = getEventsQuery.data ?? [];
  if (getEventsQuery.isLoading || getPastEventsQuery.isLoading)
    return <Spinner />;
  if (getEventsQuery.isError || getPastEventsQuery.isError)
    return <h3 className="text-center">Error getting events</h3>;
  if (!getEventsQuery.data || !getEventsQuery.data)
    return <h3 className="text-center">Unable to get games</h3>;

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="text-center my-3 fs-3 fw-bold">Past Events</div>
          <EventCarousel events={pastEvents} carouselId="carouselPast" />
        </div>
        <div className="col">
          <div className="text-center my-3 fs-3 fw-bold">Current And Future Events</div>
          <EventCarousel events={events} carouselId="carouselFuture" />
        </div>
      </div>
    </>
  );
};
