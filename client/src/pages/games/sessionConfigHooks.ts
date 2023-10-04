import { useMutation, useQuery } from "@tanstack/react-query";
import { Game } from "../../models/Games";
import { getQueryClient } from "../../queryClient";
import { sessionConfigService } from "./sessionConfigService";
import { SessionConfig } from "../../models/SessionConfig";

const queryClient = getQueryClient();

export const SessionConfigsKeys = {
  sessionConfigsKey: ["sessionConfigsKey"] as const,
};

export const useGetGamesQuery = () => {
  return useQuery({
    queryKey: SessionConfigsKeys.sessionConfigsKey,
    queryFn: async () => await sessionConfigService.getSessionConfigs(),
  });
};

export const useAddGameMutation = () => {
  return useMutation({
    mutationFn: async (newSession: SessionConfig) => {
      return await sessionConfigService.addSessionConfigs(newSession);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(SessionConfigsKeys.sessionConfigsKey);
    },
  });
};

export const useUpdateGameMutation = () => {
  return useMutation({
    mutationFn: async (updatedSession: SessionConfig) => {
      return await sessionConfigService.updateSessionConfigs(updatedSession);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(SessionConfigsKeys.sessionConfigsKey);
    },
  });
};

export const useDeleteGameMutation = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await sessionConfigService.deleteSessionConfigs(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(SessionConfigsKeys.sessionConfigsKey);
    },
  });
};
