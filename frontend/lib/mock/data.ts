import type { Comment, Follow, Like, Post, User } from "../types";

const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();
// Photos used for both post images and user avatars.
const IMG = [
  "https://i.pinimg.com/736x/ab/f7/f0/abf7f0b5a58c206c0e382db0f988a3c1.jpg",
  "https://i.pinimg.com/736x/7a/8a/d2/7a8ad2bb47aaedf5b88124e41a05eb4a.jpg",
  "https://i.pinimg.com/1200x/5b/b9/3d/5bb93d68806832f23ca81b111254fc0e.jpg",
  "https://i.pinimg.com/1200x/6d/1b/83/6d1b839967e85ccabdc2753abdcf836b.jpg",
  "https://i.pinimg.com/736x/61/91/1c/61911c8806360e03a4d578812fefdbf8.jpg",
  "https://i.pinimg.com/1200x/78/3c/10/783c1069c6072e219fd5d9c6f27c8f89.jpg",
  "https://i.pinimg.com/1200x/c1/99/af/c199af4b99a09e7627756bba03471abe.jpg",
  "https://i.pinimg.com/736x/b3/23/2b/b3232b87501126b662f3f91d0a50650b.jpg",
  "https://i.pinimg.com/736x/f6/38/ba/f638bac3a08dd2ad9a5c768d64e52a68.jpg",
  "https://i.pinimg.com/1200x/ac/10/5d/ac105d47c77a0ce51ad6f1f6b72755ce.jpg",
];

// ---- user-service: GET /users/{id} -------------------------------------------------
export const users: User[] = [
  { id: "3f2a9c1e-7b64-4d8a-9e21-5c0a1b7d4e01", name: "Sokha Chan", bio: "Photographer · Siem Reap", email: "sokha@goghi.dev", image_url: IMG[6], created_at: ago(60 * 24 * 90), updated_at: ago(60 * 24 * 5) },
  { id: "8d41b6f0-2c97-4a3e-b5d8-0e6f93a1c702", name: "Dara Vann", bio: "Building things with Go", email: "dara@goghi.dev", image_url: IMG[3], created_at: ago(60 * 24 * 60), updated_at: ago(60 * 24 * 2) },
  { id: "c7e05a92-91d3-4f6b-8a14-3b2d7c5e9f03", name: "Lina Meas", bio: "Coffee, books, long walks", email: "lina@goghi.dev", image_url: IMG[9], created_at: ago(60 * 24 * 45), updated_at: ago(60 * 24 * 45) },
  { id: "1b9d3e74-5a08-4c2f-96e7-d4f8a0b6c104", name: "Vireak Sok", bio: "Designer. Khmer type nerd.", email: "vireak@goghi.dev", image_url: IMG[1], created_at: ago(60 * 24 * 30), updated_at: ago(60 * 24 * 30) },
  { id: "e5a2c80d-34f1-4b79-8d6a-92c7e1f3b505", name: "Sreyneang Kim", bio: null, email: "sreyneang@goghi.dev", image_url: IMG[7], created_at: ago(60 * 24 * 12), updated_at: ago(60 * 24 * 12) },
];

/** The signed-in user (mock). */
export const currentUserId = users[1].id;

// ---- post-service: GET /posts (counts are derived below, like the SQL subselects) --
type RawPost = Omit<Post, "like_count" | "comment_count">;

const raw: RawPost[] = [
  {
    id: "a1f0c3d2-6e5b-4a79-8c10-7d2e9b4f5a11",
    caption: "Sunrise over Angkor ☀️ worth the 4am wake-up.",
    user_id: users[0].id,
    images: [IMG[0], IMG[1], IMG[2]].map((url, i) => ({
      id: `b0a1c2d3-0000-4000-8000-00000000010${i}`,
      post_id: "a1f0c3d2-6e5b-4a79-8c10-7d2e9b4f5a11",
      url,
      created_at: ago(18),
    })),
    created_at: ago(18),
    updated_at: ago(18),
  },
  {
    id: "a2e1d4c3-7f6c-4b8a-9d21-8e3f0c5a6b22",
    caption: "សួស្តី! Morning coffee and a fresh `go run`.",
    user_id: users[1].id,
    images: [IMG[3], IMG[4]].map((url, i) => ({
      id: `b0a1c2d3-0000-4000-8000-00000000020${i}`,
      post_id: "a2e1d4c3-7f6c-4b8a-9d21-8e3f0c5a6b22",
      url,
      created_at: ago(95),
    })),
    created_at: ago(95),
    updated_at: ago(95),
  },
  {
    id: "a3d2e5b4-8a7d-4c9b-8e32-9f4a1d6b7c33",
    caption: "Just a thought: small, boring services beat clever ones. Every time.",
    user_id: users[2].id,
    images: [],
    created_at: ago(60 * 5),
    updated_at: ago(60 * 5),
  },
  {
    id: "a4c3f6a5-9b8e-4d0c-9f43-0a5b2e7c8d44",
    caption: "Type specimen sketches for a new Khmer display face.",
    user_id: users[3].id,
    images: [IMG[5], IMG[6]].map((url, i) => ({
      id: `b0a1c2d3-0000-4000-8000-00000000040${i}`,
      post_id: "a4c3f6a5-9b8e-4d0c-9f43-0a5b2e7c8d44",
      url,
      created_at: ago(60 * 26),
    })),
    created_at: ago(60 * 26),
    updated_at: ago(60 * 26),
  },
  {
    id: "a5b4a7f6-0c9f-4e1d-8a54-1b6c3f8d9e55",
    caption: "Weekend moodboard ✨ saving these for later.",
    user_id: users[4].id,
    images: [IMG[7], IMG[8], IMG[9]].map((url, i) => ({
      id: `b0a1c2d3-0000-4000-8000-00000000050${i}`,
      post_id: "a5b4a7f6-0c9f-4e1d-8a54-1b6c3f8d9e55",
      url,
      created_at: ago(60 * 50),
    })),
    created_at: ago(60 * 50),
    updated_at: ago(60 * 50),
  },
  // More posts by the signed-in user (users[1]) so the profile grid has content.
  {
    id: "a6c5b8a7-1d0a-4f2e-9b65-2c7d4a9e0f66",
    caption: "Slow Sunday.",
    user_id: users[1].id,
    images: [IMG[5]].map((url, i) => ({
      id: `b0a1c2d3-0000-4000-8000-00000000060${i}`,
      post_id: "a6c5b8a7-1d0a-4f2e-9b65-2c7d4a9e0f66",
      url,
      created_at: ago(60 * 24 * 3),
    })),
    created_at: ago(60 * 24 * 3),
    updated_at: ago(60 * 24 * 3),
  },
  {
    id: "a7d6c9b8-2e1b-4a3f-8c76-3d8e5b0a1a77",
    caption: "Shipping day. Tests green, coffee cold.",
    user_id: users[1].id,
    images: [],
    created_at: ago(60 * 24 * 6),
    updated_at: ago(60 * 24 * 6),
  },
  {
    id: "a8e7dac9-3f2c-4b4a-9d87-4e9f6c1b2b88",
    caption: "Trip dump 📸",
    user_id: users[1].id,
    images: [IMG[8], IMG[2], IMG[9]].map((url, i) => ({
      id: `b0a1c2d3-0000-4000-8000-00000000070${i}`,
      post_id: "a8e7dac9-3f2c-4b4a-9d87-4e9f6c1b2b88",
      url,
      created_at: ago(60 * 24 * 9),
    })),
    created_at: ago(60 * 24 * 9),
    updated_at: ago(60 * 24 * 9),
  },
  {
    id: "a9f8ebda-4a3d-4c5b-8e98-5f0a7d2c3c99",
    caption: "Found this one in the archive.",
    user_id: users[1].id,
    images: [IMG[4]].map((url, i) => ({
      id: `b0a1c2d3-0000-4000-8000-00000000080${i}`,
      post_id: "a9f8ebda-4a3d-4c5b-8e98-5f0a7d2c3c99",
      url,
      created_at: ago(60 * 24 * 12),
    })),
    created_at: ago(60 * 24 * 12),
    updated_at: ago(60 * 24 * 12),
  },
];

// ---- post-service: GET /post/{id}/comments, GET /post/{id}/likes --------------------
export const comments: Comment[] = [
  { id: "d1000000-0000-4000-8000-000000000001", post_id: raw[0].id, user_id: users[1].id, content: "Unreal light 😍", created_at: ago(15) },
  { id: "d1000000-0000-4000-8000-000000000002", post_id: raw[0].id, user_id: users[2].id, content: "Adding this to my bucket list.", created_at: ago(11) },
  { id: "d1000000-0000-4000-8000-000000000003", post_id: raw[0].id, user_id: users[3].id, content: "The third shot!", created_at: ago(6) },
  { id: "d1000000-0000-4000-8000-000000000004", post_id: raw[1].id, user_id: users[0].id, content: "Which roast?", created_at: ago(80) },
  { id: "d1000000-0000-4000-8000-000000000005", post_id: raw[2].id, user_id: users[1].id, content: "100%. Boring scales.", created_at: ago(60 * 4) },
  { id: "d1000000-0000-4000-8000-000000000006", post_id: raw[4].id, user_id: users[0].id, content: "Love the palette.", created_at: ago(60 * 48) },
];

export const likes: Like[] = [
  ...[1, 2, 3, 4].map((u, i) => ({ id: `e1000000-0000-4000-8000-00000000010${i}`, post_id: raw[0].id, user_id: users[u].id, created_at: ago(14) })),
  ...[0, 2].map((u, i) => ({ id: `e1000000-0000-4000-8000-00000000020${i}`, post_id: raw[1].id, user_id: users[u].id, created_at: ago(70) })),
  { id: "e1000000-0000-4000-8000-000000000300", post_id: raw[2].id, user_id: users[1].id, created_at: ago(60 * 4) },
  { id: "e1000000-0000-4000-8000-000000000400", post_id: raw[3].id, user_id: users[0].id, created_at: ago(60 * 20) },
  ...[0, 1, 3].map((u, i) => ({ id: `e1000000-0000-4000-8000-00000000050${i}`, post_id: raw[4].id, user_id: users[u].id, created_at: ago(60 * 48) })),
];

export const posts: Post[] = raw.map((p) => ({
  ...p,
  like_count: likes.filter((l) => l.post_id === p.id).length,
  comment_count: comments.filter((c) => c.post_id === p.id).length,
}));

// ---- user-service: GET /followers/{id}, GET /following/{id} ------------------------
// user_id is the person being followed, follower_id is the follower.
export const follows: Follow[] = [
  ...[0, 2, 3, 4].map((u, i) => ({ id: `f1000000-0000-4000-8000-00000000010${i}`, user_id: users[1].id, follower_id: users[u].id, created_at: ago(60 * 24 * 20) })),
  ...[0, 3].map((u, i) => ({ id: `f1000000-0000-4000-8000-00000000020${i}`, user_id: users[u].id, follower_id: users[1].id, created_at: ago(60 * 24 * 15) })),
];
