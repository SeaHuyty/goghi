import type { FeedPost } from "@/lib/types";
import { timeAgo } from "@/lib/api/time";
import { Avatar } from "@/components/ui/Avatar";
import { PostImages } from "./PostImages";
import { PostActions } from "./PostActions";
import { CommentForm } from "./CommentForm";

export function PostCard({ post }: { post: FeedPost }) {
  return (
    <article className="flex flex-col gap-3 rounded-3xl bg-card p-4 ring-1 ring-border">
      <header className="flex items-center gap-3">
        <Avatar author={post.author} />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-semibold">{post.author.name}</p>
          <time dateTime={post.created_at} className="text-xs text-muted">
            {timeAgo(post.created_at)}
          </time>
        </div>
      </header>

      <p className="whitespace-pre-line text-[15px] leading-relaxed">{post.caption}</p>

      <PostImages images={post.images} />

      <PostActions
        postId={post.id}
        initialLiked={post.liked_by_me}
        initialCount={post.like_count}
        commentCount={post.comment_count}
      />

      <CommentForm postId={post.id} />
    </article>
  );
}
