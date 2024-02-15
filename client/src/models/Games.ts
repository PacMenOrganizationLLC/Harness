export interface Game {
  id: number;
  name: string;
  hostUrl: string;
  repoLink?: string;
  details?: string;
  createdBy: string;
  supportsMultiSessions: boolean;
  createdAt: Date;
  imageSource?: string;
  gameRules?: string;
  gettingStartedInstructions?: string;
}
