import axios from "axios"

export const gameService = {
  async getGames() {
    const url = '/api/WeatherForecast'
    const response = await axios.get(url);
    return response.data
  }
}