import { apiRequest } from "@/api/request";

import type {
  CreateTrainerRequest,
  Trainer,
  TrainerStatus,
  UpdateTrainerRequest,
} from "@/features/trainers/types/trainer-types";

export function createTrainer(
  request: CreateTrainerRequest,
): Promise<Trainer> {
  return apiRequest<Trainer>({
    method: "POST",
    url: "/trainers",
    data: request,
  });
}

export function getTrainers(): Promise<Trainer[]> {
  return apiRequest<Trainer[]>({
    method: "GET",
    url: "/trainers",
  });
}

export function getTrainer(
  id: number,
): Promise<Trainer> {
  return apiRequest<Trainer>({
    method: "GET",
    url: `/trainers/${id}`,
  });
}

export function getTrainerByUserId(
  userId: number,
): Promise<Trainer> {
  return apiRequest<Trainer>({
    method: "GET",
    url: `/trainers/user/${userId}`,
  });
}

export function getTrainerByEmployeeNumber(
  employeeNumber: string,
): Promise<Trainer> {
  return apiRequest<Trainer>({
    method: "GET",
    url: `/trainers/employee/${encodeURIComponent(employeeNumber)}`,
  });
}

export function getTrainersByStatus(
  status: TrainerStatus,
): Promise<Trainer[]> {
  return apiRequest<Trainer[]>({
    method: "GET",
    url: `/trainers/status/${status}`,
  });
}

export function getTrainersBySpecialization(
  value: string,
): Promise<Trainer[]> {
  return apiRequest<Trainer[]>({
    method: "GET",
    url: "/trainers/specialization",
    params: {
      value,
    },
  });
}

export function updateTrainer(
  id: number,
  request: UpdateTrainerRequest,
): Promise<Trainer> {
  return apiRequest<Trainer>({
    method: "PUT",
    url: `/trainers/${id}`,
    data: request,
  });
}

export function updateTrainerStatus(
  id: number,
  status: TrainerStatus,
): Promise<Trainer> {
  return apiRequest<Trainer>({
    method: "PATCH",
    url: `/trainers/${id}/status`,
    params: {
      status,
    },
  });
}

export const trainerApi = {
  createTrainer,
  getTrainers,
  getTrainer,
  getTrainerByUserId,
  getTrainerByEmployeeNumber,
  getTrainersByStatus,
  getTrainersBySpecialization,
  updateTrainer,
  updateTrainerStatus,
};