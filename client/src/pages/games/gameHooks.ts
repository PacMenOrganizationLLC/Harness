import { useMutation, useQuery } from "@tanstack/react-query";
import { gameService } from "./gameService";
import { getQueryClient } from "../../queryClient";
import { GameDto } from "../../models/GameDto";
import { DockerConfig } from "../../models/Games";
import toast from "react-hot-toast";

const queryClient = getQueryClient();

export const GameKeys = {
  gamesKey: ["gamesKey"] as const,
  gameKey: (id?: number) => ["gameKey", id] as const,
};

export const useGetGamesQuery = () => {
  return useQuery({
    queryKey: GameKeys.gamesKey,
    queryFn: async () => await gameService.getGames(),
  });
};

export const useGetGameQuery = (id?: number) =>
  useQuery({
    queryKey: GameKeys.gameKey(id),
    queryFn: async () => {
      if (!id) return null;
      return await gameService.getGame(id);
    },
  });

export const useAddGameMutation = () => {
  return useMutation({
    mutationFn: async (newGame: GameDto) => {
      return await gameService.addGame(newGame);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(GameKeys.gamesKey);
    },
  });
};

export const useAddGameInstructionsMutation = (gameId?: number) => {
  return useMutation({
    mutationFn: async ({ rules, gettingStarted }: { rules: string, gettingStarted: string }) => {
      if (!gameId) {
        toast.error("Please add a game first")
        return
      }
      return await gameService.addInstructions(gameId, rules, gettingStarted)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(GameKeys.gamesKey);
    },
  })
}

export const useUpdateGameMutation = () => {
  return useMutation({
    mutationFn: async (newGame: GameDto) => {
      return await gameService.updateGame(newGame);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(GameKeys.gamesKey);
    },
  });
};

export const useAddDockerConfigMutation = (gameId?: number) => {
  return useMutation({
    mutationFn: async (dockerConfig: DockerConfig) => {
      if (!gameId) {
        toast.error("Please add a game first")
        return
      }
      return await gameService.addDockerConfig(gameId, dockerConfig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(GameKeys.gamesKey);
    },
  });
};

export const useDeleteGameMutation = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await gameService.deleteGame(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(GameKeys.gamesKey);
    },
  });
};
