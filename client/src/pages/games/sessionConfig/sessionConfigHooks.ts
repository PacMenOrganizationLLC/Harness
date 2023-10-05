import { useMutation, useQuery } from "@tanstack/react-query";
import { getQueryClient } from "../../../queryClient";
import { sessionConfigService } from "./sessionConfigService";
import { SessionConfig } from "../../../models/SessionConfig";

const queryClient = getQueryClient();

export const SessionConfigsKeys = {
  gameSessionConfigKey: (gameId: number) => ["sessionConfigsKey", gameId] as const,
  gameTemplateConfigKey: (gameId: number) => ["templateConfigKey", gameId] as const,
};

export const useGetSessionConfigsQuery = (gameId: number) => {
  return useQuery({
    queryKey: SessionConfigsKeys.gameSessionConfigKey(gameId),
    queryFn: async () => await sessionConfigService.getSessionConfigs(gameId),
  });
};

export const useAddSessionConfigMutation = (gameId: number) => {
  return useMutation({
    mutationFn: async (newSession: SessionConfig) => {
      return await sessionConfigService.addSessionConfigs(newSession);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(SessionConfigsKeys.gameSessionConfigKey(gameId));
    },
  });
};

export const useUpdateSessionConfigMutation = (gameId: number) => {
  return useMutation({
    mutationFn: async (updatedSession: SessionConfig) => {
      return await sessionConfigService.updateSessionConfigs(updatedSession);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(SessionConfigsKeys.gameSessionConfigKey(gameId));
    },
  });
};

export const useDeleteSessionConfigMutation = (gameId: number) => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await sessionConfigService.deleteSessionConfigs(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(SessionConfigsKeys.gameSessionConfigKey(gameId));
    },
  });
};

export const useGetGameTemplateConfigurationQuery = (gameId: number) => {
  return useQuery({
    queryKey: SessionConfigsKeys.gameTemplateConfigKey(gameId),
    queryFn: async () => await sessionConfigService.getGameTemplateConfiguration(gameId),
  });
};
