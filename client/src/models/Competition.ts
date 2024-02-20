import { Game } from "./Games";
import { Session } from "./Session";

export interface CompetitionPrize {
  id: number;
  prize: string;
  competitionId: number;
  placement: number;
  userId?: string;
  imageFilename: string;
  imageData: string;
}

export interface Competition {
  id: number;
  gameId: number;
  name: string;
  description?: string;
  startAt: Date;
  endAt: Date;
  location: string;
  game?: Game
  imageFilename?: string;
  competitionPrizes?: CompetitionPrize[];
  sessions?: Session[];
}