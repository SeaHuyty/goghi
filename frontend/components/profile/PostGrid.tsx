import type { Post } from "@/lib/types";
import { CommentIcon, HeartIcon, LayersIcon } from "@/components/ui/Icons";

export function PostGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-[28px] bg-card p-12 text-center shadow-card ring-1 ring-border">
        <p className="font-semibold">No posts yet</p>
        <p className="mt-1 text-sm text-muted">Photos and thoughts you share will show up here.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-3 gap-2 sm:gap-3">
      {posts.map((post) => {
        const cover = post.images[0];
        return (
          <li key={post.id}>
            {/* TODO(you): create /post/[id] */}
            <a
              href={`/post/${post.id}`}
              className="group relative block aspect-square overflow-hidden rounded-3xl bg-brand-soft"
            >
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element -- remote user-supplied URLs
                <img
                  src={cover.url}
                  alt={post.caption}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <p className="line-clamp-6 p-3 text-xs leading-relaxed text-link sm:p-4 sm:text-sm">
                  {post.caption}
                </p>
              )}

              {post.images.length > 1 && (
                <span className="absolute right-2 top-2 text-white drop-shadow" aria-label="Multiple photos">
                  <LayersIcon className="size-4" />
                </span>
              )}

              <span className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 backdrop-blur-[2px] text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="flex items-center gap-1"><HeartIcon filled className="size-4" />{post.like_count}</span>
                <span className="flex items-center gap-1"><CommentIcon className="size-4" />{post.comment_count}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
