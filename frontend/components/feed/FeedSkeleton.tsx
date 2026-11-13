export function FeedSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-busy="true" aria-label="Loading feed">
      {[0, 1].map((i) => (
        <div key={i} className="animate-pulse space-y-3 rounded-3xl bg-card p-4 ring-1 ring-border">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-full bg-border" />
            <div className="h-3 w-32 rounded bg-border" />
          </div>
          <div className="h-3 w-3/4 rounded bg-border" />
          <div className="aspect-[4/3] rounded-2xl bg-border" />
        </div>
      ))}
    </div>
  );
}
