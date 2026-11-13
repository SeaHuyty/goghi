import type { User } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { ImageIcon } from "@/components/ui/Icons";

// Design-only for now. TODO(you): open a create-post flow -> POST /post {caption, user_id, images:[{url}]}
export function Composer({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-3 rounded-[28px] bg-card p-3 shadow-card ring-1 ring-border">
      <Avatar author={user} ring />
      <button
        type="button"
        className="h-11 min-w-0 flex-1 truncate rounded-full bg-background px-4 text-left text-sm text-muted transition-colors hover:bg-brand-soft hover:text-link"
      >
        Share something, {user.name.split(" ")[0]}…
      </button>
      <button
        type="button"
        aria-label="Add photo"
        className="grid size-11 place-items-center rounded-full bg-foreground text-background transition-transform hover:scale-105 active:scale-95"
      >
        <ImageIcon />
      </button>
    </div>
  );
}
