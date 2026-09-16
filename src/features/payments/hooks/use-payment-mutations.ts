import { useMutation } from "@tanstack/react-query";

import { paymentApi } from "@/features/payments/api/payment-api";

import type {
  PaymentInitializeRequest,
} from "@/features/payments/types/payment-types";

export function useInitializePayment() {
  return useMutation({
    mutationFn: (
      request: PaymentInitializeRequest,
    ) => paymentApi.initializePayment(request),
  });
}

export function useVerifyPayment() {
  return useMutation({
    mutationFn: (reference: string) =>
      paymentApi.verifyPayment(reference),
  });
}