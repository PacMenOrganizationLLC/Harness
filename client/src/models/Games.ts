export interface Game {
  id: number;
  name: string;
  repoLink?: string;
  hostUrl: string;
  details?: string;
  createdBy: string;
  supportsMultiSessions: boolean;
  createdAt: Date;
  imageSource?: string;
  ImageFile?: FormData;
}
