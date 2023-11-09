import { useEffect, useState } from "react"
import { useGetEndpointTypesQuery, useGetGameEndpointsQuery, useSaveGameEndpointMutation } from "./endpointHooks";
import { Spinner } from "../../../components/Spinner";
import { GameEndpoint } from "../../../models/GameEndpoint";
import { GameEndpointRow } from "./GameEndpointRow";
import { useNavigate, useParams } from "react-router-dom";

export const Endpoints = () => {
  const gameId = Number(useParams<{ gameId: string }>().gameId);
  const navigate = useNavigate();

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

  const saveHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  const requiredEndpoints = endpointTypes.filter(t => t.required)
  const optionalEndpoints = endpointTypes.filter(t => !t.required)

  return (
    <div className="container">
      <div className="row">
        <div className="col-3 my-auto">
          <button className="btn"
            onClick={() => navigate("/games")}>
            <i className="bi-arrow-left fs-3" />
          </button>
        </div>
        <div className="col-6">
          <h1 className="text-center">Endpoints</h1>
        </div>
      </div>
      <form onSubmit={saveHandler}>
        <div className="fw-bold fs-5">Required Endpoints:</div>
        {requiredEndpoints.map((t) => (
          <GameEndpointRow endpointType={t}
            endpoint={gameEndpoints.find(g => g.endpointTypeId === t.id)?.endpoint ?? ""}
            gameEndpointId={gameEndpoints.find(g => g.endpointTypeId === t.id)?.id ?? 0}
            updateHandler={updateHandler}
            key={t.id} />
        ))}
        <div className="fw-bold fs-5">Optional Endpoints</div>
        {optionalEndpoints.map((t) => (
          <GameEndpointRow endpointType={t}
            endpoint={gameEndpoints.find(g => g.endpointTypeId === t.id)?.endpoint ?? ""}
            gameEndpointId={gameEndpoints.find(g => g.endpointTypeId === t.id)?.id ?? 0}
            updateHandler={updateHandler}
            key={t.id} />
        ))}
        <div className="text-center">
          <button className="btn btn-success w-50"
            type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}
