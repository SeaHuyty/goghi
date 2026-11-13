import "server-only";
import type { Author, FeedPost, Profile } from "../types";
import { listFollowers, listFollowing, followerAsAuthor } from "./follows";
import { listLikes, listPosts, listPostsByUser } from "./posts";
import { getCurrentUserId } from "./session";
import { getUser, toAuthor } from "./users";

const UNKNOWN: Omit<Author, "id"> = { name: "Unknown user", image_url: null };

/** Home feed: posts from post-service joined with their authors from user-service. */
export async function getFeed(page = 0): Promise<FeedPost[]> {
  const [me, posts] = await Promise.all([getCurrentUserId(), listPosts(page)]);

  // post-service only knows user_id, so resolve each distinct author once.
  const authorIds = [...new Set(posts.map((p) => p.user_id))];
  const authors = new Map<string, Author>(
    await Promise.all(
      authorIds.map(async (id) => {
        const user = await getUser(id).catch(() => null);
        return [id, user ? toAuthor(user) : { id, ...UNKNOWN }] as const;
      }),
    ),
  );

  // One request per post to know if I liked it. TODO: a `liked_by_me` field on GET /posts would remove this.
  const liked = await Promise.all(
    posts.map((p) =>
      listLikes(p.id)
        .then((likes) => likes.some((l) => l.user_id === me))
        .catch(() => false),
    ),
  );

  return posts.map((p, i) => ({ ...p, author: authors.get(p.user_id)!, liked_by_me: liked[i] }));
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const user = await getUser(userId);
  if (!user) return null;

  const [posts, followers, following] = await Promise.all([
    listPostsByUser(userId),
    listFollowers(userId),
    listFollowing(userId),
  ]);
  return { user, posts, follower_count: followers.length, following_count: following.length };
}

export async function getSuggestions(): Promise<Author[]> {
  const me = await getCurrentUserId();
  const [followers, following] = await Promise.all([listFollowers(me), listFollowing(me)]);
  const followed = new Set(following.map((f) => f.user_id));
  return followers.filter((f) => !followed.has(f.follower_id)).map(followerAsAuthor).slice(0, 5);
}
