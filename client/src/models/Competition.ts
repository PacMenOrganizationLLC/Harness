import { FormatDate, getTimeNoSeconds } from "../helpers/dateAndTimeHelpers";
import { Game } from "./Game";
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

export function formatCompetitionDate(competition: Competition) {
  const isSameDay = new Date(competition.startAt).toDateString() === new Date(competition.endAt).toDateString();
  const formattedStartDate = FormatDate(competition.startAt);
  const formattedEndDate = FormatDate(competition.endAt);
  const formattedStartTime = getTimeNoSeconds(competition.startAt);
  const formattedEndTime = getTimeNoSeconds(competition.endAt);

  return isSameDay
    ? `${formattedStartDate} ${formattedStartTime} - ${formattedEndTime}`
    : `${formattedStartDate} - ${formattedEndDate} ${formattedStartTime} - ${formattedEndTime}`;
}
