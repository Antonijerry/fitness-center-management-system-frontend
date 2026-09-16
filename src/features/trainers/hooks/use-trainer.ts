import { useQuery } from "@tanstack/react-query";

import {
  trainerApi,
} from "@/features/trainers/api/trainer-api";

import {
  trainerKeys,
} from "@/features/trainers/hooks/use-trainers";

export function useTrainer(
  id: number | undefined,
) {
  return useQuery({
    queryKey: id
      ? trainerKeys.detail(id)
      : ["trainers", "detail", "unknown"],

    queryFn: () =>
      trainerApi.getTrainer(id as number),

    enabled:
      id !== undefined &&
      !Number.isNaN(id),
  });
}