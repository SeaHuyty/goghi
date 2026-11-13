import "server-only";
import type { Author, User } from "../types";
import { ApiError, USER_SERVICE, request } from "./http";

type RawUser = Omit<User, "bio" | "image_url"> & { bio: string; image_url: string };
const toUser = (u: RawUser): User => ({ ...u, bio: u.bio || null, image_url: u.image_url || null });

/** Resolves to null when the user doesn't exist. */
export async function getUser(id: string): Promise<User | null> {
  try {
    return toUser(await request<RawUser>(USER_SERVICE, `/users/${id}`));
  } catch (e) {
    if (e instanceof ApiError && (e.status === 404 || e.status === 400)) return null;
    throw e;
  }
}

export const toAuthor = (u: Pick<User, "id" | "name" | "image_url">): Author => ({
  id: u.id,
  name: u.name,
  image_url: u.image_url,
});
