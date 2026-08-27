import {
    Activity,
    ArrowRight,
    Check,
    Dumbbell,
    HeartPulse,
    Play,
    ShieldCheck,
    Sparkles,
    Star,
    Users,
    Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/app/routes/route-paths";
import { PublicNavbar } from "@/components/public/public-navbar";
import { ScrollToTop } from "@/components/public/scroll-to-top";
import { HeroSection } from "@/components/public/hero-section";
import { Button } from "@/components/ui/button";

const features = [
    {
        icon: Dumbbell,
        title: "Modern Equipment",
        description:
            "Train with quality strength and cardio equipment designed for every fitness level.",
        tag: "Performance",
    },
    {
        icon: Users,
        title: "Expert Trainers",
        description:
            "Get guidance from experienced trainers who understand how to help you progress.",
        tag: "Coaching",
    },
    {
        icon: Activity,
        title: "Flexible Programs",
        description:
            "Choose workouts and programs that fit your goals, schedule and fitness level.",
        tag: "Programs",
    },
    {
        icon: HeartPulse,
        title: "Complete Wellness",
        description:
            "Build sustainable habits that support strength, endurance and overall wellbeing.",
        tag: "Wellness",
    },
    {
        icon: Zap,
        title: "High Energy",
        description:
            "Stay motivated in an environment built around energy, consistency and progress.",
        tag: "Motivation",
    },
    {
        icon: ShieldCheck,
        title: "Safe Environment",
        description:
            "Train confidently in a clean, welcoming and professionally managed facility.",
        tag: "Safety",
    },
];

const activities = [
    {
        number: "01",
        title: "Strength Training",
        description:
            "Build strength and muscle with structured resistance training designed around progressive improvement.",
    },
    {
        number: "02",
        title: "Cardio & Conditioning",
        description:
            "Improve endurance and cardiovascular performance through challenging, structured sessions.",
    },
    {
        number: "03",
        title: "Personal Training",
        description:
            "Work directly with a trainer for focused, personalized coaching built around your goals.",
    },
    {
        number: "04",
        title: "Group Fitness",
        description:
            "Train with the community through energetic instructor-led sessions that keep you motivated.",
    },
];

const gallery = [
    {
        title: "Strength Zone",
        category: "Strength",
        image:
            "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1400&q=85",
    },
    {
        title: "Cardio Area",
        category: "Cardio",
        image:
            "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1400&q=85",
    },
    {
        title: "Group Training",
        category: "Community",
        image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=85",
    },
    {
        title: "Personal Training",
        category: "Coaching",
        image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85",
    },
    {
        title: "Functional Training",
        category: "Performance",
        image:
            "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1400&q=85",
    },
    {
        title: "Fitness Community",
        category: "Community",
        image:
            "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=1400&q=85",
    },
];

const testimonials = [
    {
        name: "Michael Johnson",
        role: "Member",
        quote:
            "FitManage completely changed the way I approach training. The environment keeps me motivated and the trainers are excellent.",
        rating: 5,
    },
    {
        name: "Sarah Williams",
        role: "Member",
        quote:
            "I love the energy here. The equipment is great, the classes are challenging and the community makes every session enjoyable.",
        rating: 5,
    },
    {
        name: "David Anderson",
        role: "Member",
        quote:
            "The biggest difference for me has been consistency. Having structured programs and professional support makes reaching my goals easier.",
        rating: 5,
    },
];

const stats = [
    {
        value: "500+",
        label: "Active Members",
        icon: Users,
    },
    {
        value: "20+",
        label: "Expert Trainers",
        icon: Dumbbell,
    },
    {
        value: "50+",
        label: "Weekly Classes",
        icon: Activity,
    },
    {
        value: "24/7",
        label: "Fitness Mindset",
        icon: Zap,
    },
];

const benefits = [
    "Professional training environment",
    "Experienced fitness professionals",
    "Programs for every fitness level",
    "Modern equipment and facilities",
];

export function HomePage() {
    return (
        <div className="min-h-screen  bg-[#020617] text-white">
            {/* =========================================================
                GLOBAL AMBIENT BACKGROUND
            ========================================================== */}

            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute left-[-15%] top-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[150px]" />

                <div className="absolute right-[-15%] top-[20%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[160px]" />

                <div className="absolute bottom-[-15%] left-[30%] h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[150px]" />
            </div>

            <PublicNavbar />

            <main className="overflow-x-hidden">
                {/* =====================================================
                    HERO
                ====================================================== */}

                <HeroSection />

                {/* =====================================================
                    STATS
                ====================================================== */}

                <section
                    aria-label="FitManage statistics"
                    className="relative border-y border-white/[0.08] bg-white/[0.02]"
                >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/70 to-transparent" />

                    <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className={[
                                        "group relative flex items-center gap-4 px-5 py-7 sm:px-8 sm:py-9",
                                        index !== 0
                                            ? "border-white/[0.08] lg:border-l"
                                            : "",
                                        index >= 2
                                            ? "border-t lg:border-t-0"
                                            : "",
                                    ].join(" ")}
                                >
                                    <div
                                        className="
                                            hidden h-12 w-12 shrink-0
                                            items-center justify-center
                                            rounded-2xl
                                            border border-blue-500/20
                                            bg-blue-500/10
                                            text-blue-400
                                            shadow-[0_0_25px_rgba(59,130,246,0.08)]
                                            transition-all duration-300
                                            group-hover:scale-110
                                            group-hover:border-blue-400/40
                                            group-hover:bg-blue-500/20
                                            group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]
                                            sm:flex
                                        "
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-3xl">
                                            {stat.value}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* =====================================================
                    FEATURES
                ====================================================== */}

                <section
                    id="features"
                    className="relative overflow-hidden border-b border-white/[0.06] py-24 sm:py-32"
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[130px]"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[130px]"
                    />

                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <div
                                className="
                                    inline-flex items-center gap-2
                                    rounded-full
                                    border border-blue-500/20
                                    bg-blue-500/10
                                    px-4 py-2
                                    text-xs font-bold uppercase
                                    tracking-[0.15em]
                                    text-blue-400
                                "
                            >
                                <Sparkles className="h-3.5 w-3.5" />

                                Everything you need
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-6xl">
                                More than a gym.
                                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                                    It's your training environment.
                                </span>
                            </h2>

                            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                                Everything is designed to make your fitness
                                journey easier, more effective and more
                                enjoyable.
                            </p>
                        </div>

                        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature) => {
                                const Icon = feature.icon;

                                return (
                                    <article
                                        key={feature.title}
                                        className="
                                            group relative overflow-hidden
                                            rounded-3xl
                                            border border-white/[0.08]
                                            bg-white/[0.035]
                                            p-6
                                            backdrop-blur-xl
                                            transition-all duration-500
                                            hover:-translate-y-2
                                            hover:border-blue-500/30
                                            hover:bg-white/[0.055]
                                            hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                                            sm:p-7
                                        "
                                    >
                                        {/* Glow */}
                                        <div
                                            aria-hidden="true"
                                            className="
                                                absolute -right-16 -top-16
                                                h-40 w-40
                                                rounded-full
                                                bg-blue-500/10
                                                blur-3xl
                                                transition-all duration-500
                                                group-hover:bg-blue-500/20
                                            "
                                        />

                                        <div className="relative">
                                            <div className="flex items-start justify-between gap-4">
                                                <div
                                                    className="
                                                        flex h-12 w-12
                                                        items-center justify-center
                                                        rounded-2xl
                                                        border border-blue-500/20
                                                        bg-gradient-to-br
                                                        from-blue-500/15
                                                        to-violet-500/10
                                                        text-blue-400
                                                        transition-all duration-300
                                                        group-hover:scale-110
                                                        group-hover:border-blue-400/40
                                                        group-hover:text-cyan-300
                                                    "
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                    {feature.tag}
                                                </span>
                                            </div>

                                            <h3 className="mt-7 text-lg font-bold text-white">
                                                {feature.title}
                                            </h3>

                                            <p className="mt-3 text-sm leading-7 text-slate-400">
                                                {feature.description}
                                            </p>

                                            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                                                Discover more

                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    ACTIVITIES
                ====================================================== */}

                <section
                    id="activities"
                    className="relative overflow-hidden py-24 sm:py-32"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 sm:text-sm">
                                    Activities
                                </p>

                                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-6xl">
                                    Find your way to get stronger.
                                </h2>

                                <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                                    From focused strength sessions to
                                    high-energy group workouts, there is
                                    always another way to challenge yourself.
                                </p>
                            </div>

                            <Button
                                asChild
                                variant="outline"
                                className="
                                    w-full rounded-xl
                                    border-white/10
                                    bg-white/[0.03]
                                    text-white
                                    hover:bg-white/[0.08]
                                    hover:text-white
                                    sm:w-fit
                                "
                            >
                                <Link to={ROUTES.auth.register}>
                                    Become a member

                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="mt-14 grid gap-5 md:grid-cols-2">
                            {activities.map((activity) => (
                                <article
                                    key={activity.number}
                                    className="
                                        group relative min-h-64
                                        overflow-hidden
                                        rounded-3xl
                                        border border-white/[0.08]
                                        bg-gradient-to-br
                                        from-white/[0.05]
                                        to-white/[0.015]
                                        p-7
                                        transition-all duration-500
                                        hover:-translate-y-2
                                        hover:border-blue-500/30
                                        hover:shadow-[0_25px_70px_rgba(0,0,0,0.35)]
                                        sm:p-9
                                    "
                                >
                                    <div
                                        aria-hidden="true"
                                        className="
                                            absolute -right-4 -top-8
                                            select-none
                                            text-8xl font-black
                                            leading-none
                                            text-white/[0.025]
                                            transition-all duration-500
                                            group-hover:text-blue-500/[0.08]
                                            sm:text-9xl
                                        "
                                    >
                                        {activity.number}
                                    </div>

                                    <div className="relative flex h-full flex-col">
                                        <div className="flex items-center gap-3">
                                            <span className="h-px w-8 bg-gradient-to-r from-blue-500 to-cyan-400" />

                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                                                Activity
                                            </p>
                                        </div>

                                        <h3 className="mt-6 text-xl font-bold sm:text-2xl">
                                            {activity.title}
                                        </h3>

                                        <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                                            {activity.description}
                                        </p>

                                        <div className="mt-auto flex items-center gap-2 pt-8 text-sm font-bold text-blue-400">
                                            Explore activity

                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    GALLERY
                ====================================================== */}

                <section
                    id="gallery"
                    className="border-y border-white/[0.06] bg-white/[0.015] py-24 sm:py-32"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 sm:text-sm">
                                Inside FitManage
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-6xl">
                                See where your transformation happens.
                            </h2>

                            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                                A modern fitness environment built to keep you
                                focused, energized and inspired.
                            </p>
                        </div>

                        <div className="mt-14 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {gallery.map((item, index) => (
                                <article
                                    key={item.title}
                                    className={[
                                        "group relative overflow-hidden rounded-3xl border border-white/10",
                                        index === 0
                                            ? "sm:row-span-2"
                                            : "",
                                    ].join(" ")}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                        className="
                                            absolute inset-0
                                            h-full w-full
                                            object-cover
                                            transition-transform
                                            duration-700
                                            ease-out
                                            group-hover:scale-110
                                        "
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                                    <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                                        <span className="inline-flex rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-md">
                                            {item.category}
                                        </span>

                                        <h3 className="mt-2 text-lg font-bold sm:text-xl">
                                            {item.title}
                                        </h3>

                                        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-blue-300 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                            Explore

                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    TESTIMONIALS
                ====================================================== */}

                <section
                    id="testimonials"
                    className="relative py-24 sm:py-32"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 sm:text-sm">
                                Member stories
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-6xl">
                                Built around real people.
                            </h2>

                            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                                Our members bring the energy. Their progress
                                tells the story.
                            </p>
                        </div>

                        <div className="mt-14 grid gap-5 lg:grid-cols-3">
                            {testimonials.map((testimonial) => (
                                <article
                                    key={testimonial.name}
                                    className="
                                        group relative overflow-hidden
                                        rounded-3xl
                                        border border-white/[0.08]
                                        bg-white/[0.035]
                                        p-6
                                        backdrop-blur-xl
                                        transition-all duration-500
                                        hover:-translate-y-2
                                        hover:border-blue-500/30
                                        hover:bg-white/[0.05]
                                        hover:shadow-[0_25px_70px_rgba(0,0,0,0.35)]
                                        sm:p-7
                                    "
                                >
                                    <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-blue-500/[0.04] transition-colors group-hover:bg-blue-500/[0.09]" />

                                    <div className="relative">
                                        <div className="flex items-center justify-between">
                                            <div
                                                className="flex gap-1"
                                                aria-label={`${testimonial.rating} out of 5 stars`}
                                            >
                                                {Array.from({
                                                    length: testimonial.rating,
                                                }).map((_, index) => (
                                                    <Star
                                                        key={index}
                                                        className="h-4 w-4 fill-current text-amber-400"
                                                    />
                                                ))}
                                            </div>

                                            <span className="text-4xl font-black text-white/10">
                                                "
                                            </span>
                                        </div>

                                        <p className="mt-5 text-sm leading-7 text-slate-400">
                                            {testimonial.quote}
                                        </p>

                                        <div className="mt-7 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                                            <div
                                                className="
                                                    flex h-11 w-11
                                                    shrink-0
                                                    items-center justify-center
                                                    rounded-full
                                                    border border-blue-500/20
                                                    bg-blue-500/10
                                                    font-bold
                                                    text-blue-400
                                                "
                                            >
                                                {testimonial.name.charAt(0)}
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold">
                                                    {testimonial.name}
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-500">
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    ABOUT / JOIN
                ====================================================== */}

                <section
                    id="about"
                    className="border-t border-white/[0.06] bg-white/[0.015] py-24 sm:py-32"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.035] shadow-2xl backdrop-blur-xl">
                            <div
                                aria-hidden="true"
                                className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-blue-600/15 blur-[120px]"
                            />

                            <div className="relative grid lg:grid-cols-2">
                                <div className="p-7 sm:p-10 lg:p-16">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                                        <Sparkles className="h-3 w-3" />

                                        Your next chapter
                                    </div>

                                    <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                        Stop waiting for motivation.
                                        <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                            Start building consistency.
                                        </span>
                                    </h2>

                                    <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                                        Your goals become easier to reach when
                                        you have the right environment, the
                                        right people and a system that keeps
                                        you moving.
                                    </p>

                                    <div className="mt-8 grid gap-3">
                                        {benefits.map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-3 text-sm text-slate-300"
                                            >
                                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                                                    <Check className="h-3.5 w-3.5" />
                                                </div>

                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        asChild
                                        size="lg"
                                        className="
                                            mt-9 w-full
                                            rounded-xl
                                            bg-gradient-to-r
                                            from-blue-600
                                            to-indigo-600
                                            shadow-lg
                                            shadow-blue-600/20
                                            hover:from-blue-500
                                            hover:to-indigo-500
                                            sm:w-auto
                                        "
                                    >
                                        <Link to={ROUTES.auth.register}>
                                            Join FitManage

                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="relative min-h-80 overflow-hidden lg:min-h-full">
                                    <img
                                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85"
                                        alt="FitManage training environment"
                                        loading="lazy"
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-blue-950/30 mix-blend-multiply" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div
                                            className="
                                                flex h-28 w-28
                                                items-center justify-center
                                                rounded-full
                                                border border-white/20
                                                bg-white/10
                                                shadow-2xl
                                                backdrop-blur-xl
                                                transition-transform
                                                duration-500
                                                hover:scale-110
                                            "
                                        >
                                            <Dumbbell className="h-12 w-12 text-white" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/30 p-4 text-white backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-7">
                                        <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
                                            Train with purpose
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            Progress starts with consistency.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    FINAL CTA
                ====================================================== */}

                <section className="relative overflow-hidden border-y border-blue-400/20 bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700 py-24 text-white sm:py-28">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.2),transparent_35%)]"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-300/20 blur-[100px]"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-violet-950/30 blur-[110px]"
                    />

                    <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
                        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white/90 backdrop-blur-md">
                            <Zap className="h-3.5 w-3.5" />

                            Your strongest version starts here
                        </div>

                        <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-6xl">
                            Ready to make your next workout count?
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                            Join a fitness community designed around
                            progress, consistency and results.
                        </p>

                        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                variant="secondary"
                                className="w-full rounded-xl shadow-xl sm:w-auto"
                            >
                                <Link to={ROUTES.auth.register}>
                                    Get Started

                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>

                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="
                                    w-full rounded-xl
                                    border-white/25
                                    bg-white/10
                                    text-white
                                    backdrop-blur-md
                                    hover:bg-white/20
                                    hover:text-white
                                    sm:w-auto
                                "
                            >
                                <a href="#gallery">
                                    <Play className="mr-2 h-4 w-4" />

                                    Explore the gym
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            {/* =========================================================
                MODERN FOOTER
            ========================================================== */}

            <footer className="border-t border-white/[0.08] bg-[#01040b]">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                        <div>
                            <Link
                                to={ROUTES.home}
                                className="group flex items-center gap-3"
                            >
                                <div
                                    className="
                                        flex h-10 w-10
                                        items-center justify-center
                                        rounded-xl
                                        bg-gradient-to-br
                                        from-blue-500
                                        to-indigo-600
                                        shadow-lg
                                        shadow-blue-500/20
                                        transition-transform
                                        group-hover:scale-105
                                    "
                                >
                                    <Dumbbell className="h-5 w-5 text-white" />
                                </div>

                                <div>
                                    <p className="text-sm font-black text-white">
                                        FitManage
                                    </p>

                                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">
                                        Fitness Center
                                    </p>
                                </div>
                            </Link>

                            <p className="mt-4 max-w-sm text-xs leading-6 text-slate-500">
                                Fitness Center Management System built around
                                progress, consistency and better experiences.
                            </p>
                        </div>

                        <nav
                            aria-label="Footer navigation"
                            className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-500"
                        >
                            <a
                                href="#features"
                                className="transition-colors hover:text-blue-400"
                            >
                                Features
                            </a>

                            <a
                                href="#activities"
                                className="transition-colors hover:text-blue-400"
                            >
                                Activities
                            </a>

                            <a
                                href="#gallery"
                                className="transition-colors hover:text-blue-400"
                            >
                                Gallery
                            </a>

                            <a
                                href="#testimonials"
                                className="transition-colors hover:text-blue-400"
                            >
                                Testimonials
                            </a>

                            <a
                                href="#about"
                                className="transition-colors hover:text-blue-400"
                            >
                                About
                            </a>
                        </nav>
                    </div>

                    <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            © {new Date().getFullYear()} FitManage. All rights
                            reserved.
                        </p>

                        <p className="text-blue-500/70">
                            Fitness. Consistency. Progress.
                        </p>
                    </div>
                </div>
            </footer>

            <ScrollToTop />
        </div>
    );
}