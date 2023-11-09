import { FC, useEffect, useRef } from "react"
import { EndpointType } from "../../../models/GameEndpoint"
import { Popover } from "bootstrap";

export const GameEndpointRow: FC<{
  endpointType: EndpointType,
  endpoint: string,
  gameEndpointId: number;
  updateHandler: (endpointId: number, newEndpoint: string, endpointTypeId: number) => void
}> = ({ endpointType, endpoint, gameEndpointId, updateHandler }) => {
  const popoverRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (popoverRef.current) {
      new Popover(popoverRef.current, {
        content: "This endpoint provides a query parameter for use in the game's API",
        trigger: "hover",
        placement: "top"
      })
    }
  }, [])
  return (
    <>
      <label className="form-label"
        htmlFor={"endpoint" + endpointType.id}>
        {endpointType.name} {endpointType.queryParamName && (
          <i className="bi-question-circle"
            ref={popoverRef} />
        )}
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
