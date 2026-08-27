
import {
    ArrowRight,
    Check,
    Dumbbell,
    Sparkles,
} from "lucide-react";

import {
    Link,
} from "react-router-dom";

import {
    Button,
} from "@/components/ui/button";

import {
    ROUTES,
} from "@/app/routes/route-paths";

const benefits = [
    "Access to modern training equipment",
    "Flexible fitness programs",
    "Professional trainer support",
    "Energetic training environment",
];

export function MembershipCta() {
    return (
        <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-primary-foreground shadow-2xl sm:px-10 sm:py-16 lg:px-16">
                    {/* Decorative elements */}
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" />

                    <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border-[50px] border-white/5" />

                    <div className="absolute right-10 top-10 hidden opacity-10 lg:block">
                        <Dumbbell className="h-48 w-48 rotate-12" />
                    </div>

                    <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                        {/* Main content */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                                <Sparkles className="h-3.5 w-3.5" />
                                Start your fitness journey
                            </div>

                            <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                Your strongest chapter can start today.
                            </h2>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-primary-foreground/80 sm:text-base">
                                Join a fitness environment designed around
                                consistency, progress and results. Set your
                                goals and start building better habits.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Button
                                    asChild
                                    size="lg"
                                    variant="secondary"
                                    className="rounded-xl px-6"
                                >
                                    <Link
                                        to={ROUTES.auth.register}
                                    >
                                        Become a member
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>

                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="rounded-xl border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                                >
                                    <Link
                                        to={ROUTES.auth.login}
                                    >
                                        Member login
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur sm:p-7">
                            <p className="text-sm font-semibold">
                                Membership includes
                            </p>

                            <div className="mt-5 space-y-4">
                                {benefits.map(
                                    (benefit) => (
                                        <div
                                            key={benefit}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                                                <Check className="h-3 w-3" />
                                            </div>

                                            <span className="text-sm text-primary-foreground/85">
                                                {benefit}
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
