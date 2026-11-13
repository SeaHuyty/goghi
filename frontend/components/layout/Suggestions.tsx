import { getSuggestions } from "@/lib/api/feed";
import { Avatar } from "@/components/ui/Avatar";

export async function Suggestions() {
  const people = await getSuggestions();

  return (
    <aside aria-label="Who to follow" className="hidden w-72 shrink-0 lg:block">
      <div className="sticky top-20 rounded-3xl bg-card p-5 ring-1 ring-border">
        <h2 className="mb-4 text-sm font-semibold">Who to follow</h2>
        <ul className="flex flex-col gap-4">
          {people.map((p) => (
            <li key={p.id} className="flex items-center gap-3">
              <Avatar author={p} size="sm" />
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-sm font-medium">{p.name}</p>
                {p.bio && <p className="truncate text-xs text-muted">{p.bio}</p>}
              </div>
              {/* TODO(you): POST {USER_SERVICE}/follow */}
              <button
                type="button"
                className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-link transition-colors hover:bg-brand hover:text-brand-ink"
              >
                Follow
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
