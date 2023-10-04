import axios from "axios"
import { Game } from "../../models/Games";

export const gameService = {
  async getGames(): Promise<Game[]> {
    const url = 'http://localhost:8000/api/Game';
    const response = await axios.get(url);
    return response.data
  },
  async addGame(game: Game) {
    const url = 'http://localhost:8000/api/Game';
    const response = await axios.post(url, game);
    return response.data
  },
  async updateGame(game: Game) {
    const url = `http://localhost:8000/api/Game/${game.id}`;
    const response = await axios.put(url, game);
    return response.data
  },
  async deleteGame(id: number) {
    const url = `http://localhost:8000/api/Game/${id}`;
    const response = await axios.delete(url);
    return response.data
  },
}