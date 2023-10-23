import { Game } from "./Games";
import Event from "./Event"

export interface CompetitionPrize {
  id: number;
  prize: string;
  competitionId: number;
  imageFileName: string;
  placement: number;
  userId?: string;
}

export interface Competition {
  id: number;
  gameId: number;
  eventId: number;
  startAt: Date;
  endAt: Date;
  location: string;
  game?: Game
  event?: Event
  prizes?: CompetitionPrize[];
}