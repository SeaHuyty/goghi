import { Suspense } from "react";
import { connection } from "next/server";
import { Composer } from "@/components/feed/Composer";
import { Feed } from "@/components/feed/Feed";
import { FeedSkeleton } from "@/components/feed/FeedSkeleton";
import { Header } from "@/components/layout/Header";
import { Suggestions } from "@/components/layout/Suggestions";
import { getCurrentUser, getFeed } from "@/lib/api/feed";

async function FeedLoader() {
  // The feed is user-specific and time-relative, so render per request, not at build time.
  await connection();
  const [me, posts] = await Promise.all([getCurrentUser(), getFeed()]);
  return (
    <div className="flex flex-col gap-5">
      <Composer user={me} />
      <Feed posts={posts} />
    </div>
  );
}

async function SuggestionsLoader() {
  await connection();
  return <Suggestions />;
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-5xl justify-center gap-8 px-4 pb-16 pt-2">
        <div className="w-full max-w-xl">
          <h1 className="sr-only">Feed</h1>
          <Suspense fallback={<FeedSkeleton />}>
            <FeedLoader />
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <SuggestionsLoader />
        </Suspense>
      </main>
    </>
  );
}
