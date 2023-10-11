import { useMutation, useQuery } from "@tanstack/react-query";
import { gameService } from "./gameService";
import { Game } from "../../models/Games";
import { getQueryClient } from "../../queryClient";

const queryClient = getQueryClient();

export const GameKeys = {
  gamesKey: ["gamesKey"] as const,
};

export const useGetGamesQuery = () => {
  return useQuery({
    queryKey: GameKeys.gamesKey,
    queryFn: async () => await gameService.getGames(),
  });
};

export const useAddGameMutation = () => {
  return useMutation({
    mutationFn: async (newGame: Game) => {
      return await gameService.addGame(newGame);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(GameKeys.gamesKey);
    },
  });
};

export const useUpdateGameMutation = () => {
  return useMutation({
    mutationFn: async (newGame: Game) => {
      return await gameService.updateGame(newGame);
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
