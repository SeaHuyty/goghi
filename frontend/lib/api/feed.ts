import { currentUserId, follows, likes, posts, users } from "../mock/data";
import type { Author, FeedPost, Profile, User } from "../types";

/*
 * TODO(you): swap these mocks for real calls. Suggested mapping:
 *   getFeed          GET {POST_SERVICE}/posts?page=      + GET {USER_SERVICE}/users/{user_id} per author
 *                    + GET {POST_SERVICE}/post/{id}/likes to compute liked_by_me
 *   getCurrentUser   GET {USER_SERVICE}/users/{id}       (id from your session)
 *   getProfile       GET {USER_SERVICE}/users/{id} + GET {POST_SERVICE}/posts/{id}
 *                    + GET {USER_SERVICE}/followers/{id} and /following/{id} (use the lengths)
 *   getSuggestions   your own endpoint (users the current user doesn't follow)
 */

export async function getFeed(page = 0): Promise<FeedPost[]> {
  void page;
  const byId = new Map<string, Author>(
    users.map((u) => [u.id, { id: u.id, name: u.name, image_url: u.image_url }]),
  );

  return [...posts]
    .sort((a, b) => b.created_at.localeCompare(a.created_at)) // newest first, like the SQL
    .map((p) => ({
      ...p,
      author: byId.get(p.user_id)!,
      liked_by_me: likes.some((l) => l.post_id === p.id && l.user_id === currentUserId),
    }));
}

export async function getCurrentUserId(): Promise<string> {
  return currentUserId;
}

export async function getCurrentUser(): Promise<User> {
  return users.find((u) => u.id === currentUserId)!;
}

export async function getSuggestions(): Promise<User[]> {
  return users.filter((u) => u.id !== currentUserId).slice(2, 5);
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;
  return {
    user,
    posts: posts
      .filter((p) => p.user_id === userId)
      .sort((a, b) => b.created_at.localeCompare(a.created_at)),
    follower_count: follows.filter((f) => f.user_id === userId).length,
    following_count: follows.filter((f) => f.follower_id === userId).length,
  };
}
