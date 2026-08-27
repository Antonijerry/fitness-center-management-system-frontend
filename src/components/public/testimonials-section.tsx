
import {
    Quote,
    Star,
} from "lucide-react";

const testimonials = [
    {
        name: "Michael A.",
        role: "Member",
        text: "The environment keeps me motivated. The equipment is excellent and the trainers actually pay attention to your goals.",
    },
    {
        name: "Sarah K.",
        role: "Member",
        text: "I wanted a place where I could stay consistent. The combination of classes, trainers and the community has made a huge difference.",
    },
    {
        name: "David O.",
        role: "Member",
        text: "FitManage gives me everything I need in one place. I can train, track my progress and stay committed to my routine.",
    },
];

export function TestimonialsSection() {
    return (
        <section
            id="testimonials"
            className="border-t py-20 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        Member experiences
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        Built around people who want to progress.
                    </h2>

                    <p className="mt-4 text-muted-foreground">
                        A great gym is more than equipment. It is the
                        environment, support and community that help you
                        keep showing up.
                    </p>
                </div>

                {/* Testimonials */}
                <div className="mt-12 grid gap-5 lg:grid-cols-3">
                    {testimonials.map(
                        (testimonial) => (
                            <article
                                key={testimonial.name}
                                className="group relative rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
                            >
                                {/* Quote icon */}
                                <div className="absolute right-6 top-6 text-muted/50 transition-colors group-hover:text-primary/20">
                                    <Quote className="h-8 w-8" />
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1">
                                    {Array.from({
                                        length: 5,
                                    }).map((_, index) => (
                                        <Star
                                            key={index}
                                            className="h-4 w-4 fill-current text-primary"
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>

                                {/* Review */}
                                <p className="mt-6 text-sm leading-7 text-muted-foreground">
                                    “{testimonial.text}”
                                </p>

                                {/* Member */}
                                <div className="mt-7 flex items-center gap-3 border-t pt-5">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                        {testimonial.name
                                            .split(" ")
                                            .map(
                                                (part) =>
                                                    part[0],
                                            )
                                            .join("")
                                            .slice(0, 2)}
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            {testimonial.name}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}
