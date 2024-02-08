import axios from "axios";
import { Game } from "../../models/Games";

const BaseUrl = process.env.REACT_APP_API_URL;

export const gameService = {
  async getGames(): Promise<Game[]> {
    const url = `${BaseUrl}/api/Game`;
    const response = await axios.get(url);
    return response.data;
  },
  async getGame(id: string): Promise<Game> {
    const url = `${BaseUrl}/api/Game/${id}`;
    const response = await axios.get(url);
    return response.data;
  },
  async addGame(game: Game) {
    const url = `${BaseUrl}/api/Game`;
    const response = await axios.post(url, game);
    return response.data;
  },
  async updateGame(game: Game) {
    const url = `${BaseUrl}/api/Game/${game.id}`;
    const response = await axios.put(url, game);
    return response.data;
  },
  async deleteGame(id: number) {
    const url = `${BaseUrl}/api/Game/${id}`;
    const response = await axios.delete(url);
    return response.data;
  },
  async addImage(image: FormData) {
    const url = `${BaseUrl}/api/Game/Image`;
    const response = await axios.post(url, image);
    console.log(`Filename: ${response.data}`);
    return response.data;
  },
};
