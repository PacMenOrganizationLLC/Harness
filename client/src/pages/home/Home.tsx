import { useGetEventsQuery, useGetPastEventsQuery } from "../events/eventHooks";

export const Home = () => {
  const getPastEventsQuery = useGetPastEventsQuery();
  const getEventsQuery = useGetEventsQuery();
  const pastEvents = getPastEventsQuery.data ?? [];
  const events = getEventsQuery.data ?? [];

  return (
    <div className="row">
      <div className="col">
        <h1>Past Events</h1>
        {pastEvents.map((e) => (
          <div>
            <h3>{e.name}</h3>
          </div>
        ))}
      </div>
      <div className="col">
        <h1>Events</h1>
        {events.map((e) => (
          <div>
            <h3>{e.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
