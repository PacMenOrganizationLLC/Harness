import { FC } from "react"
import { useGetSessionConfigsQuery } from "./sessionConfigHooks";
import { Spinner } from "../../../components/Spinner";

export const SessionConfig: FC<{
  gameId: number
}> = ({ gameId }) => {
  const sessionConfigsQuery = useGetSessionConfigsQuery(gameId);
  const sessionConfigs = sessionConfigsQuery.data ?? []

  if (sessionConfigsQuery.isLoading) return <Spinner />
  if (sessionConfigsQuery.isError) return <div>Error getting session configurations</div>
  if (!sessionConfigsQuery.data) return <div>Unable to get session configurations</div>
  return (
    <div className="d-flex mt-3">
      {sessionConfigs.map((c) => (
        <div className="card me-2" key={c.id}>
          <button className="btn ">
            <div className="card-body p-0">
              <div className="card-title my-auto">
                {c.name}
              </div>
            </div>
          </button>
        </div>
      ))}
      <div className="card my-auto">
        <button className="btn btn-secondary px-2 py-1">
          <div className="card-body p-0">
            <div className="card-title my-auto">
              <i className="bi bi-plus-lg" />
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
