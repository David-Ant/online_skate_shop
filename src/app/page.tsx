import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

import ImageCarousel from "./_components/ImageCarousel";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main>
        <h1 className="text-3xl font-bold mb-6">Placeholder</h1>
        <ImageCarousel />
      </main>
    </HydrateClient>
  );
}
