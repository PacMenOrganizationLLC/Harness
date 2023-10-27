import { FC } from "react"
import { EndpointType } from "../../../models/GameEndpoint"

export const GameEndpointRow: FC<{
  endpointType: EndpointType,
  endpoint: string,
  gameEndpointId: number;
  updateHandler: (endpointId: number, newEndpoint: string, endpointTypeId: number) => void
}> = ({ endpointType, endpoint, gameEndpointId, updateHandler }) => {
  return (
    <>
      <label className="form-label"
        htmlFor={"endpoint" + endpointType.id}>
        {endpointType.required && "*"}{endpointType.name} {endpointType.queryParamName && "(includes query parameter)"}
      </label>
      <div className="input-group mb-3">
        <span className="input-group-text" id={"endpointMethod" + endpointType.id}>{endpointType.method}</span>
        <input type="text"
          className="form-control"
          value={endpoint}
          onChange={(e) => updateHandler(gameEndpointId, e.target.value, endpointType.id)}
          placeholder="https://your_website/your_controller/your_endpoint"
          id={"endpoint" + endpointType.id} aria-describedby={"endpointParam" + endpointType.id} />
        {endpointType.queryParamName && (
          <span className="input-group-text"
            id={"endpointParam" + endpointType.id}>
            {`?${endpointType.queryParamName}={{${endpointType.queryParamName}}}`}
          </span>
        )}
      </div>
    </>
  )
}
