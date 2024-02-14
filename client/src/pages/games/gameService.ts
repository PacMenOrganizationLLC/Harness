import axios from "axios";
import { Game } from "../../models/Games";
import { GameDto } from "../../models/GameDto";

const BaseUrl = process.env.REACT_APP_API_URL;

export const gameService = {
  async getGames(): Promise<Game[]> {
    const url = `${BaseUrl}/api/Game`;
    const response = await axios.get(url);
    return response.data;
  },
  async getGame(id: number): Promise<Game> {
    const url = `${BaseUrl}/api/Game/${id}`;
    const response = await axios.get(url);
    return response.data;
  },
  async addGame(game: GameDto): Promise<number> {
    const addGame: Game = await convertDtoToGame(game);
    const url = `${BaseUrl}/api/Game`;
    while (!addGame) { }
    const response = await axios.post(url, addGame);
    return response.data;
  },
  async addInstructions(gameId: number, rules: string, gettingStarted: string) {
    const url = `${BaseUrl}/api/Game/${gameId}/instructions`
    const instructions = {
      GameRules: rules,
      GettingStarted: gettingStarted
    }
    const response = await axios.put(url, instructions)
    return response.data
  },
  async updateGame(game: GameDto) {
    const myGame: Game = await convertDtoToGame(game);
    const url = `${BaseUrl}/api/Game/${game.id}`;
    while (!myGame) { }
    console.log(myGame);
    const response = await axios.put(url, myGame);
    return response.data;
  },
  async deleteGame(id: number) {
    const url = `${BaseUrl}/api/Game/${id}`;
    const response = await axios.delete(url);
    return response.data;
  },
  async addImage(image: FormData) {
    const url = `${BaseUrl}/api/Game/Image`;
    const response = await axios.post(url, image);
    console.log(`Filename: ${response.data}`);
    return response.data;
  },
};
const convertDtoToGame = async (gameDto: GameDto): Promise<Game> => {
  const {
    id,
    name,
    hostUrl,
    repoLink,
    details,
    createdBy,
    supportsMultiSessions,
    createdAt,
    ImageFile,
  } = gameDto;

  if (ImageFile) {
    try {
      // Assuming ImageFile is a File object representing an image file
      const imageSource: string = await gameService.addImage(ImageFile);
      return {
        id,
        name,
        hostUrl,
        repoLink,
        details,
        createdBy,
        supportsMultiSessions,
        createdAt,
        imageSource,
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      // If there's an error uploading the image, return the game object without the imageSource
      return {
        id,
        name,
        hostUrl,
        repoLink,
        details,
        createdBy,
        supportsMultiSessions,
        createdAt,
      };
    }
  }

  return {
    id,
    name,
    hostUrl,
    repoLink,
    details,
    createdBy,
    supportsMultiSessions,
    createdAt,
  };
};
