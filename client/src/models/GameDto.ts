export interface GameDto {
  id: number;
  name: string;
  repoLink?: string;
  details?: string;
  createdAt: Date;
  ImageFile?: FormData;
}
