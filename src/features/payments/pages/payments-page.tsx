import { ArrowRight, CreditCard, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";

export function PaymentsPage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Payments
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Manage membership payments securely through Paystack.
                </p>
            </div>

            {/* Payment Cards */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Membership Payments */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                            <CreditCard className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">
                                Membership Payments
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Make secure payments for pending memberships through
                                Paystack.
                            </p>
                        </div>
                    </div>

                    {/* Payment Steps */}
                    <div className="mt-6 rounded-lg border bg-muted/30 p-4">
                        <p className="text-sm font-medium">
                            How to make a payment
                        </p>

                        <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                                    1
                                </span>

                                <span>
                                    Open a pending membership.
                                </span>
                            </li>

                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                                    2
                                </span>

                                <span>
                                    Click the <strong>Pay Now</strong> button.
                                </span>
                            </li>

                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                                    3
                                </span>

                                <span>
                                    Complete the payment securely on Paystack.
                                </span>
                            </li>

                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                                    4
                                </span>

                                <span>
                                    Return to the application for automatic verification.
                                </span>
                            </li>
                        </ol>
                    </div>

                    {/* Membership Link */}
                    <Link
                        to={ROUTES.app.memberships}
                        className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                        View Memberships
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Security Information */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400">
                            <ShieldCheck className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">
                                Secure Payment Processing
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Your payment is processed securely through Paystack.
                                Payment information is handled by the payment gateway.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="rounded-lg border p-4">
                            <p className="text-sm font-medium">
                                Payment Verification
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Every transaction is verified against its reference,
                                amount, and currency before it is marked successful.
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <p className="text-sm font-medium">
                                Automatic Membership Activation
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Once a payment is successfully verified, the associated
                                membership is automatically activated.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
