import type { FeedPost } from "@/lib/types";
import { PostCard } from "./PostCard";

export function Feed({ posts }: { posts: FeedPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-[28px] bg-card p-12 text-center shadow-card ring-1 ring-border">
        <p className="font-semibold">Nothing here yet</p>
        <p className="mt-1 text-sm text-muted">Follow people to see their posts in your feed.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
