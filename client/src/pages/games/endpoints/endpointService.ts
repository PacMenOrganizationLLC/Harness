import axios from "axios";
import { EndpointType, GameEndpoint } from "../../../models/GameEndpoint";

const BaseUrl = process.env.REACT_APP_API_URL;

export const endpointService = {
  async getEndpointTypes(): Promise<EndpointType[]> {
    const url = `${BaseUrl}/api/endpoint/types`;
    const response = await axios.get(url);
    return response.data
  },
  async saveEndpoints(endpoints: GameEndpoint[]) {
    const url = `${BaseUrl}/api/endpoint`;
    const response = await axios.post(url, endpoints);
    return response.data
  },
  async getGameEndpoints(gameId: number): Promise<GameEndpoint[]> {
    const url = `${BaseUrl}/api/endpoint/${gameId}`;
    const response = await axios.get(url);
    return response.data
  }
}