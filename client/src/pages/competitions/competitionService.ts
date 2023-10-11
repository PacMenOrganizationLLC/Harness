import axios from "axios";
import { Competition } from "../../models/Competition";

const apiUrlBase = "http://localhost:8000/api/competition";

export const competitionService = {
  async getCompetitions(): Promise<Competition[]> {
    const url = `${apiUrlBase}`;
    const response = await axios.get(url);
    return response.data;
  },
  async addCompetition(competition: Competition) {
    const url = `${apiUrlBase}`;
    const response = await axios.post(url, competition);
    return response.data;
  },
  async updateCompetition(competition: Competition) {
    const url = `${apiUrlBase}/${competition.id}`;
    const response = await axios.put(url, competition);
    return response.data;
  }
}