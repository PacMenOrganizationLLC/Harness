import axios from "axios"
import { Game } from "../../models/Games";

export const gameService = {
  async getGames(): Promise<Game[]> {
    const url = 'http://localhost:8000/api/Game';
    const response = await axios.get(url);
    console.log(response.data)
    return response.data
  }
}