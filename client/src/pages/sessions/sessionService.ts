import axios from "axios";
import { Session } from "../../models/Session";
import { SessionConfig } from "../../models/SessionConfig";

const BaseUrl = process.env.REACT_APP_API_URL;
const apiUrlBase = `${BaseUrl}/api/session`;

export const sessionService = {
  async getSessions(competitionId: number): Promise<Session[]> {
    const url = `${apiUrlBase}/competition/${competitionId}`;
    const response = await axios.get(url);

    return response.data;
  },
  async getSession(id: number): Promise<Session> {
    const response = await axios.get(`${apiUrlBase}/${id}`);

    return response.data;
  },
  async addSession(session: Session) {
    const response = await axios.post(apiUrlBase, session);

    return response.data;
  },
  async deleteSession(id: number) {
    const url = `${apiUrlBase}/${id}`;
    const response = await axios.delete(url);

    return response.data;
  },
  async startSession(id: number, config: SessionConfig) {
    const url = `${apiUrlBase}/startGame/${id}`
    const response = await axios.post(url, config)
    return response
  },
  async stopSession(id: number) {
    const url = `${apiUrlBase}/stopGame?id=${id}`;
    const response = await axios.post(url);
    return response.data;
  },
  async getGameConfigs(id: string): Promise<SessionConfig[]> {
    const url = `${apiUrlBase}/getConfigs/${id}`
    const response = await axios.get(url);

    return response.data;
  },
  async addSessionConfig() {
    // TODO
  },
};
