"use client";

import { useState, useTransition } from "react";
import { addComment } from "@/lib/api/actions";

export function CommentForm({ postId }: { postId: string }) {
  const [text, setText] = useState("");
  const [pending, startTransition] = useTransition();
  const [failed, setFailed] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || pending) return;

    startTransition(async () => {
      try {
        await addComment(postId, text);
        setText("");
        setFailed(false);
      } catch {
        setFailed(true);
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-full bg-background pl-4 pr-1.5 ring-1 ring-transparent transition-shadow focus-within:bg-card focus-within:ring-foreground/40">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={failed ? "Couldn’t post. Try again…" : "Write a comment…"}
        aria-label="Write a comment"
        maxLength={2000}
        className="h-10 min-w-0 flex-1 bg-transparent text-sm placeholder:text-muted focus:outline-none focus-visible:outline-none"
      />
      <button
        type="submit"
        disabled={!text.trim() || pending}
        className="rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background transition-opacity hover:opacity-80 disabled:opacity-25"
      >
        Post
      </button>
    </form>
  );
}
