import axios from "axios";
import { Session } from "../../models/Session";

const BaseUrl = process.env.REACT_APP_API_URL;
const apiUrlBase = `${BaseUrl}/api/session`;

export const sessionService = {
  async getSessions(competitionId?: number): Promise<Session[]> {
    const queryParam = competitionId ? `?competitionId=${competitionId}` : ""
    const url = `${apiUrlBase}/competition${queryParam}`;
    const response = await axios.get(url);
    return response.data;
  },
  async getSession(id: number): Promise<Session> {
    const response = await axios.get(`${apiUrlBase}/${id}`);

    return response.data;
  },
  async addSession(gameId: number, competitionId?: number) {
    const body = {
      GameId: gameId,
      CompetitionId: competitionId
    }
    const response = await axios.post(apiUrlBase, body);
    return response.data;
  },
  async deleteSession(id: number) {
    const url = `${apiUrlBase}/${id}`;
    const response = await axios.delete(url);

    return response.data;
  },
};
