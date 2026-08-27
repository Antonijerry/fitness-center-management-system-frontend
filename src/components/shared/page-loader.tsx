export function PageLoader() {
  return (
    <div className="flex `min-h-[240px]` items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"
        aria-label="Loading"
        role="status"
      />
    </div>
  );
}