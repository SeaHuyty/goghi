import "server-only";
import { getUser } from "./users";
import type { User } from "../types";

/**
 * TODO: replace with real auth. Until then the signed-in user comes from CURRENT_USER_ID in .env.local.
 */
export async function getCurrentUserId(): Promise<string> {
  const id = process.env.CURRENT_USER_ID;
  if (!id) {
    throw new Error("CURRENT_USER_ID is not set. Create a user (see .env.example) and put its id in .env.local.");
  }
  return id;
}

export async function getCurrentUser(): Promise<User> {
  const user = await getUser(await getCurrentUserId());
  if (!user) throw new Error("CURRENT_USER_ID does not match any user in user-service.");
  return user;
}
