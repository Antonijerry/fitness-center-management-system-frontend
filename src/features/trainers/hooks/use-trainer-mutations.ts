import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  trainerApi,
} from "@/features/trainers/api/trainer-api";

import {
  trainerKeys,
} from "@/features/trainers/hooks/use-trainers";

import type {
  CreateTrainerRequest,
  TrainerStatus,
  UpdateTrainerRequest,
} from "@/features/trainers/types/trainer-types";

export function useCreateTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      request: CreateTrainerRequest,
    ) => trainerApi.createTrainer(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainerKeys.lists(),
      });
    },
  });
}

export function useUpdateTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: number;
      request: UpdateTrainerRequest;
    }) =>
      trainerApi.updateTrainer(
        id,
        request,
      ),

    onSuccess: (trainer) => {
      queryClient.invalidateQueries({
        queryKey: trainerKeys.lists(),
      });

      queryClient.setQueryData(
        trainerKeys.detail(trainer.id),
        trainer,
      );
    },
  });
}

export function useUpdateTrainerStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: TrainerStatus;
    }) =>
      trainerApi.updateTrainerStatus(
        id,
        status,
      ),

    onSuccess: (trainer) => {
      queryClient.invalidateQueries({
        queryKey: trainerKeys.lists(),
      });

      queryClient.setQueryData(
        trainerKeys.detail(trainer.id),
        trainer,
      );
    },
  });
}