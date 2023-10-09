import axios from "axios";
import {
  GameConfigTemplate,
  SessionConfig,
} from "../../../models/SessionConfig";

export const sessionConfigService = {
  async getSessionConfigs(gameId: number): Promise<SessionConfig[]> {
    const url = `http://localhost:8000/api/SessionConfig/${gameId}`;
    const response = await axios.get(url);
    return response.data;
  },
  async addSessionConfigs(config: SessionConfig) {
    const url = "http://localhost:8000/api/SessionConfig";
    const response = await axios.post(url, config);
    return response.data;
  },
  async deleteSessionConfigs(id: number) {
    const url = `http://localhost:8000/api/SessionConfig/${id}`;
    const response = await axios.delete(url);
    return response.data;
  },
  async updateSessionConfigs(config: SessionConfig) {
    const url = `http://localhost:8000/api/SessionConfig/${config.id}`;
    const response = await axios.put(url, config);
    return response.data;
  },
  async getGameTemplateConfiguration(
    gameId: number
  ): Promise<GameConfigTemplate[]> {
    const url = `http://localhost:8000/api/SessionConfig/template/${gameId}`;
    const response = await axios.get(url);
    return response.data;
  },
};
