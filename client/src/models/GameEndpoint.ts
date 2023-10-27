export interface EndpointType {
  id: number,
  name: string,
  method: string,
  queryParamName?: string,
  required: boolean,
}

export interface GameEndpoint {
  id: number,
  endpoint: string,
  gameId: number,
  endpointTypeId: number,
}