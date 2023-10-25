import { useMutation, useQuery } from "@tanstack/react-query";
import { sessionService } from "./sessionService";
import { getQueryClient } from "../../queryClient";
import { Session } from "../../models/Session";

const queryClient = getQueryClient();

export const sessionKeys = {
  all: ["sessions"] as const,
  competition: (competitionId: number) =>
    [...sessionKeys.all, competitionId] as const,
  session: (competitionId: number, sessionId: number) =>
    [
      ...sessionKeys.all,
      ...sessionKeys.competition(competitionId),
      sessionId,
    ] as const,
};

export const useGetSessionsQuery = (id: number) => {
  return useQuery({
    queryKey: sessionKeys.competition(id),
    queryFn: sessionService.getSessions,
  });
};

export const useGetSessionQuery = (competitionId: number, sessionId: number) => {
  return useQuery({
    queryKey: sessionKeys.session(competitionId, sessionId),
    queryFn: async () => await sessionService.getSession(sessionId),
  });
};

export const useAddSessionMutation = (competitionId: number) => {
  return useMutation({
    mutationFn: async (newSession: Session) => {
      return await sessionService.addSession(newSession);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(sessionKeys.competition(competitionId));
    },
  });
};

export const useDeleteSessionMutation = (competitionId: number) => {
  return useMutation({
    mutationFn: async (sessionId: number) => {
      return await sessionService.deleteSession(sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(sessionKeys.competition(competitionId));
    },
  });
};
