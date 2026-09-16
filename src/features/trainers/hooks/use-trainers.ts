import { useQuery } from "@tanstack/react-query";

import { trainerApi } from "@/features/trainers/api/trainer-api";

export const trainerKeys = {
  all: ["trainers"] as const,

  lists: () =>
    [...trainerKeys.all, "list"] as const,

  details: () =>
    [...trainerKeys.all, "detail"] as const,

  detail: (id: number) =>
    [...trainerKeys.details(), id] as const,
};

export function useTrainers() {
  return useQuery({
    queryKey: trainerKeys.lists(),
    queryFn: trainerApi.getTrainers,
  });
}