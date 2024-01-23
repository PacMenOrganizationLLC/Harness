import axios from "axios"
import { Game } from "../../models/Games";
import { BaseUrl } from "../../index";


export const gameService = {
  async getGames(): Promise<Game[]> {
    const url = `${BaseUrl}/Game`;
    const response = await axios.get(url);
    return response.data
  },
  async addGame(game: Game) {
    const url = `${BaseUrl}/Game`;
    const response = await axios.post(url, game);
    return response.data
  },
  async updateGame(game: Game) {
    const url = `${BaseUrl}/Game/${game.id}`;
    const response = await axios.put(url, game);
    return response.data
  },
  async deleteGame(id: number) {
    const url = `${BaseUrl}/Game/${id}`;
    const response = await axios.delete(url);
    return response.data
  },
}