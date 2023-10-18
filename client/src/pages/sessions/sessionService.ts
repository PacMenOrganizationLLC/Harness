import axios from "axios";
import { Session } from "../../models/Session";

const apiUrlBase = "http://localhost:8000/api/session";

export const sessionService = {
  async getSessions(): Promise<Session[]> {
    const response = await axios.get(apiUrlBase);

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
  async startSession(id: number) {
    // TODO
  },
  async stopSession(id: number) {
    // TODO
  },
  async getSessionConfigs() {
    // TODO
  },
  async addSessionConfig() {
    // TODO
  }
};
