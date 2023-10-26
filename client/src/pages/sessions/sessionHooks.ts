import { useMutation, useQuery } from "@tanstack/react-query";
import { sessionService } from "./sessionService";
import { getQueryClient } from "../../queryClient";
import { Session } from "../../models/Session";

const queryClient = getQueryClient();

export const sessionKeys = {
  sessionsKey: (competitionId: number) => ["sessionsKey", competitionId] as const,
  sessionKey: (sessionId: number) => ["sessionKey", sessionId] as const,
};

export const useGetSessionsQuery = (competitionId: number) => {
  return useQuery({
    queryKey: sessionKeys.sessionsKey(competitionId),
    queryFn: sessionService.getSessions,
  });
};

export const useGetSessionQuery = (sessionId: number) => {
  return useQuery({
    queryKey: sessionKeys.sessionKey(sessionId),
    queryFn: async () => await sessionService.getSession(sessionId),
  });
};

export const useAddSessionMutation = (competitionId: number) => {
  return useMutation({
    mutationFn: async (newSession: Session) => {
      return await sessionService.addSession(newSession);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(sessionKeys.sessionsKey(competitionId));
    },
  });
};

export const useDeleteSessionMutation = (competitionId: number) => {
  return useMutation({
    mutationFn: async (sessionId: number) => {
      return await sessionService.deleteSession(sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(sessionKeys.sessionsKey(competitionId));
    },
  });
};
