
import {
    ArrowRight,
    CheckCircle2,
    Dumbbell,
    Play,
    Sparkles,
    Users,
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

const highlights = [
    "Modern training environment",
    "Professional trainer support",
    "Programs for every fitness level",
];

export function HeroSection() {
    function scrollToActivities() {
        document
            .querySelector("#activities")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    }

    return (
        <section className="relative isolate overflow-hidden">
            {/* =====================================================
          Background
         ===================================================== */}

            <div className="absolute inset-0 -z-20 bg-background" />

            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.14),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(37,99,235,0.08),transparent_30%)]" />

            {/* Decorative grid */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* =====================================================
          Main Hero
         ===================================================== */}

            <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
                <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
                    {/* =================================================
              Content
             ================================================= */}

                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-2 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur">
                            <Sparkles className="h-3.5 w-3.5 text-primary" />

                            <span>
                                Your fitness. Your pace. Your progress.
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                            Build a stronger
                            <span className="block text-primary">
                                version of you.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                            Train in a modern fitness environment designed
                            to help you build strength, improve endurance and
                            stay consistent with your goals.
                        </p>

                        {/* Actions */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 rounded-xl px-6"
                            >
                                <Link
                                    to={ROUTES.auth.register}
                                >
                                    Start your journey
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>

                            <Button
                                type="button"
                                size="lg"
                                variant="outline"
                                className="h-12 rounded-xl px-6"
                                onClick={
                                    scrollToActivities
                                }
                            >
                                <Play className="mr-2 h-4 w-4 fill-current" />
                                Explore activities
                            </Button>
                        </div>

                        {/* Highlights */}
                        <div className="mt-9 space-y-3">
                            {highlights.map(
                                (highlight) => (
                                    <div
                                        key={highlight}
                                        className="flex items-center gap-2.5 text-sm text-muted-foreground"
                                    >
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />

                                        <span>
                                            {highlight}
                                        </span>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* =================================================
              Visual
             ================================================= */}

                    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                        {/* Main visual */}
                        <div className="relative aspect-[4/4.5] overflow-hidden rounded-[2rem] border bg-slate-950 shadow-2xl">
                            {/* Background gradients */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(59,130,246,0.8),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(30,64,175,0.7),transparent_40%)]" />

                            {/* Grid */}
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                                    backgroundSize:
                                        "36px 36px",
                                }}
                            />

                            {/* Large dumbbell */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm sm:h-64 sm:w-64">
                                    <div className="absolute inset-6 rounded-full border border-white/10" />

                                    <Dumbbell className="h-28 w-28 -rotate-12 text-white sm:h-32 sm:w-32" />
                                </div>
                            </div>

                            {/* Top label */}
                            <div className="absolute left-5 top-5 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white backdrop-blur-md sm:left-7 sm:top-7">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                                    FitManage
                                </p>

                                <p className="mt-1 text-sm font-bold">
                                    Train with purpose
                                </p>
                            </div>

                            {/* Bottom information */}
                            <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:bottom-7 sm:left-7 sm:right-7 sm:grid-cols-2">
                                <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-white backdrop-blur-md">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-blue-300" />

                                        <span className="text-xs font-semibold">
                                            Community
                                        </span>
                                    </div>

                                    <p className="mt-2 text-xs leading-5 text-white/60">
                                        Stay motivated by training in an energetic
                                        environment.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-white backdrop-blur-md">
                                    <div className="flex items-center gap-2">
                                        <Dumbbell className="h-4 w-4 text-blue-300" />

                                        <span className="text-xs font-semibold">
                                            Progress
                                        </span>
                                    </div>

                                    <p className="mt-2 text-xs leading-5 text-white/60">
                                        Build sustainable habits and keep moving
                                        forward.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating card */}
                        <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border bg-background/95 p-4 shadow-xl backdrop-blur sm:block sm:-left-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Dumbbell className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-muted-foreground">
                                        Training starts
                                    </p>

                                    <p className="text-sm font-bold">
                                        When you decide
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -right-2 top-8 hidden rounded-full border bg-background/95 px-4 py-2.5 text-xs font-semibold shadow-xl backdrop-blur sm:block sm:-right-5">
                            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500" />
                            Ready when you are
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
          Bottom transition
         ===================================================== */}

            <div className="border-t bg-muted/20">
                <div className="mx-auto grid max-w-7xl gap-0 sm:grid-cols-3">
                    <div className="border-b px-4 py-5 sm:border-b-0 sm:border-r sm:px-6 lg:px-8">
                        <p className="text-sm font-bold">
                            Strength
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Build power and muscle.
                        </p>
                    </div>

                    <div className="border-b px-4 py-5 sm:border-b-0 sm:border-r sm:px-6 lg:px-8">
                        <p className="text-sm font-bold">
                            Conditioning
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Improve endurance and performance.
                        </p>
                    </div>

                    <div className="px-4 py-5 sm:px-6 lg:px-8">
                        <p className="text-sm font-bold">
                            Consistency
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Turn your goals into habits.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
