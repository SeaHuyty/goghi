export function FeedSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-busy="true" aria-label="Loading feed">
      {[0, 1].map((i) => (
        <div key={i} className="animate-pulse space-y-3 rounded-[28px] bg-card p-5 shadow-card ring-1 ring-border">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-full bg-border" />
            <div className="h-3 w-32 rounded bg-border" />
          </div>
          <div className="h-3 w-3/4 rounded bg-border" />
          <div className="aspect-[5/4] rounded-3xl bg-border" />
        </div>
      ))}
    </div>
  );
}
