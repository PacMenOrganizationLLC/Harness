import axios from "axios";
import { EndpointType, GameEndpoint } from "../../../models/GameEndpoint";
import { BaseUrl } from "../../..";

export const endpointService = {
  async getEndpointTypes(): Promise<EndpointType[]> {
    const url = `${BaseUrl}/endpoint/types`;
    const response = await axios.get(url);
    return response.data
  },
  async saveEndpoints(endpoints: GameEndpoint[]) {
    const url = `${BaseUrl}/endpoint`;
    const response = await axios.post(url, endpoints);
    return response.data
  },
  async getGameEndpoints(gameId: number): Promise<GameEndpoint[]> {
    const url = `${BaseUrl}/endpoint/${gameId}`;
    const response = await axios.get(url);
    return response.data
  }
}