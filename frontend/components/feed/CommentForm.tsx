"use client";

import { useState } from "react";

export function CommentForm({ postId }: { postId: string }) {
  const [text, setText] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    // TODO(you): POST /post/{postId}/comments   body: { user_id, content: text }
    void postId;
    setText("");
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-full bg-background pl-4 pr-1.5 ring-1 ring-transparent transition-shadow focus-within:bg-card focus-within:ring-foreground/40">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment…"
        aria-label="Write a comment"
        maxLength={2000}
        className="h-10 min-w-0 flex-1 bg-transparent text-sm placeholder:text-muted focus:outline-none focus-visible:outline-none"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background transition-opacity hover:opacity-80 disabled:opacity-25"
      >
        Post
      </button>
    </form>
  );
}
