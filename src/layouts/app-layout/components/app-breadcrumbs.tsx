import {
    Link,
    useLocation,
} from "react-router-dom";

import {
    ROUTES,
} from "@/app/routes/route-paths";

export function AppBreadcrumbs() {
    const location =
        useLocation();

    const segments =
        location.pathname
            .split("/")
            .filter(Boolean);

    if (
        segments.length === 0
    ) {
        return null;
    }

    return (
        <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
        >

            {/* ========================= */}
            {/* Home                       */}
            {/* ========================= */}

            <Link
                to={ROUTES.app.dashboard}
                className="hover:text-foreground"
            >
                Home
            </Link>


            {/* ========================= */}
            {/* Path segments               */}
            {/* ========================= */}

            {segments.map(
                (segment, index) => {
                    const path =
                        "/" +
                        segments
                            .slice(
                                0,
                                index + 1,
                            )
                            .join("/");

                    const label =
                        segment
                            .replace(
                                /-/g,
                                " ",
                            )
                            .replace(
                                /\b\w/g,
                                (letter) =>
                                    letter.toUpperCase(),
                            );

                    const isLast =
                        index ===
                        segments.length - 1;

                    return (
                        <span
                            key={path}
                            className="flex items-center gap-2"
                        >

                            <span
                                aria-hidden="true"
                            >
                                /
                            </span>

                            {isLast ? (
                                <span className="font-medium text-foreground">
                                    {label}
                                </span>
                            ) : (
                                <Link
                                    to={path}
                                    className="hover:text-foreground"
                                >
                                    {label}
                                </Link>
                            )}

                        </span>
                    );
                },
            )}

        </nav>
    );
}