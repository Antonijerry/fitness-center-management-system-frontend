import { apiRequest } from "@/api/request";

import type {
  PaymentInitializeRequest,
  PaymentInitializeResponse,
  PaymentVerificationResponse,
} from "@/features/payments/types/payment-types";

export function initializePayment(
  request: PaymentInitializeRequest,
): Promise<PaymentInitializeResponse> {
  return apiRequest<PaymentInitializeResponse>({
    method: "POST",
    url: "/payments/initialize",
    data: request,
  });
}

export function verifyPayment(
  reference: string,
): Promise<PaymentVerificationResponse> {
  return apiRequest<PaymentVerificationResponse>({
    method: "GET",
    url: `/payments/verify/${encodeURIComponent(reference)}`,
  });
}

export const paymentApi = {
  initializePayment,
  verifyPayment,
};