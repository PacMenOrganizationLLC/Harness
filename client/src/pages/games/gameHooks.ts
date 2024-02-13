import { useMutation, useQuery } from "@tanstack/react-query";
import { gameService } from "./gameService";
import { Game } from "../../models/Games";
import { getQueryClient } from "../../queryClient";
import { GameDto } from "../../models/GameDto";

const queryClient = getQueryClient();

export const GameKeys = {
  gamesKey: ["gamesKey"] as const,
  gameKey: (id?: string) => ["gameKey", id] as const,
};

export const useGetGamesQuery = () => {
  return useQuery({
    queryKey: GameKeys.gamesKey,
    queryFn: async () => await gameService.getGames(),
  });
};

export const useGetGameQuery = (id?: string) =>
  useQuery({
    queryKey: GameKeys.gameKey(id),
    queryFn: async () => {
      if (!id) return undefined;
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
