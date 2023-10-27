import { FC, useEffect, useState } from "react"
import { useGetEndpointTypesQuery, useGetGameEndpointsQuery, useSaveGameEndpointMutation } from "./endpointHooks";
import { Spinner } from "../../../components/Spinner";
import { GameEndpoint } from "../../../models/GameEndpoint";
import { GameEndpointRow } from "./GameEndpointRow";

export const Endpoints: FC<{
  gameId: number
}> = ({ gameId }) => {
  const saveEndpointsMutation = useSaveGameEndpointMutation(gameId);
  const endpointTypesQuery = useGetEndpointTypesQuery();
  const endpointTypes = endpointTypesQuery.data ?? []
  const gameEndpointsQuery = useGetGameEndpointsQuery(gameId)
  const [gameEndpoints, setGameEndpoints] = useState<GameEndpoint[]>()

  useEffect(() => {
    if (!gameEndpoints && gameEndpointsQuery.data) {
      setGameEndpoints(gameEndpointsQuery.data)
    }
  }, [gameEndpointsQuery.data, gameEndpoints])

  if (endpointTypesQuery.isLoading || gameEndpointsQuery.isLoading) return <Spinner />
  if (endpointTypesQuery.isError) return <h3 className="text-center">Error getting endpoint types</h3>
  if (gameEndpointsQuery.isError) return <h3 className="text-center">Error getting your game endpoints</h3>
  if (!gameEndpointsQuery.data || !gameEndpoints) return <h3 className="text-center">Unable to get game endpoints</h3>

  const saveHandler = () => {
    saveEndpointsMutation.mutate(gameEndpoints)
  }

  const updateHandler = (gameEndpointId: number, newEndpoint: string, endpointTypeId: number) => {
    if (!gameEndpoints.find(e => e.id === gameEndpointId)) {
      const newGameEndpoint: GameEndpoint = {
        id: 0,
        endpoint: newEndpoint,
        gameId,
        endpointTypeId
      }
      setGameEndpoints([...gameEndpoints, newGameEndpoint])
    }
    else {
      const updatedEndpoints = gameEndpoints?.map(e => {
        if (e.id === gameEndpointId) return (
          { ...e, endpoint: newEndpoint }
        )
        return e
      })
      setGameEndpoints(updatedEndpoints)
    }
  }

  return (
    <div className="row border-top mt-3 pt-2">
      <div className="fs-5">Endpoints:</div>
      {endpointTypes.map((t) => (
        <GameEndpointRow endpointType={t}
          endpoint={gameEndpoints.find(g => g.endpointTypeId === t.id)?.endpoint ?? ""}
          gameEndpointId={gameEndpoints.find(g => g.endpointTypeId === t.id)?.id ?? 0}
          updateHandler={updateHandler}
          key={t.id} />
      ))}
      <div className="row">
        <div className="col my-auto">
          <div className="small">*Required</div>
        </div>
        <div className="col-auto">
          <button className="btn btn-success"
            onClick={saveHandler}>Save</button>
        </div>
      </div>
    </div>
  )
}
