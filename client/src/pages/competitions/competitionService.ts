import axios from "axios";
import { Competition, CompetitionPrize } from "../../models/Competition";

const apiUrlBase = `/api/competition`;
const prizeUrlBase = `/api/prize`;

export const competitionService = {
  async getCompetitions(): Promise<Competition[]> {
    const url = `${apiUrlBase}`;
    const response = await axios.get(url);
    return response.data;
  },
  async getUpcomingCompetitionsByGame(gameId: string): Promise<Competition[]> {
    const url = `${apiUrlBase}/game/${gameId}`;
    const response = await axios.get(url);
    return response.data;
  },
  async getCompetition(id: number): Promise<Competition> {
    const url = `${apiUrlBase}/${id}`;
    const response = await axios.get(url);
    return response.data;
  },
  async addCompetition(competition: Competition) {
    console.log(competition)
    const url = `${apiUrlBase}`;
    const response = await axios.post(url, competition);
    return response.data;
  },
  async updateCompetition(competition: Competition) {
    const url = `${apiUrlBase}`;
    const response = await axios.put(url, competition);
    return response.data;
  },
  async deleteCompetition(id: number) {
    const url = `${apiUrlBase}/${id}`;
    const response = await axios.delete(url);
    return response.data;
  },
  async addPrize(prize: CompetitionPrize) {
    const url = `${prizeUrlBase}`;
    const response = await axios.post(url, prize);
    return response.data;
  },
  async updatePrize(prize: CompetitionPrize) {
    const url = `${prizeUrlBase}`;
    const response = await axios.put(url, prize);
    return response.data;
  },
  async deletePrize(id: number) {
    const url = `${prizeUrlBase}/${id}`;
    const response = await axios.delete(url);
    return response.data;
  },
  async getWinnablePrizes(): Promise<CompetitionPrize[]> {
    const url = `${prizeUrlBase}/winnable`
    const response = await axios.get(url);
    return response.data;
  }
}