import axios from "axios";
import { Competition } from "../../models/Competition";

const BaseUrl = process.env.REACT_APP_API_URL;
const apiUrlBase = `${BaseUrl}/api/competition`;

export const competitionService = {
  async getCompetitions(): Promise<Competition[]> {
    const url = `${apiUrlBase}`;
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
  }
}