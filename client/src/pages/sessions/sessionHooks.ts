import { useQuery } from "@tanstack/react-query";
import { sessionService } from "./sessionService";

export const sessionKeys = {
  all: ["sessions"] as const,
  session: (id: number) => [...sessionKeys.all, id] as const,
};

export const useGetSessionsQuery = () => {
  return useQuery({
    queryKey: sessionKeys.all,
    queryFn: sessionService.getSessions,
  });
};

export const useGetSessionQuery = (id: number) => {
  return useQuery({
    queryKey: sessionKeys.session(id),
    queryFn: async () => await sessionService.getSession(id),
  })
}
