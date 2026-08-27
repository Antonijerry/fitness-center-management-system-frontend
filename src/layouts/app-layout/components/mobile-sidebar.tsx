import {
    Dumbbell,
    Menu,
    X,
    ChevronRight,
} from "lucide-react";
import {
    useEffect,
    useState,
} from "react";
import {
    NavLink,
} from "react-router-dom";

import { navigationItems } from "@/config/navigation";
import { hasRole } from "@/lib/roles";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { ROUTES } from "@/app/routes/route-paths";
import { Button } from "@/components/ui/button";

export function MobileSidebar() {
    const [open, setOpen] = useState(false);

    const { user } = useAuth();

    const visibleItems = navigationItems.filter((item) =>
        hasRole(user?.roles ?? [], item.roles),
    );

    /*
     * Prevent the page behind the sidebar from scrolling.
     */
    useEffect(() => {
        if (!open) return;

        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open]);

    /*
     * Close sidebar with Escape.
     */
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [open]);

    return (
        <div className="lg:hidden">
            {/* =========================================================
          MOBILE MENU TRIGGER
      ========================================================= */}
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
                aria-label="Open navigation"
                aria-expanded={open}
                className="
          relative
          z-40
          h-10
          w-10
          rounded-xl
          border
          border-white/10
          bg-white/5
          text-foreground
          backdrop-blur-md
          transition-all
          duration-300
          hover:border-primary/30
          hover:bg-primary/10
          hover:text-primary
        "
            >
                <Menu className="h-5 w-5" />
            </Button>

            {/* =========================================================
          MOBILE OVERLAY
      ========================================================= */}
            {open && (
                <div
                    className="fixed inset-0 z-[9999]"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile navigation"
                >
                    {/* =====================================================
              BACKDROP
          ===================================================== */}
                    <button
                        type="button"
                        aria-label="Close navigation"
                        onClick={() => setOpen(false)}
                        className="
              absolute
              inset-0
              h-full
              w-full
              cursor-default
              bg-slate-950/75
              backdrop-blur-md
              animate-in
              fade-in
              duration-300
            "
                    />

                    {/* =====================================================
              SIDEBAR
          ===================================================== */}
                    <aside
                        className="
              relative
              z-10000
              flex
              h-dvh
              w-[72%]
              max-w-xs
              flex-col
              overflow-hidden

              border-r
              border-white/10

              bg-slate-950

              shadow-2xl
              shadow-black/60

              animate-in
              slide-in-from-left
              duration-300
            "
                    >
                        {/* ===================================================
                FUTURISTIC BACKGROUND EFFECTS
            =================================================== */}

                        {/* Blue glow */}
                        <div
                            className="
                pointer-events-none
                absolute
                -left-32
                -top-32
                h-72
                w-72
                rounded-full
                bg-blue-600/20
                blur-[90px]
              "
                        />

                        {/* Violet glow */}
                        <div
                            className="
                pointer-events-none
                absolute
                -right-32
                top-20
                h-72
                w-72
                rounded-full
                bg-violet-600/20
                blur-[90px]
              "
                        />

                        {/* Cyan glow */}
                        <div
                            className="
                pointer-events-none
                absolute
                bottom-10
                -left-32
                h-72
                w-72
                rounded-full
                bg-cyan-500/10
                blur-[100px]
              "
                        />

                        {/* ===================================================
                HEADER
            =================================================== */}
                        <div
                            className="
                relative
                z-10
                flex
                h-20
                shrink-0
                items-center
                justify-between
                border-b
                border-white/10
                bg-slate-950/80
                px-5
                backdrop-blur-2xl
              "
                        >
                            {/* Brand */}
                            <NavLink
                                to={ROUTES.app.dashboard}
                                onClick={() => setOpen(false)}
                                className="group flex items-center gap-3"
                            >
                                {/* Logo */}
                                <div
                                    className="
                    relative
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl

                    bg-gradient-to-br
                    from-blue-500
                    via-indigo-500
                    to-violet-600

                    text-white

                    shadow-lg
                    shadow-blue-500/30

                    transition-all
                    duration-300

                    group-hover:scale-105
                    group-hover:shadow-blue-500/50
                  "
                                >
                                    <Dumbbell
                                        className="
                      relative
                      z-10
                      h-5
                      w-5
                      transition-transform
                      duration-300
                      group-hover:rotate-[-8deg]
                    "
                                    />

                                    {/* Logo shine */}
                                    <span
                                        className="
                      absolute
                      inset-0
                      bg-gradient-to-tr
                      from-transparent
                      via-white/20
                      to-transparent
                    "
                                    />
                                </div>

                                {/* Brand */}
                                <div>
                                    <p
                                        className="
                      text-base
                      font-extrabold
                      tracking-tight
                      text-white
                    "
                                    >
                                        FitManage
                                    </p>

                                    <p
                                        className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-blue-400
                    "
                                    >
                                        Fitness Center
                                    </p>
                                </div>
                            </NavLink>

                            {/* Close */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setOpen(false)}
                                aria-label="Close navigation"
                                className="
                  h-10
                  w-10
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  text-slate-400
                  transition-all
                  duration-300
                  hover:border-red-400/20
                  hover:bg-red-500/10
                  hover:text-red-400
                "
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* ===================================================
                NAVIGATION
            =================================================== */}
                        <nav
                            aria-label="Mobile application navigation"
                            className="
                relative
                z-10
                flex-1
                overflow-y-auto
                overscroll-contain
                px-4
                py-5
              "
                        >
                            {/* Section label */}
                            <div className="mb-4 px-2">
                                <p
                                    className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-slate-500
                  "
                                >
                                    Application
                                </p>
                            </div>

                            <div className="space-y-2">
                                {visibleItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <NavLink
                                            key={item.href}
                                            to={item.href}
                                            onClick={() => setOpen(false)}
                                            className={({ isActive }) =>
                                                [
                                                    `
                          group
                          relative
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          border
                          px-3
                          py-3
                          text-sm
                          font-medium
                          transition-all
                          duration-300
                          `,
                                                    isActive
                                                        ? `
                              border-primary/20
                              bg-gradient-to-r
                              from-primary/20
                              via-indigo-500/10
                              to-violet-500/10
                              text-white
                              shadow-lg
                              shadow-primary/10
                              `
                                                        : `
                              border-transparent
                              text-slate-400
                              hover:border-white/10
                              hover:bg-white/5
                              hover:text-white
                              `,
                                                ].join(" ")
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    {/* Active left glow */}
                                                    {isActive && (
                                                        <span
                                                            className="
                                absolute
                                -left-[1px]
                                top-1/2
                                h-7
                                w-[2px]
                                -translate-y-1/2
                                rounded-full
                                bg-linear-to-b
                                from-cyan-400
                                via-blue-500
                                to-violet-500
                                shadow-[0_0_12px]
                                shadow-blue-500
                              "
                                                        />
                                                    )}

                                                    {/* Icon container */}
                                                    <span
                                                        className={[
                                                            `
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              transition-all
                              duration-300
                              `,
                                                            isActive
                                                                ? `
                                  bg-linear-to-br
                                  from-blue-500
                                  to-violet-600
                                  text-white
                                  shadow-lg
                                  shadow-blue-500/20
                                  `
                                                                : `
                                  bg-white/5
                                  text-slate-500
                                  group-hover:bg-primary/10
                                  group-hover:text-primary
                                  `,
                                                        ].join(" ")}
                                                    >
                                                        <Icon
                                                            className="h-4 w-4"
                                                            aria-hidden="true"
                                                        />
                                                    </span>

                                                    {/* Label */}
                                                    <span className="flex-1 truncate">
                                                        {item.title}
                                                    </span>

                                                    {/* Arrow */}
                                                    <ChevronRight
                                                        className={[
                                                            "h-4 w-4 transition-all duration-300",
                                                            isActive
                                                                ? "text-primary"
                                                                : "text-slate-700 group-hover:translate-x-0.5 group-hover:text-slate-400",
                                                        ].join(" ")}
                                                    />
                                                </>
                                            )}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </nav>

                        {/* ===================================================
                FOOTER
            =================================================== */}
                        <div
                            className="
                relative
                z-10
                shrink-0
                border-t
                border-white/10
                bg-slate-950/80
                p-4
                backdrop-blur-2xl
              "
                        >
                            <div
                                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-gradient-to-br
                  from-blue-500/10
                  via-indigo-500/10
                  to-violet-500/10
                  p-4
                "
                            >
                                {/* Glow */}
                                <div
                                    className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-24
                    w-24
                    rounded-full
                    bg-blue-500/20
                    blur-3xl
                  "
                                />

                                <div className="relative flex items-center gap-3">
                                    <div
                                        className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-linear-to-br
                      from-blue-500
                      to-violet-600
                      text-white
                      shadow-lg
                      shadow-blue-500/20
                    "
                                    >
                                        <Dumbbell className="h-4 w-4" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-bold text-white">
                                            FitManage
                                        </p>

                                        <p className="mt-0.5 truncate text-[10px] text-slate-500">
                                            Train smarter. Live stronger.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
}