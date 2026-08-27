
import {
  ArrowUpRight,
  Dumbbell,
  HeartPulse,
  Users,
  Zap,
} from "lucide-react";

const galleryItems = [
  {
    title: "Strength Zone",
    description:
      "Dedicated space for serious strength and resistance training.",
    icon: Dumbbell,
    className:
      "md:col-span-2 md:row-span-2 min-h-[320px]",
  },
  {
    title: "Group Training",
    description:
      "Energetic sessions designed to keep you motivated.",
    icon: Users,
    className:
      "min-h-[220px]",
  },
  {
    title: "Cardio Zone",
    description:
      "Push your endurance and conditioning further.",
    icon: Zap,
    className:
      "min-h-[220px]",
  },
  {
    title: "Wellness",
    description:
      "A balanced approach to strength, health and wellbeing.",
    icon: HeartPulse,
    className:
      "md:col-span-2 min-h-[240px]",
  },
];

export function GymGallery() {
  return (
    <section
      id="gallery"
      className="border-t bg-muted/20 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Inside FitManage
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for every stage of your fitness journey.
            </h2>

            <p className="mt-4 text-muted-foreground">
              Explore a training environment designed to give
              you the space, equipment and energy you need to
              keep moving forward.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Train. Progress. Repeat.
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-12 grid gap-4 md:grid-cols-4 md:auto-rows-[160px]">
          {galleryItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={`group relative overflow-hidden rounded-3xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.className}`}
              >
                {/* Decorative background */}
                <div
                  className={[
                    "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
                    index === 0
                      ? "from-primary/80 via-primary/50 to-slate-950"
                      : index === 1
                        ? "from-slate-900 via-primary/70 to-primary/30"
                        : index === 2
                          ? "from-primary/70 via-primary/30 to-slate-950"
                          : "from-slate-950 via-primary/50 to-primary/20",
                  ].join(" ")}
                />

                {/* Decorative circles */}
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[20px] border-white/10" />

                <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full border-[24px] border-white/5" />

                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-between p-6 text-white sm:p-7">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-white/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-background p-5">
            <p className="text-2xl font-bold">
              Modern
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Equipment and training spaces
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5">
            <p className="text-2xl font-bold">
              Flexible
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Programs for different fitness goals
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5">
            <p className="text-2xl font-bold">
              Community
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              An environment built around progress
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
