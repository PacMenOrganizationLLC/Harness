import { FC } from "react"
import { useDeleteSessionConfigMutation, useGetSessionConfigsQuery } from "./sessionConfigHooks";
import { Spinner } from "../../../components/Spinner";
import { AddSessionConfigModal } from "./AddSessionConfigModal";
import { ConfigDetailsModal } from "./ConfigDetailsModal";

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
        <ConfigDetailsModal config={c} gameId={gameId} />
      ))}
      <div className="card my-auto">
        <AddSessionConfigModal gameId={gameId} />
      </div>
    </div>
  )
}
