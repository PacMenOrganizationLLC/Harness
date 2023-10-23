import { useMutation, useQuery } from "@tanstack/react-query";
import { competitionService } from "./competitionService";
import { getQueryClient } from "../../queryClient";
import { Competition } from "../../models/Competition";

export const CompetitionKeys = {
  competitionsKey: ["competitionsKey"] as const,
  competitionKey: (id: number) => ["competitionKey", id] as const,
};

const queryClient = getQueryClient();

export const useGetCompetitionsQuery = () => {
  return useQuery({
    queryKey: CompetitionKeys.competitionsKey,
    queryFn: async () => await competitionService.getCompetitions(),
  });
};

export const useGetCompetitionQuery = (id: number) => {
  return useQuery({
    queryKey: CompetitionKeys.competitionKey(id),
    queryFn: async () => await competitionService.getCompetition(id),
  });
};

export const useAddCompetitionMutation = () => {
  return useMutation({
    mutationFn: async (newCompetition: Competition) => {
      return await competitionService.addCompetition(newCompetition);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(CompetitionKeys.competitionsKey);
    },
  });
};

export const useUpdateCompetitionMutation = () => {
  return useMutation({
    mutationFn: async (newCompetition: Competition) => {
      return await competitionService.updateCompetition(newCompetition);
    },
    onSuccess: (_, newCompetition: Competition) => {
      queryClient.invalidateQueries(CompetitionKeys.competitionsKey);
      queryClient.invalidateQueries(CompetitionKeys.competitionKey(newCompetition.id));
    },
  });
};

export const useDeleteCompetitionMutation = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await competitionService.deleteCompetition(id);
    },
    onSuccess: (_, id: number) => {
      queryClient.invalidateQueries(CompetitionKeys.competitionsKey);
      queryClient.invalidateQueries(CompetitionKeys.competitionKey(id));
    },
  });
}
