import axios from "axios";
import { EndpointType, GameEndpoint } from "../../../models/GameEndpoint";

export const endpointService = {
  async getEndpointTypes(): Promise<EndpointType[]> {
    const url = `http://localhost:8000/api/endpoint/types`
    const response = await axios.get(url);
    return response.data
  },
  async saveEndpoints(endpoints: GameEndpoint[]) {
    const url = `http://localhost:8000/api/endpoint`
    const response = await axios.post(url, endpoints);
    return response.data
  },
  async getGameEndpoints(gameId: number): Promise<GameEndpoint[]> {
    const url = `http://localhost:8000/api/endpoint/${gameId}`
    const response = await axios.get(url);
    return response.data
  }
}