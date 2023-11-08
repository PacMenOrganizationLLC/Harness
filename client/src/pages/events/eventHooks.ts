import { useMutation, useQuery } from "@tanstack/react-query";
import { eventService } from "./eventService";
import Event from "../../models/Event";
import { getQueryClient } from "../../queryClient";

const queryClient = getQueryClient();

export const EventKeys = {
  eventsKey: ["eventsKey"] as const,
  pastEventsKey: ["eventsKey", "pastEvents"] as const,
};

export const useGetEventsQuery = () => {
  return useQuery({
    queryKey: EventKeys.eventsKey,
    queryFn: async () => await eventService.getEvents(),
  });
};

export const useGetPastEventsQuery = () => {
  return useQuery({
    queryKey: EventKeys.pastEventsKey,
    queryFn: async () => await eventService.getPastEvents(),
  });
};

export const useAddEventMutation = () => {
  return useMutation({
    mutationFn: async (newEvent: Event) => {
      return await eventService.addEvent(newEvent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(EventKeys.eventsKey);
    },
  });
};

export const useUpdateEventMutation = () => {
  return useMutation({
    mutationFn: async (newEvent: Event) => {
      return await eventService.updateEvent(newEvent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(EventKeys.eventsKey);
    },
  });
};

export const useDeleteEventMutation = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await eventService.deleteEvent(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(EventKeys.eventsKey);
    },
  });
};
