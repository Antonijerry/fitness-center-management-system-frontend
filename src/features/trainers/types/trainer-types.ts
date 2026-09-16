export type TrainerStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED";

export interface Trainer {
  id: number;
  userId: number;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  certifications: string | null;
  yearsOfExperience: number | null;
  bio: string | null;
  hourlyRate: number | null;
  status: TrainerStatus;
}

export interface CreateTrainerRequest {
  userId: number;
  specialization: string;
  certifications?: string | null;
  yearsOfExperience?: number | null;
  bio?: string | null;
  hourlyRate?: number | null;
}

export interface UpdateTrainerRequest {
  specialization: string;
  certifications?: string | null;
  yearsOfExperience?: number | null;
  bio?: string | null;
  hourlyRate?: number | null;
}