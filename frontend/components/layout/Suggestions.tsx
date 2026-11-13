import { getSuggestions } from "@/lib/api/feed";
import { Avatar } from "@/components/ui/Avatar";
import { FollowButton } from "./FollowButton";

export async function Suggestions() {
  const people = await getSuggestions();

  return (
    <aside aria-label="Who to follow" className="hidden w-72 shrink-0 lg:block">
      <div className="sticky top-20 rounded-[28px] bg-card p-5 shadow-card ring-1 ring-border">
        <h2 className="mb-4 text-base font-bold tracking-tight">Who to follow</h2>
        <ul className="flex flex-col gap-4">
          {people.map((p) => (
            <li key={p.id} className="flex items-center gap-3">
              <Avatar author={p} size="sm" />
              <p className="min-w-0 flex-1 truncate text-sm font-medium">{p.name}</p>
              <FollowButton userId={p.id} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
