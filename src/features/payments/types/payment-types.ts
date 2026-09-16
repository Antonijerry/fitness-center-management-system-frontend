export type PaymentStatus =
  | "PENDING"
  | "SUCCESSFUL"
  | "FAILED"
  | "ABANDONED"
  | "REFUNDED";

export type PaymentMethod =
  | "PAYSTACK"
  | "CASH"
  | "BANK_TRANSFER"
  | "POS";

export interface PaymentInitializeRequest {
  membershipId: number;
}

export interface PaymentInitializeResponse {
  paymentId: number;
  reference: string;
  authorizationUrl: string;
  accessCode: string;
  amount: number;
  currency: string;
}

export interface PaymentVerificationResponse {
  paymentId: number;
  reference: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  successful: boolean;
}