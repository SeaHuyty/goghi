import "server-only";
import type { Comment, Like, Post } from "../types";
import { POST_SERVICE, request } from "./http";

// Go encodes empty slices as `null` in some places; always hand back arrays.
const orEmpty = <T>(v: T[] | null): T[] => v ?? [];
const withImages = (p: Post): Post => ({ ...p, images: p.images ?? [] });

export async function listPosts(page = 0): Promise<Post[]> {
  const posts = orEmpty(await request<Post[] | null>(POST_SERVICE, `/posts?page=${page}`));
  return posts.map(withImages);
}

export async function listPostsByUser(userId: string, page = 0): Promise<Post[]> {
  const posts = orEmpty(await request<Post[] | null>(POST_SERVICE, `/posts/${userId}?page=${page}`));
  return posts.map(withImages);
}

export async function listLikes(postId: string): Promise<Like[]> {
  return orEmpty(await request<Like[] | null>(POST_SERVICE, `/post/${postId}/likes`));
}

export function likePost(postId: string, userId: string) {
  return request<Like>(POST_SERVICE, `/post/${postId}/likes`, { method: "POST", body: { user_id: userId } });
}

export function unlikePost(postId: string, userId: string) {
  return request<void>(POST_SERVICE, `/post/${postId}/likes`, { method: "DELETE", body: { user_id: userId } });
}

export async function listComments(postId: string, page = 0): Promise<Comment[]> {
  return orEmpty(await request<Comment[] | null>(POST_SERVICE, `/post/${postId}/comments?page=${page}`));
}

export function createComment(postId: string, userId: string, content: string) {
  return request<Comment>(POST_SERVICE, `/post/${postId}/comments`, {
    method: "POST",
    body: { user_id: userId, content },
  });
}

export function createPost(userId: string, caption: string, imageUrls: string[] = []) {
  return request<Post>(POST_SERVICE, `/post`, {
    method: "POST",
    body: { user_id: userId, caption, images: imageUrls.map((url) => ({ url })) },
  });
}
