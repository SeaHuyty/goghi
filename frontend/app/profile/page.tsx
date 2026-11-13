import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { PostGrid } from "@/components/profile/PostGrid";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { getCurrentUserId, getProfile } from "@/lib/api/feed";

async function ProfileLoader() {
  await connection();
  // TODO(you): use the signed-in user's id from your session.
  const profile = await getProfile(await getCurrentUserId());
  if (!profile) notFound();

  return (
    <div className="flex flex-col gap-6">
      <ProfileHeader profile={profile} />
      <section aria-label="Posts">
        <h2 className="mb-3 px-1 text-sm font-semibold text-muted">Posts</h2>
        <PostGrid posts={profile.posts} />
      </section>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="Loading profile">
      <div className="h-40 rounded-3xl bg-card ring-1 ring-border" />
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-square rounded-2xl bg-border" />
        ))}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-2">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileLoader />
        </Suspense>
      </main>
    </>
  );
}
