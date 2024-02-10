export interface GameDto {
  id: number;
  name: string;
  hostUrl: string;
  repoLink?: string;
  details?: string;
  createdBy: string;
  supportsMultiSessions: boolean;
  createdAt: Date;
  ImageFile?: FormData;
}
