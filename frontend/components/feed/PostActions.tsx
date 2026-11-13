"use client";

import { useState } from "react";
import { CommentIcon, HeartIcon } from "@/components/ui/Icons";

type Props = {
  postId: string;
  initialLiked: boolean;
  initialCount: number;
  commentCount: number;
};

export function PostActions({ postId, initialLiked, initialCount, commentCount }: Props) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  function toggleLike() {
    // Optimistic update.
    setLiked(!liked);
    setCount((c) => c + (liked ? -1 : 1));

    // TODO(you): call the backend and roll back on failure
    //   liked ? DELETE /post/{postId}/likes : POST /post/{postId}/likes   body: { user_id }
  }

  const pill =
    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-background";

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={toggleLike}
        aria-pressed={liked}
        aria-label={liked ? "Unlike" : "Like"}
        className={`${pill} ${liked ? "text-brand" : "text-muted"}`}
      >
        <HeartIcon filled={liked} className="size-5 transition-transform active:scale-75" />
        <span>{count.toLocaleString()}</span>
      </button>

      <a href={`/post/${postId}`} aria-label={`${commentCount} comments`} className={`${pill} text-muted`}>
        <CommentIcon />
        <span>{commentCount.toLocaleString()}</span>
      </a>
    </div>
  );
}
