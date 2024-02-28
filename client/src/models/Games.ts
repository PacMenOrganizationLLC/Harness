export interface Game {
  id: number;
  name: string;
  repoLink?: string;
  details?: string;
  createdAt: Date;
  imageSource?: string;
  gameRules?: string;
  gettingStartedInstructions?: string;
  dockerImage?: string;
  duration?: number;
  maxAmount?: number;
  apiSubPath?: string;
}

export interface DockerConfig {
  dockerImage: string;
  duration: number;
  maxAmount: number;
  apiSubPath: string;
}