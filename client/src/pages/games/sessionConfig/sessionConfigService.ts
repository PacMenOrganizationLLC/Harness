import axios from "axios";
import {
  GameConfigTemplate,
  SessionConfig,
} from "../../../models/SessionConfig";
import { BaseUrl } from "../../..";

export const sessionConfigService = {
  async getSessionConfigs(gameId: number): Promise<SessionConfig[]> {
    const url = `${BaseUrl}/SessionConfig/${gameId}`;
    const response = await axios.get(url);
    return response.data;
  },
  async addSessionConfig(config: SessionConfig) {
    const url = `${BaseUrl}/SessionConfig`;
    const response = await axios.post(url, config);
    return response.data;
  },
  async deleteSessionConfig(id: number) {
    const url = `${BaseUrl}/SessionConfig/${id}`;
    const response = await axios.delete(url);
    return response.data;
  },
  async updateSessionConfig(config: SessionConfig) {
    const url = `${BaseUrl}/SessionConfig/${config.id}`;
    const response = await axios.put(url, config);
    return response.data;
  },
  async getGameTemplateConfiguration(
    gameId: number
  ): Promise<GameConfigTemplate[]> {
    const url = `${BaseUrl}/SessionConfig/template/${gameId}`;
    const response = await axios.get(url);
    return response.data;
  },
};
