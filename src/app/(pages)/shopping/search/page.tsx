import SearchResults from "~/app/_components/SearchResults";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
} 