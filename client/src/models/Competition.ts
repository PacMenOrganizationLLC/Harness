export interface Competition {
  id: number;
  gameId: number;
  eventId: number;
  startAt: Date;
  endAt: Date;
  location: string;
}