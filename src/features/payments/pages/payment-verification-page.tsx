import {
    CheckCircle2,
    Loader2,
    XCircle,
} from "lucide-react";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";

import { useVerifyPayment } from "@/features/payments/hooks/use-payment-mutations";

type VerificationState =
    | "verifying"
    | "success"
    | "failed"
    | "missing-reference";

export function PaymentVerificationPage() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const {
        mutate: verifyPaymentMutation,
    } = useVerifyPayment();

    const hasVerified = useRef(false);

    const redirectTimeout =
        useRef<number | null>(null);

    const [state, setState] =
        useState<VerificationState>("verifying");

    const [errorMessage, setErrorMessage] =
        useState<string | null>(null);

    const reference =
        searchParams.get("reference") ||
        searchParams.get("trxref");

    useEffect(() => {
        if (!reference) {
            setState("missing-reference");
            return;
        }

        if (hasVerified.current) {
            return;
        }

        hasVerified.current = true;

        setState("verifying");

        setErrorMessage(null);

        verifyPaymentMutation(reference, {
            onSuccess: (response) => {
                console.log(
                    "Payment verification response:",
                    response,
                );

                console.log(
                    "Payment successful:",
                    response.successful,
                );

                /*
                 * The backend is the source of truth.
                 *
                 * Only when the backend explicitly returns
                 * successful === true do we show the
                 * Payment Successful screen.
                 */
                if (response.successful === true) {
                    setState("success");

                    redirectTimeout.current =
                        window.setTimeout(() => {
                            navigate(
                                ROUTES.app.memberships,
                            );
                        }, 3000);

                    return;
                }

                /*
                 * Verification completed, but the backend
                 * did not mark the payment as successful.
                 */
                setState("failed");

                setErrorMessage(
                    `Payment status: ${response.status}`,
                );
            },

            onError: (error) => {
                console.error(
                    "Payment verification failed:",
                    error,
                );

                setState("failed");

                setErrorMessage(
                    error instanceof Error
                        ? error.message
                        : "Unable to verify payment.",
                );
            },
        });

        return () => {
            if (
                redirectTimeout.current !== null
            ) {
                window.clearTimeout(
                    redirectTimeout.current,
                );
            }
        };
    }, [
        reference,
        navigate,
        verifyPaymentMutation,
    ]);

    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="w-full max-w-lg rounded-xl border bg-card p-8 text-center shadow-sm">

                {/* VERIFYING */}

                {state === "verifying" && (
                    <>
                        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />

                        <h1 className="mt-6 text-xl font-semibold">
                            Verifying Payment
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Please wait while we verify your payment.
                        </p>

                        <div className="mt-6 rounded-lg bg-muted/50 p-4 text-left">
                            <p className="text-xs text-muted-foreground">
                                Payment Reference
                            </p>

                            <p className="mt-1 break-all text-sm font-medium">
                                {reference}
                            </p>
                        </div>

                        <p className="mt-4 text-xs text-muted-foreground">
                            Do not close or refresh this page.
                        </p>
                    </>
                )}

                {/* SUCCESS */}

                {state === "success" && (
                    <>
                        <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />

                        <h1 className="mt-6 text-2xl font-bold">
                            Payment Successful
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Your payment has been successfully verified.
                        </p>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Your membership has been activated.
                        </p>

                        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                            <p className="text-sm font-medium text-green-700 dark:text-green-300">
                                Payment Confirmed
                            </p>

                            <p className="mt-1 break-all text-xs text-green-600 dark:text-green-400">
                                Reference: {reference}
                            </p>
                        </div>

                        <p className="mt-6 text-xs text-muted-foreground">
                            Redirecting to your memberships...
                        </p>
                    </>
                )}

                {/* FAILED */}

                {state === "failed" && (
                    <>
                        <XCircle className="mx-auto h-16 w-16 text-destructive" />

                        <h1 className="mt-6 text-xl font-semibold">
                            Payment Verification Failed
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            We could not verify this payment.
                        </p>

                        {errorMessage && (
                            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                                <p className="text-sm text-red-700 dark:text-red-300">
                                    {errorMessage}
                                </p>
                            </div>
                        )}

                        <p className="mt-4 text-sm text-muted-foreground">
                            If money was deducted from your account,
                            please do not make another payment immediately.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    ROUTES.app.memberships,
                                )
                            }
                            className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                        >
                            Back to Memberships
                        </button>
                    </>
                )}

                {/* MISSING REFERENCE */}

                {state === "missing-reference" && (
                    <>
                        <XCircle className="mx-auto h-16 w-16 text-destructive" />

                        <h1 className="mt-6 text-xl font-semibold">
                            Payment Reference Missing
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            We could not find a payment reference for
                            this transaction.
                        </p>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Please return to your memberships and try
                            again.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    ROUTES.app.memberships,
                                )
                            }
                            className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                        >
                            Back to Memberships
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
