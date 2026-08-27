import type {
    LucideIcon,
} from "lucide-react";

interface DashboardStatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
}

export function DashboardStatCard({
    title,
    value,
    description,
    icon: Icon,
}: DashboardStatCardProps) {
    return (
        <div className="rounded-xl border bg-background p-5 shadow-sm">

            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-bold tracking-tight">
                        {value}
                    </p>

                    {description && (
                        <p className="mt-1 text-xs text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <Icon
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                    />
                </div>

            </div>

        </div>
    );
}