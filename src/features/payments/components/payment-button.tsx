import { CreditCard, Loader2 } from "lucide-react";

import { useInitializePayment } from "@/features/payments/hooks/use-payment-mutations";

interface PaymentButtonProps {
    membershipId: number;
    disabled?: boolean;
}

export function PaymentButton({
    membershipId,
    disabled = false,
}: PaymentButtonProps) {
    const initializePaymentMutation =
        useInitializePayment();

    function handlePayment() {
        initializePaymentMutation.mutate(
            {
                membershipId,
            },
            {
                onSuccess: (response) => {
                    window.location.assign(
                        response.authorizationUrl,
                    );
                },
            },
        );
    }

    const isLoading =
        initializePaymentMutation.isPending;

    return (
        <button
            type="button"
            onClick={handlePayment}
            disabled={disabled || isLoading}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Initializing Payment...
                </>
            ) : (
                <>
                    <CreditCard className="h-4 w-4" />
                    Pay Now
                </>
            )}
        </button>
    );
}
