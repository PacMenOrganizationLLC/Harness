export interface Game {
  id: number;
  name: string;
  repoLink?: string;
  hostUrl: string;
  apiUrl: string;
  details?: string;
  createdBy: string;
  createdAt: Date;
}
