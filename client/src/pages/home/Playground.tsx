import { Link } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import { AddSessionModal } from "../sessions/AddSessionModal"
import { useGetSessionsQuery } from "../sessions/sessionHooks"
import { calculateRemainingTime } from "../../models/Session";

export const Playground = () => {
  const sessionsQuery = useGetSessionsQuery();
  const sessions = sessionsQuery.data ?? []

  if (sessionsQuery.isLoading) return <Spinner />
  if (sessionsQuery.isError) return <h3 className="text-center">Error getting sessions</h3>
  return (
    <div className="card bg-secondary-subtle h-100">
      <div className="card-body pt-1">
        <div className='row'>
          <div className='col-8 offset-2'>
            <div className="card-title fw-bold text-center fs-4">Playground</div>
          </div>
          <div className='my-auto col-2 text-end'>
            <AddSessionModal />
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-2">
          {sessions.map(s => (
            <div className="col mb-2" key={s.id}>
              <Link to={`/session/${s.id}`}
                className="text-reset text-decoration-none">
                <div className="card text-center py-2">
                  <div className="card-title fs-5 fw-bold">{s.game?.name} {s.id}</div>
                  {s.game && s.game.duration && (
                    <div className="">{calculateRemainingTime(s.creationDate, s.game.duration)}</div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
