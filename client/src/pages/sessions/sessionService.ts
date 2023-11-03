import axios from "axios";
import { Session } from "../../models/Session";
import { GameConfigTemplate, SessionConfig } from "../../models/SessionConfig";

const apiUrlBase = "http://localhost:8000/api/session";

export const sessionService = {
  async getSessions(competitionId: number): Promise<Session[]> {
    const url = `http://localhost:8000/api/session/competition/${competitionId}`
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
    const url = `${apiUrlBase}//${id}`
    const response = await axios.post(url, config)
  },
  async stopSession(id: number) {
    // TODO
  },
  async getGameConfigs(id: string): Promise<SessionConfig[]> {
    const url = `http://localhost:8000/api/session/getConfigs/${id}`
    const response = await axios.get(url);

    return response.data;
  },
  async addSessionConfig() {
    // TODO
  }
};
