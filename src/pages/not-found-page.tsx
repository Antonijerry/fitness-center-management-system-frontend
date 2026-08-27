import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/app/routes/route-paths";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <p className="text-sm font-semibold text-primary">
          404
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>

        <Button asChild className="mt-6">
          <Link to={ROUTES.home}>
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}