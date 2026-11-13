import Image from "next/image";
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
    <section className="overflow-hidden rounded-[28px] bg-card shadow-card ring-1 ring-border">
      <div className="relative h-32 bg-gradient-to-br from-brand via-[#4fd0ee] to-[#a7ecfa] sm:h-40">
        <Image
          src="/gopher.png"
          alt=""
          width={120}
          height={161}
          className="absolute -bottom-6 right-6 h-28 w-auto -rotate-12 opacity-90 drop-shadow-lg sm:h-36"
        />
      </div>

      <div className="px-6 pb-6">
        <div className="-mt-12 flex items-end justify-between gap-4 sm:-mt-14">
          <div className="rounded-full bg-card p-1.5">
            <Avatar author={user} size="xl" />
          </div>
          {/* TODO(you): PUT {USER_SERVICE}/users/{id} */}
          <button
            type="button"
            className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Edit profile
          </button>
        </div>

        <div className="mt-4 leading-tight">
          <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
          {user.bio && <p className="mt-1.5 text-sm text-muted">{user.bio}</p>}
        </div>

        <dl className="mt-5 grid grid-cols-3 divide-x divide-border rounded-2xl bg-background py-3 text-center">
          {stats.map((s) => (
            <div key={s.label} className="leading-tight">
              <dd className="text-lg font-bold">{s.value.toLocaleString()}</dd>
              <dt className="text-xs text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
