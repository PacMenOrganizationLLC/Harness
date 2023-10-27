import { FC } from "react"
import { useGetSessionConfigsQuery } from "./sessionConfigHooks";
import { Spinner } from "../../../components/Spinner";
import { ConfigDetailsModal } from "./ConfigDetailsModal";

export const SessionConfigList: FC<{
  gameId: number
}> = ({ gameId }) => {
  const sessionConfigsQuery = useGetSessionConfigsQuery(gameId);
  const sessionConfigs = sessionConfigsQuery.data ?? []

  if (sessionConfigsQuery.isLoading) return <Spinner />
  if (sessionConfigsQuery.isError) return <div>Error getting session configurations</div>
  if (!sessionConfigsQuery.data) return <div>Unable to get session configurations</div>

  return (
    <div className="row">
      {sessionConfigs.map((c) => (
        <div className="col-lg-3 col-md-6 col-12 my-1 px-1" key={c.id}>
          <ConfigDetailsModal config={c} gameId={gameId} key={c.id} />
        </div>
      ))}
    </div >
  )
}
