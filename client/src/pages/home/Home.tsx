import { AddSessionModal } from "../sessions/AddSessionModal";
import { useDeleteSessionMutation, useGetSessionsQuery } from "../sessions/sessionHooks";
import { SessionItem } from "../sessions/SessionItem";

export const Home = () => {
  const getSessionsQuery = useGetSessionsQuery(1);
  const deleteSessionMutation = useDeleteSessionMutation(1);

  const sessions = getSessionsQuery.data ?? [];

  const deleteHandler = (sessionId: number) => {
    deleteSessionMutation.mutate(sessionId);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Session</h1>
        </div>
        <div className="col-auto">
          <AddSessionModal />
        </div>
      </div>
      {sessions.map((s) => (
        <div className="row align-items-center">
          <div className="col-lg-3 col-md-6 col-12 my-1 px-1" key={s.id}>
            <SessionItem session={s} />
          </div>
          <div className="col-auto">
            <button className="btn btn-outline-danger"
              onClick={() => deleteHandler(s.id)}>
              <i className="bi bi-trash" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
