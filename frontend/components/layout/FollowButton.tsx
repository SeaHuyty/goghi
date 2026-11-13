"use client";

import { useState, useTransition } from "react";
import { followUser } from "@/lib/api/actions";

export function FollowButton({ userId }: { userId: string }) {
  const [following, setFollowing] = useState(false);
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (following || pending) return;
    setFollowing(true); // optimistic
    startTransition(async () => {
      try {
        await followUser(userId);
      } catch {
        setFollowing(false);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={following}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-opacity hover:opacity-80 ${
        following ? "bg-background text-muted ring-1 ring-border" : "bg-foreground text-background"
      }`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
