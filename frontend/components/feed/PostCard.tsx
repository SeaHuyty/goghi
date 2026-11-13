import type { FeedPost } from "@/lib/types";
import { timeAgo } from "@/lib/time";
import { Avatar } from "@/components/ui/Avatar";
import { PostImages } from "./PostImages";
import { PostActions } from "./PostActions";
import { CommentForm } from "./CommentForm";

export function PostCard({ post }: { post: FeedPost }) {
  return (
    <article className="overflow-hidden rounded-[28px] bg-card shadow-card ring-1 ring-border">
      <header className="flex items-center gap-3 px-5 pb-3 pt-5">
        <Avatar author={post.author} ring />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[15px] font-semibold">{post.author.name}</p>
          <time dateTime={post.created_at} className="text-xs text-muted">
            {timeAgo(post.created_at)}
          </time>
        </div>
      </header>

      <p className="whitespace-pre-line px-5 pb-4 text-[15px] leading-relaxed">{post.caption}</p>

      <PostImages images={post.images} />

      <div className="flex flex-col gap-3 px-4 pb-4 pt-2">
        <PostActions
          postId={post.id}
          initialLiked={post.liked_by_me}
          initialCount={post.like_count}
          commentCount={post.comment_count}
        />
        <CommentForm postId={post.id} />
      </div>
    </article>
  );
}
