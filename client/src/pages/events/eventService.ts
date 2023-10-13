import axios from "axios"
import Event  from "../../models/Event";
export const eventService = {
  async getEvents(): Promise<Event[]> {
    const url = 'http://localhost:8000/api/Event';
    const response = await axios.get(url);
    return response.data
  },
  async addEvent(event: Event) {
    const url = 'http://localhost:8000/api/Event';
    const response = await axios.post(url, event);
    return response.data
  },
  async updateEvent(event: Event) {
    const url = `http://localhost:8000/api/Event/${event.id}`;
    const response = await axios.put(url, Event);
    return response.data
  },
  async deleteEvent(id: number) {
    const url = `http://localhost:8000/api/Event/${id}`;
    const response = await axios.delete(url);
    return response.data
  },
}