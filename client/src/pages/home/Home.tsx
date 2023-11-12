import { Spinner } from "../../components/Spinner";
import { useGetEventsQuery, useGetPastEventsQuery } from "../events/eventHooks";

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
        <h1>Past Events</h1>
        {pastEvents.map((e) => (
          <h2>{e.name}</h2>
        ))}
        <div className="carousel slide">
          <div className="carousel-inner">
            {pastEvents.map((e) => (
              <div className="carousel-item">
                <h2>{e.name}</h2>
                <h1>{new Date(e.day).toDateString()}</h1>
                <h1>{e.location}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <h1>Events</h1>
        <div className="carousel slide">
          <div className="carousel-inner">
            {events.map((e) => (
              <div className="carousel-item">
                <h2>{e.name}</h2>
                <h1>{new Date(e.day).toDateString()}</h1>
                <h1>{e.location}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
