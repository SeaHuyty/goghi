import type { Profile } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";

export function ProfileHeader({ profile }: { profile: Profile }) {
  const { user, posts, follower_count, following_count } = profile;
  const stats = [
    { label: "Posts", value: posts.length },
    { label: "Followers", value: follower_count },
    { label: "Following", value: following_count },
  ];

  return (
    <section className="flex flex-col items-center gap-4 rounded-3xl bg-card p-6 text-center ring-1 ring-border sm:flex-row sm:text-left">
      <div className="rounded-full p-1 ring-2 ring-brand">
        <Avatar author={user} size="xl" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="leading-tight">
          <h1 className="text-xl font-bold tracking-tight">{user.name}</h1>
          {user.bio && <p className="mt-1 text-sm text-muted">{user.bio}</p>}
        </div>

        <dl className="flex justify-center gap-8 sm:justify-start">
          {stats.map((s) => (
            <div key={s.label} className="leading-tight">
              <dd className="text-lg font-bold">{s.value.toLocaleString()}</dd>
              <dt className="text-xs text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>

        {/* TODO(you): PUT {USER_SERVICE}/users/{id} */}
        <button
          type="button"
          className="self-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-ink transition-opacity hover:opacity-90 sm:self-start"
        >
          Edit profile
        </button>
      </div>
    </section>
  );
}
