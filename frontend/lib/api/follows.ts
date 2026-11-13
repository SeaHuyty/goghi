import "server-only";
import type { Author } from "../types";
import { USER_SERVICE, request } from "./http";

// Rows from GET /followers/{id} and /following/{id}: the follow plus the *other* user's name/avatar.
export type FollowRow = {
  id: string;
  user_id: string; // the user being followed
  follower_id: string;
  created_at: string;
  name: string;
  image_url: string;
};

const rows = async (path: string) => (await request<FollowRow[] | null>(USER_SERVICE, path)) ?? [];

export const listFollowers = (userId: string) => rows(`/followers/${userId}`);
export const listFollowing = (userId: string) => rows(`/following/${userId}`);

export function follow(userId: string, followerId: string) {
  return request<unknown>(USER_SERVICE, `/follow`, { method: "POST", body: { user_id: userId, follower_id: followerId } });
}

export function unfollow(userId: string, followerId: string) {
  return request<void>(USER_SERVICE, `/unfollow`, { method: "POST", body: { user_id: userId, follower_id: followerId } });
}

export const followerAsAuthor = (f: FollowRow): Author => ({
  id: f.follower_id,
  name: f.name,
  image_url: f.image_url || null,
});
