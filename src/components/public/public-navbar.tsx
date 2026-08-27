import {
    ArrowRight,
    Dumbbell,
    Menu,
    X,
} from "lucide-react";
import {
    useEffect,
    useState,
    type MouseEvent,
} from "react";
import {
    Link,
    useLocation,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/app/routes/route-paths";

const navigation = [
    {
        label: "Home",
        href: "/",
        section: "home",
    },
    {
        label: "Features",
        href: "/#features",
        section: "features",
    },
    {
        label: "Activities",
        href: "/#activities",
        section: "activities",
    },
    {
        label: "Gallery",
        href: "/#gallery",
        section: "gallery",
    },
    {
        label: "Testimonials",
        href: "/#testimonials",
        section: "testimonials",
    },
    {
        label: "About",
        href: "/#about",
        section: "about",
    },
];

export function PublicNavbar() {
    const [mobileOpen, setMobileOpen] =
        useState(false);

    const [activeSection, setActiveSection] =
        useState("home");

    const location = useLocation();

    const isHomePage =
        location.pathname === ROUTES.home;

    const closeMenu = () => {
        setMobileOpen(false);
    };

    /*
     * Detect active homepage section.
     */
    useEffect(() => {
        if (!isHomePage) {
            return;
        }

        const sectionElements = navigation
            .filter(
                (item) => item.section !== "home",
            )
            .map((item) =>
                document.getElementById(
                    item.section,
                ),
            )
            .filter(
                (
                    element,
                ): element is HTMLElement =>
                    element !== null,
            );

        if (sectionElements.length === 0) {
            return;
        }

        const observer =
            new IntersectionObserver(
                (entries) => {
                    const visibleSections =
                        entries
                            .filter(
                                (entry) =>
                                    entry.isIntersecting,
                            )
                            .sort(
                                (a, b) =>
                                    b.intersectionRatio -
                                    a.intersectionRatio,
                            );

                    if (
                        visibleSections.length > 0
                    ) {
                        setActiveSection(
                            visibleSections[0]
                                .target
                                .id,
                        );
                    }
                },
                {
                    root: null,
                    rootMargin:
                        "-20% 0px -60% 0px",
                    threshold: [
                        0,
                        0.25,
                        0.5,
                        0.75,
                        1,
                    ],
                },
            );

        sectionElements.forEach(
            (section) => {
                observer.observe(section);
            },
        );

        const handleScroll = () => {
            if (window.scrollY < 250) {
                setActiveSection("home");
            }
        };

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            },
        );

        return () => {
            observer.disconnect();

            window.removeEventListener(
                "scroll",
                handleScroll,
            );
        };
    }, [isHomePage]);

    /*
     * Handle homepage navigation.
     */
    const handleSectionClick = (
        event: MouseEvent<HTMLAnchorElement>,
        section: string,
    ) => {
        if (!isHomePage) {
            closeMenu();
            return;
        }

        event.preventDefault();

        if (section === "home") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            setActiveSection("home");
            closeMenu();

            return;
        }

        const element =
            document.getElementById(section);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            setActiveSection(section);
        }

        closeMenu();
    };

    return (
        <header
            className="
        sticky top-0 z-[100]
        w-full
        border-b border-white/10
        bg-slate-950/80
        shadow-[0_8px_40px_rgba(0,0,0,0.25)]
        backdrop-blur-2xl
      "
        >
            {/* =====================================================
          NAVBAR
      ====================================================== */}

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
                {/* =====================================================
    LOGO / BRAND
====================================================== */}

                <Link
                    to={ROUTES.home}
                    onClick={() => {
                        closeMenu();
                        setActiveSection("home");
                    }}
                    className="
    group
    flex
    shrink-0
    items-center
    gap-2.5
    sm:gap-3
  "
                    aria-label="FitManage home"
                >
                    {/* Logo */}

                    <div
                        className="
      relative
      flex
      h-9
      w-9
      shrink-0
      items-center
      justify-center
      overflow-hidden
      rounded-xl
      bg-gradient-to-br
      from-cyan-400
      via-blue-600
      to-violet-600
      text-white
      shadow-[0_0_22px_rgba(59,130,246,0.35)]
      transition-all
      duration-300
      group-hover:scale-105
      group-hover:shadow-[0_0_32px_rgba(59,130,246,0.55)]
      sm:h-10
      sm:w-10
    "
                    >
                        <div
                            className="
        absolute
        inset-0
        bg-white/10
        opacity-0
        transition-opacity
        duration-300
        group-hover:opacity-100
      "
                        />

                        <Dumbbell
                            className="
        relative
        z-10
        h-4
        w-4
        transition-transform
        duration-300
        group-hover:rotate-[-8deg]
        sm:h-5
        sm:w-5
      "
                        />
                    </div>

                    {/* Brand name */}

                    <div className="block">
                        <p
                            className="
        bg-linear-to-r
        from-white
        via-cyan-200
        to-blue-400
        bg-clip-text
        text-sm
        font-bold
        tracking-tight
        text-transparent
        sm:text-base
      "
                        >
                            FitManage
                        </p>

                        <p
                            className="
        hidden
        text-[9px]
        font-medium
        uppercase
        tracking-[0.16em]
        text-slate-400
        min-[400px]:block
        sm:text-[10px]
      "
                        >
                            Fitness Center
                        </p>
                    </div>
                </Link>

                {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

                <nav
                    aria-label="Main navigation"
                    className="
            hidden
            items-center
            gap-1
            md:flex
          "
                >
                    {navigation.map((item) => {
                        const isActive =
                            isHomePage &&
                            activeSection ===
                            item.section;

                        return (
                            <a
                                key={item.section}
                                href={item.href}
                                onClick={(event) =>
                                    handleSectionClick(
                                        event,
                                        item.section,
                                    )
                                }
                                aria-current={
                                    isActive
                                        ? "page"
                                        : undefined
                                }
                                className={`
                  relative
                  rounded-xl
                  px-3
                  py-2
                  text-sm
                  font-medium
                  transition-all
                  duration-300

                  ${isActive
                                        ? `
                        bg-blue-500/10
                        text-cyan-300
                        shadow-[0_0_20px_rgba(59,130,246,0.08)]
                      `
                                        : `
                        text-slate-300
                        hover:bg-white/5
                        hover:text-white
                      `
                                    }
                `}
                            >
                                {item.label}

                                {isActive && (
                                    <>
                                        <span
                                            className="
                        absolute
                        inset-x-3
                        -bottom-px
                        h-0.5
                        rounded-full
                        bg-linear-to-r
                        from-cyan-400
                        via-blue-500
                        to-violet-500
                        shadow-[0_0_10px_rgba(59,130,246,0.8)]
                      "
                                        />

                                        <span
                                            className="
                        absolute
                        -bottom-1
                        left-1/2
                        h-1
                        w-1
                        -translate-x-1/2
                        rounded-full
                        bg-cyan-300
                        shadow-[0_0_10px_rgba(34,211,238,1)]
                      "
                                        />
                                    </>
                                )}
                            </a>
                        );
                    })}
                </nav>

                {/* =====================================================
            DESKTOP ACTIONS
        ====================================================== */}

                <div
                    className="
            hidden
            items-center
            gap-2
            md:flex
          "
                >
                    <Button
                        asChild
                        variant="ghost"
                        className="
              rounded-xl
              border
              border-transparent
              text-slate-300
              transition-all
              duration-300
              hover:border-white/10
              hover:bg-white/5
              hover:text-white
            "
                    >
                        <Link
                            to={
                                ROUTES.auth.login
                            }
                        >
                            Sign in
                        </Link>
                    </Button>

                    <Button
                        asChild
                        className="
              group
              rounded-xl
              border
              border-blue-400/20
              bg-gradient-to-r
              from-cyan-500
              via-blue-600
              to-violet-600
              text-white
              shadow-[0_0_25px_rgba(59,130,246,0.25)]
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-[0_0_35px_rgba(59,130,246,0.45)]
            "
                    >
                        <Link
                            to={
                                ROUTES.auth.register
                            }
                        >
                            Get started

                            <ArrowRight
                                className="
                  ml-2
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                            />
                        </Link>
                    </Button>
                </div>

                {/* =====================================================
            MOBILE MENU BUTTON
        ====================================================== */}

                <Button
                    variant="ghost"
                    size="icon"
                    className="
            h-10
            w-10
            rounded-xl
            border
            border-white/10
            bg-white/5
            text-slate-200
            transition-all
            hover:bg-white/10
            hover:text-white
            md:hidden
          "
                    onClick={() =>
                        setMobileOpen(
                            (value) => !value,
                        )
                    }
                    aria-label={
                        mobileOpen
                            ? "Close navigation"
                            : "Open navigation"
                    }
                    aria-expanded={
                        mobileOpen
                    }
                    aria-controls="mobile-navigation"
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </Button>
            </div>

            {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}

            <div
                id="mobile-navigation"
                className={`
          overflow-hidden
          border-t
          border-white/10
          bg-slate-950/95
          backdrop-blur-2xl
          transition-all
          duration-300
          md:hidden

          ${mobileOpen
                        ? "max-h-[600px] opacity-100"
                        : "max-h-0 border-t-transparent opacity-0"
                    }
        `}
            >
                <div
                    className="
            px-4
            pb-5
            pt-4
            sm:px-6
          "
                >
                    {/* Mobile nav */}

                    <nav
                        aria-label="Mobile navigation"
                        className="
              flex
              flex-col
              gap-1
            "
                    >
                        {navigation.map((item) => {
                            const isActive =
                                isHomePage &&
                                activeSection ===
                                item.section;

                            return (
                                <a
                                    key={item.section}
                                    href={item.href}
                                    onClick={(event) =>
                                        handleSectionClick(
                                            event,
                                            item.section,
                                        )
                                    }
                                    aria-current={
                                        isActive
                                            ? "page"
                                            : undefined
                                    }
                                    className={`
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    px-4
                    py-3.5
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${isActive
                                            ? `
                          border
                          border-blue-400/10
                          bg-gradient-to-r
                          from-cyan-500/10
                          via-blue-500/10
                          to-violet-500/10
                          text-cyan-300
                        `
                                            : `
                          text-slate-300
                          hover:bg-white/5
                          hover:text-white
                        `
                                        }
                  `}
                                >
                                    <span>
                                        {item.label}
                                    </span>

                                    {isActive && (
                                        <span
                                            className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-cyan-400
                        shadow-[0_0_10px_rgba(34,211,238,0.9)]
                      "
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Mobile actions */}

                    <div
                        className="
              mt-4
              grid
              grid-cols-2
              gap-3
              border-t
              border-white/10
              pt-4
            "
                    >
                        <Button
                            asChild
                            variant="outline"
                            className="
                rounded-xl
                border-white/10
                bg-white/5
                text-slate-200
                hover:bg-white/10
                hover:text-white
              "
                            onClick={
                                closeMenu
                            }
                        >
                            <Link
                                to={
                                    ROUTES.auth.login
                                }
                            >
                                Sign in
                            </Link>
                        </Button>

                        <Button
                            asChild
                            className="
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                via-blue-600
                to-violet-600
                text-white
                shadow-[0_0_20px_rgba(59,130,246,0.25)]
                transition-all
                hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]
              "
                            onClick={
                                closeMenu
                            }
                        >
                            <Link
                                to={
                                    ROUTES.auth.register
                                }
                            >
                                Join now
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}