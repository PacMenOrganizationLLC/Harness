import { useMutation, useQuery } from "@tanstack/react-query";
import { competitionService } from "./competitionService";
import { getQueryClient } from "../../queryClient";
import { Competition, CompetitionPrize } from "../../models/Competition";

export const CompetitionKeys = {
  competitionsKey: ["competitionsKey"] as const,
  competitionKey: (id: number) => ["competitionKey", id] as const,
  competitionsByGameKey: (gameId?: string) => ["competitionsByGameKey", gameId] as const,
  winnablePrizesKey: ["winnablePrizesKey"] as const
};

const queryClient = getQueryClient();


export const useGetCompetitionsQuery = () => {
  return useQuery({
    queryKey: CompetitionKeys.competitionsKey,
    queryFn: async () => await competitionService.getCompetitions(),
  });
};

export const useGetCompetitionsByGameQuery = (gameId?: string) => {
  return useQuery({
    queryKey: CompetitionKeys.competitionsByGameKey(gameId),
    queryFn: async () => {
      if (!gameId) return []
      return await competitionService.getUpcomingCompetitionsByGame(gameId)
    },
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

export const useAddCompetitionPrizeMutation = () => {
  return useMutation({
    mutationFn: async (prize: CompetitionPrize) => {
      return await competitionService.addPrize(prize);
    },
    onSuccess: (_, prize: CompetitionPrize) => {
      queryClient.invalidateQueries(CompetitionKeys.competitionsKey);
      queryClient.invalidateQueries(CompetitionKeys.competitionKey(prize.competitionId));
    },
  });
}

export const useUpdateCompetitionPrizeMutation = () => {
  return useMutation({
    mutationFn: async (prize: CompetitionPrize) => {
      return await competitionService.updatePrize(prize);
    },
    onSuccess: (_, prize: CompetitionPrize) => {
      queryClient.invalidateQueries(CompetitionKeys.competitionsKey);
      queryClient.invalidateQueries(CompetitionKeys.competitionKey(prize.competitionId));
    },
  });
};

export const useDeleteCompetitionPrizeMutation = (competitionId: number) => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await competitionService.deletePrize(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(CompetitionKeys.competitionsKey);
      queryClient.invalidateQueries(CompetitionKeys.competitionKey(competitionId));
    },
  });
};

export const useGetWinnablePrizesQuery = () =>
  useQuery({
    queryKey: CompetitionKeys.winnablePrizesKey,
    queryFn: async () => await competitionService.getWinnablePrizes()
  })