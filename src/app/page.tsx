import { auth } from "~/server/auth";

import ImageCarousel from "./_components/ImageCarousel";

export default async function Home() {
  const session = await auth();

  return (
      <main>
        <h1 className="text-3xl font-bold mb-6">Placeholder</h1>
        <ImageCarousel />
      </main>
  );
}
