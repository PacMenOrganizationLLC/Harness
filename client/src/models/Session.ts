import { Game } from "./Game";

export interface Session {
  id: number;
  gameId: number;
  competitionId?: number;
  creationDate: Date;
  hostUrl?: string;
  game?: Game;
}


export function calculateRemainingTime(creationDate: Date, duration: number): string {
  const startDate = new Date(creationDate);
  const durationMs = duration * 60 * 1000;
  const endTime = new Date(startDate.getTime() + durationMs);
  const now = new Date();
  const diffMs = endTime.getTime() - now.getTime();
  if (diffMs <= 0) {
    return "Ended";
  }

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
  let remainingTimeString = "";

  if (diffHours > 0) {
    remainingTimeString += `${diffHours} hour${diffHours > 1 ? 's' : ''} `;
  }
  if (diffMinutes > 0) {
    remainingTimeString += `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} `;
  }

  remainingTimeString = remainingTimeString.trim();

  if (remainingTimeString === "") {
    return "Less than a minute remaining";
  }

  return `${remainingTimeString} remaining`;
}