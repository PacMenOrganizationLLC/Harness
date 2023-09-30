import axios from "axios"

export const gameService = {
  async getGames() {
    const url = 'http://localhost:8000/WeatherForecast';
    const response = await axios.get(url);
    return response.data
  }
}