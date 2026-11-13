"use server";

import { revalidatePath } from "next/cache";
import { follow } from "./follows";
import { createComment, likePost, unlikePost } from "./posts";
import { getCurrentUserId } from "./session";
import { ApiError } from "./http";

export async function setLiked(postId: string, liked: boolean) {
  const me = await getCurrentUserId();
  try {
    await (liked ? likePost(postId, me) : unlikePost(postId, me));
  } catch (e) {
    if (!(e instanceof ApiError && (e.status === 409 || e.status === 404))) throw e;
  }
}

export async function addComment(postId: string, content: string) {
  await createComment(postId, await getCurrentUserId(), content.trim());
  revalidatePath("/");
}

export async function followUser(userId: string) {
  await follow(userId, await getCurrentUserId());
  revalidatePath("/");
}
