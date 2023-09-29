import { useQuery } from "@tanstack/react-query"
import { gameService } from "./gameService"


export const GameKeys = {
  gamesKey: ["gamesKey"] as const
}

export const useGetGamesQuery = () => {
  return useQuery({
    queryKey: GameKeys.gamesKey,
    queryFn: async () => await gameService.getGames()
  })
}