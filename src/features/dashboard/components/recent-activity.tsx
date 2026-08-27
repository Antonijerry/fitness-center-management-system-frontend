import type {
    RecentActivity as RecentActivityData,
} from "@/features/dashboard/types/dashboard-types";

interface RecentActivityProps {
    activities: RecentActivityData[];
}

export function RecentActivity({
    activities,
}: RecentActivityProps) {
    return (
        <div className="rounded-xl border bg-background shadow-sm">

            <div className="border-b p-5">

                <h2 className="text-base font-semibold">
                    Recent Activity
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Latest activity across the fitness center.
                </p>

            </div>

            <div className="divide-y">

                {activities.length === 0 ? (
                    <div className="p-5 text-sm text-muted-foreground">
                        No recent activity.
                    </div>
                ) : (
                    activities.map(
                        (activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start justify-between gap-4 p-5"
                            >
                                <div>
                                    <p className="text-sm font-medium">
                                        {activity.description}
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {activity.type}
                                    </p>
                                </div>

                                <time
                                    dateTime={
                                        activity.createdAt
                                    }
                                    className="shrink-0 text-xs text-muted-foreground"
                                >
                                    {new Date(
                                        activity.createdAt,
                                    ).toLocaleString()}
                                </time>
                            </div>
                        ),
                    )
                )}

            </div>

        </div>
    );
}