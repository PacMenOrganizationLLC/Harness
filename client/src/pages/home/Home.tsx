import { Spinner } from "../../components/Spinner";
import { useGetEventsQuery, useGetPastEventsQuery } from "../events/eventHooks";
import EventCarousel from "./EventCarousel";

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
      <EventCarousel events={pastEvents} name="Past Events" carouselId="carouselPast" />
      <EventCarousel events={events} name="Current And Future Events" carouselId="carouselFuture"/>
      {/* <div className="row">
        <h1 className="text-center">Current And Future Events</h1>
        <div className="carousel slide" id="futureCarousel">
          <div className="carousel-inner">
            {events.map((e, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <h2>{e.name}</h2>
                <h1>{new Date(e.day).toDateString()}</h1>
                <h1>{e.location}</h1>
              </div>
            ))}
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#futureCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#futureCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div> */}
    </>
  );
};
