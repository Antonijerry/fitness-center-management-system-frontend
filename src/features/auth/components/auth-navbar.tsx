import { useState } from "react";
import {
    Dumbbell,
    Menu,
    X,
    LogIn,
    UserPlus,
    Home,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function AuthNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";

    const closeMenu = () => {
        setMobileOpen(false);
    };

    return (
        <header
            className="
        fixed
        inset-x-0
        top-0
        z-50
        border-b
        border-white/10
        bg-slate-950/75
        backdrop-blur-xl
      "
        >
            <div
                className="
          mx-auto
          flex
          h-16
          w-full
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
            >
                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="
            group
            flex
            items-center
            gap-2.5
          "
                >
                    <div
                        className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-linear-to-br
              from-cyan-400
              to-violet-600
              text-white
              shadow-lg
              shadow-cyan-500/20
              transition-transform
              duration-300
              group-hover:scale-105
            "
                    >
                        <Dumbbell className="h-5 w-5" />
                    </div>

                    <div className="flex flex-col">
                        <span
                            className="
                text-base
                font-black
                tracking-tight
                text-white
                sm:text-lg
              "
                        >
                            Fit<span className="text-cyan-400">Manage</span>
                        </span>

                        <span
                            className="
                hidden
                text-[9px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-slate-500
                sm:block
              "
                        >
                            Fitness Management
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-1 md:flex">
                    <Link
                        to="/"
                        className="
              flex
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-slate-300
              transition-colors
              hover:bg-white/5
              hover:text-white
            "
                    >
                        <Home className="h-4 w-4" />
                        Home
                    </Link>

                    <Link
                        to="/login"
                        className={`
              flex
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              transition-colors
              ${isLogin
                                ? "bg-cyan-400/10 text-cyan-400"
                                : "text-slate-300 hover:bg-white/5 hover:text-white"
                            }
            `}
                    >
                        <LogIn className="h-4 w-4" />
                        Sign in
                    </Link>

                    <Link
                        to="/register"
                        className={`
              flex
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              transition-colors
              ${isRegister
                                ? "bg-violet-500/10 text-violet-400"
                                : "text-slate-300 hover:bg-white/5 hover:text-white"
                            }
            `}
                    >
                        <UserPlus className="h-4 w-4" />
                        Create account
                    </Link>
                </nav>

                {/* Desktop CTA */}
                <div className="hidden items-center gap-2 md:flex">
                    {!isLogin && (
                        <Link
                            to="/login"
                            className="
                rounded-lg
                border
                border-white/10
                px-4
                py-2
                text-sm
                font-semibold
                text-slate-200
                transition-all
                hover:border-cyan-400/30
                hover:bg-cyan-400/5
                hover:text-cyan-400
              "
                        >
                            Sign in
                        </Link>
                    )}

                    {!isRegister && (
                        <Link
                            to="/register"
                            className="
                rounded-lg
                bg-linear-to-r
                from-cyan-500
                to-violet-600
                px-4
                py-2
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-cyan-500/10
                transition-all
                hover:scale-[1.02]
                hover:shadow-cyan-500/20
              "
                        >
                            Get started
                        </Link>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={() => setMobileOpen((open) => !open)}
                    className="
            inline-flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            border
            border-white/10
            bg-white/5
            text-slate-200
            transition-colors
            hover:bg-white/10
            hover:text-cyan-400
            md:hidden
          "
                    aria-label={
                        mobileOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`
          overflow-hidden
          border-t
          border-white/10
          bg-slate-950/95
          transition-all
          duration-300
          md:hidden
          ${mobileOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }
        `}
            >
                <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                    <div className="flex flex-col gap-2">
                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                text-slate-300
                transition-colors
                hover:bg-white/5
                hover:text-white
              "
                        >
                            <Home className="h-4 w-4 text-cyan-400" />
                            Home
                        </Link>

                        <Link
                            to="/login"
                            onClick={closeMenu}
                            className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                ${isLogin
                                    ? "bg-cyan-400/10 text-cyan-400"
                                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                                }
              `}
                        >
                            <LogIn className="h-4 w-4" />
                            Sign in
                        </Link>

                        <Link
                            to="/register"
                            onClick={closeMenu}
                            className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                ${isRegister
                                    ? "bg-violet-500/10 text-violet-400"
                                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                                }
              `}
                        >
                            <UserPlus className="h-4 w-4" />
                            Create account
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}