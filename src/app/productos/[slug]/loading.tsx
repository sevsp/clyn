export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="aspect-[4/3] animate-pulse rounded-xl bg-muted" />
        <div className="space-y-6">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-8 w-40 animate-pulse rounded bg-muted" />
          <div className="h-11 w-48 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
