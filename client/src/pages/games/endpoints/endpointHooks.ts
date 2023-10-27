import { useMutation, useQuery } from "@tanstack/react-query"
import { endpointService } from "./endpointService"
import { GameEndpoint } from "../../../models/GameEndpoint"
import { getQueryClient } from "../../../queryClient";
import toast from "react-hot-toast";

const queryClient = getQueryClient();

export const EndpointKeys = {
  endpointTypesKey: ["endpointTypesKey"] as const,
  gameEndpointsKey: (gameId: number) => 
    ["gameEndpointsKey", gameId] as const
}

export const useGetEndpointTypesQuery = () => {
  return useQuery({
    queryKey: EndpointKeys.endpointTypesKey,
    queryFn: async () => await endpointService.getEndpointTypes()
  })
}

export const useSaveGameEndpointMutation = (gameId: number) => {
  return useMutation({
    mutationFn: async (endpoints: GameEndpoint[]) => {
      return await endpointService.saveEndpoints(endpoints)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(EndpointKeys.gameEndpointsKey(gameId))
      toast.success("Successfully Saved Endpoints!")
    },
    onError: () => {
      toast.error("Error Saving Endpoints!")
    }
  })
}

export const useGetGameEndpointsQuery = (gameId: number) => {
  return useQuery({
    queryKey: EndpointKeys.gameEndpointsKey(gameId),
    queryFn: async () => await endpointService.getGameEndpoints(gameId)
  })
}