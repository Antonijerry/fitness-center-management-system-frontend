import {
    Bell,
    Search,
} from "lucide-react";
import {
    useNavigate,
} from "react-router-dom";

import {
    Input,
} from "@/components/ui/input";
import {
    Button,
} from "@/components/ui/button";
import {
    MobileSidebar,
} from "./mobile-sidebar";
import {
    UserMenu,
} from "./user-menu";
import {
    ROUTES,
} from "@/app/routes/route-paths";

export function AppHeader() {
    const navigate = useNavigate();

    return (
        <header
            className="
        sticky
        top-0
        z-[100]
        flex
        h-16
        items-center
        border-b
        border-white/10
        bg-slate-950/90
        px-3
        shadow-lg
        shadow-black/10
        backdrop-blur-2xl
        sm:px-4
        lg:px-6
      "
        >
            {/* =========================================================
          FUTURISTIC HEADER GLOW
      ========================================================== */}

            <div
                className="
          pointer-events-none
          absolute
          -left-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
            />

            <div
                className="
          pointer-events-none
          absolute
          -right-20
          top-0
          h-40
          w-40
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
            />

            {/* =========================================================
          MOBILE NAVIGATION
      ========================================================== */}

            <div className="relative z-10 lg:hidden">
                <MobileSidebar />
            </div>

            {/* =========================================================
          SEARCH
      ========================================================== */}

            <div className="relative z-10 ml-2 flex flex-1 items-center sm:ml-4">
                <div className="relative hidden w-full max-w-md md:block">
                    {/* Search glow */}
                    <div
                        className="
              pointer-events-none
              absolute
              inset-0
              rounded-xl
              bg-gradient-to-r
              from-blue-500/10
              via-indigo-500/5
              to-violet-500/10
              blur-md
            "
                    />

                    <Search
                        className="
              absolute
              left-3
              top-1/2
              z-10
              h-4
              w-4
              -translate-y-1/2
              text-blue-400
            "
                        aria-hidden="true"
                    />

                    <Input
                        placeholder="Search members, classes..."
                        aria-label="Search members and classes"
                        className="
              relative
              h-10
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              pl-9
              text-sm
              text-white
              placeholder:text-slate-500
              shadow-inner
              backdrop-blur-xl
              transition-all
              duration-300

              focus:border-blue-500/40
              focus:bg-white/[0.07]
              focus:ring-2
              focus:ring-blue-500/10

              hover:border-white/20
              hover:bg-white/[0.06]
            "
                    />
                </div>

                {/* Mobile search button */}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="
            h-10
            w-10
            rounded-xl
            border
            border-white/10
            bg-white/[0.04]
            text-slate-400
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-blue-500/30
            hover:bg-blue-500/10
            hover:text-blue-400
            md:hidden
          "
                    aria-label="Search"
                >
                    <Search className="h-5 w-5" />
                </Button>
            </div>

            {/* =========================================================
          HEADER ACTIONS
      ========================================================== */}

            <div className="relative z-10 flex items-center gap-2">
                {/* Notification */}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Notifications"
                    title="Notifications"
                    onClick={() =>
                        navigate(
                            ROUTES.app.notifications,
                        )
                    }
                    className="
            relative
            h-10
            w-10
            rounded-xl
            
            bg-white/[0.04]
            text-slate-400
            backdrop-blur-xl
            transition-all
            duration-300

            hover:border-blue-500/30
            hover:bg-gradient-to-br
            hover:from-blue-500/10
            hover:to-violet-500/10
            hover:text-blue-400
            hover:shadow-lg
            hover:shadow-blue-500/10
          "
                >
                    <Bell
                        className="h-5 w-5"
                        aria-hidden="true"
                    />

                    {/* Notification indicator */}
                    <span
                        className="
              absolute
              right-2
              top-2
              h-1.5
              w-1.5
              rounded-full
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              shadow-[0_0_8px]
              shadow-blue-500
            "
                    />
                </Button>

                {/* User menu */}
                <div
                    className="
            rounded-xl
            
            
            bg-white/3
            p-0.5
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-blue-500/20
            hover:bg-white/5
          "
                >
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}