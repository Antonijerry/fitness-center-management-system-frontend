import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/layouts/app-layout/components/app-sidebar";
import { AppHeader } from "@/layouts/app-layout/components/app-header";
import { AppBreadcrumbs } from "@/layouts/app-layout/components/app-breadcrumbs";
import { AppBackground } from "@/layouts/app-layout/components/app-background";

export function AppLayout() {
    return (
        <div className="relative flex h-screen overflow-hidden bg-[#020617] text-white">
            {/* Global application background */}
            <AppBackground />

            {/* Sidebar */}
            <AppSidebar />

            {/* Main application area */}
            <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden">
                {/* Header */}
                <AppHeader />

                {/* Scrollable content */}
                <main className="min-h-0 flex-1 overflow-y-auto">
                    <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6 lg:p-8">
                        <AppBreadcrumbs />

                        <div className="mt-6">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}