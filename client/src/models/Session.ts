export interface Session {
  id: number;
  competitionId: number;
  playId?: string;
  playUrl?: string;
  name: string;
  creationDate?: Date;
}
