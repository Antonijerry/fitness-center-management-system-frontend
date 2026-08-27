import {
    Dumbbell,
    Home,
} from "lucide-react";

import {
    NavLink,
} from "react-router-dom";

import {
    navigationItems,
} from "@/config/navigation";

import {
    hasRole,
} from "@/lib/roles";

import {
    useAuth,
} from "@/features/auth/hooks/use-auth";

import {
    ROUTES,
} from "@/app/routes/route-paths";

export function AppSidebar() {
    const { user } = useAuth();

    const userRoles = user?.roles ?? [];

    const visibleItems = navigationItems.filter(
        (item) =>
            hasRole(
                userRoles,
                item.roles,
            ),
    );

    return (
        <aside
            className="
                sticky
                top-0
                hidden
                h-screen
                w-64
                shrink-0
                overflow-hidden
                border-r
                border-white/[0.08]
                bg-[#020617]/90
                backdrop-blur-2xl
                lg:flex
                lg:flex-col
            "
        >
            {/* Sidebar ambient glow */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-[-100px]
                    top-[-100px]
                    h-72
                    w-72
                    rounded-full
                    bg-blue-600/10
                    blur-[100px]
                "
            />

            {/* =========================
                Logo
            ========================== */}
            <div
                className="
                    relative
                    flex
                    h-16
                    shrink-0
                    items-center
                    border-b
                    border-white/[0.08]
                    px-5
                "
            >
                <NavLink
                    to={ROUTES.app.dashboard}
                    className="group flex items-center gap-3"
                >
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-gradient-to-br
                            from-blue-500
                            to-indigo-600
                            text-white
                            shadow-lg
                            shadow-blue-500/20
                            transition-all
                            duration-300
                            group-hover:scale-105
                            group-hover:shadow-blue-500/40
                        "
                    >
                        <Dumbbell className="h-5 w-5" />
                    </div>

                    <div>
                        <p className="text-sm font-black tracking-tight text-white">
                            FitManage
                        </p>

                        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                            Fitness Center
                        </p>
                    </div>
                </NavLink>
            </div>

            {/* =========================
                Navigation
            ========================== */}
            <nav className="relative min-h-0 flex-1 overflow-y-auto px-3 py-5">
                {/* Section label */}
                <p
                    className="
                        mb-3
                        px-3
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-slate-600
                    "
                >
                    Workspace
                </p>

                <div className="space-y-1.5">
                    {/* HOME */}
                    <NavLink
                        to={ROUTES.home}
                        end
                        className={({ isActive }) =>
                            [
                                `
                                group
                                relative
                                flex
                                items-center
                                gap-3
                                overflow-hidden
                                rounded-xl
                                px-3
                                py-2.5
                                text-sm
                                font-semibold
                                transition-all
                                duration-300
                                `,
                                isActive
                                    ? `
                                        border
                                        border-blue-500/20
                                        bg-blue-500/10
                                        text-blue-300
                                        shadow-[0_0_25px_rgba(59,130,246,0.08)]
                                    `
                                    : `
                                        border
                                        border-transparent
                                        text-slate-500
                                        hover:border-white/[0.06]
                                        hover:bg-white/[0.04]
                                        hover:text-slate-200
                                    `,
                            ].join(" ")
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <span
                                        className="
                                            absolute
                                            left-0
                                            top-1/2
                                            h-7
                                            w-0.5
                                            -translate-y-1/2
                                            rounded-full
                                            bg-gradient-to-b
                                            from-blue-400
                                            to-cyan-400
                                            shadow-[0_0_12px_rgba(59,130,246,0.8)]
                                        "
                                    />
                                )}

                                <Home
                                    className={[
                                        "h-4 w-4 shrink-0 transition-all duration-300",
                                        isActive
                                            ? "text-blue-400"
                                            : "text-slate-600 group-hover:text-blue-400",
                                    ].join(" ")}
                                />

                                <span>Home</span>
                            </>
                        )}
                    </NavLink>

                    {/* OTHER NAVIGATION */}
                    {visibleItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                className={({ isActive }) =>
                                    [
                                        `
                                        group
                                        relative
                                        flex
                                        items-center
                                        gap-3
                                        overflow-hidden
                                        rounded-xl
                                        px-3
                                        py-2.5
                                        text-sm
                                        font-semibold
                                        transition-all
                                        duration-300
                                        `,
                                        isActive
                                            ? `
                                                border
                                                border-blue-500/20
                                                bg-blue-500/10
                                                text-blue-300
                                                shadow-[0_0_25px_rgba(59,130,246,0.08)]
                                            `
                                            : `
                                                border
                                                border-transparent
                                                text-slate-500
                                                hover:border-white/[0.06]
                                                hover:bg-white/[0.04]
                                                hover:text-slate-200
                                            `,
                                    ].join(" ")
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <span
                                                className="
                                                    absolute
                                                    left-0
                                                    top-1/2
                                                    h-7
                                                    w-0.5
                                                    -translate-y-1/2
                                                    rounded-full
                                                    bg-gradient-to-b
                                                    from-blue-400
                                                    to-cyan-400
                                                    shadow-[0_0_12px_rgba(59,130,246,0.8)]
                                                "
                                            />
                                        )}

                                        <Icon
                                            className={[
                                                "h-4 w-4 shrink-0 transition-all duration-300",
                                                isActive
                                                    ? "text-blue-400"
                                                    : "text-slate-600 group-hover:text-blue-400",
                                            ].join(" ")}
                                        />

                                        <span>{item.title}</span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </div>
            </nav>

            {/* =========================
                Footer
            ========================== */}
            <div
                className="
                    relative
                    shrink-0
                    border-t
                    border-white/[0.08]
                    bg-white/[0.015]
                    p-4
                "
            >
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
                        System Online
                    </p>
                </div>

                <p className="mt-2 text-[10px] text-slate-700">
                    FitManage Management System
                </p>
            </div>
        </aside>
    );
}