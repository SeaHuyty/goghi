// user-service (password is never returned)
export type User = {
  id: string;
  name: string;
  bio: string | null;
  email: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

// post-service
export type PostImage = {
  id: string;
  post_id: string;
  url: string;
  created_at: string;
};

export type Post = {
  id: string;
  caption: string;
  user_id: string;
  images: PostImage[];
  like_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export type Like = {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
};

// user-service
export type Follow = {
  id: string;
  user_id: string; // the user being followed
  follower_id: string;
  created_at: string;
};

// ---- Frontend view models ---------------------------------------------------------

export type Author = Pick<User, "id" | "name" | "image_url">;

/** A post joined with its author (post-service only returns user_id). */
export type FeedPost = Post & {
  author: Author;
  liked_by_me: boolean;
};

export type Profile = {
  user: User;
  posts: Post[];
  follower_count: number;
  following_count: number;
};
