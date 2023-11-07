export interface Session {
  id: number;
  competitionId: number;
  playId?: string;
  playUrl?: string;
  name: string;
  creationDate?: Date;
}

export interface SessionScoreboard {
  id: number;
  sessionId: number;
  playerName: string;
  rank: number;
  score?: number;
}