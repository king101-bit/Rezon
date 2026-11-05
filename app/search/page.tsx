import MovieCard from "@/components/MovieCard";
import TVCard from "@/components/TVCard";
import SearchForm from "@/components/SearchForm";
import { searchMulti } from "@/hooks/imdb";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q?.trim() ? `Search: ${q.trim()}` : "Search" };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const data = query ? await searchMulti(query) : null;
  const results = data?.results.filter((r) => r.media_type !== "person") ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchForm defaultValue={query} />

      {query && (
        <h1 className="mt-8 mb-6 text-2xl font-bold">Results for “{query}”</h1>
      )}

      {query && results.length === 0 && (
        <p className="text-muted-foreground">
          Nothing found. Try a different title.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {results.map((r) =>
          r.media_type === "movie" ? (
            <MovieCard key={`m-${r.id}`} movie={r} />
          ) : r.media_type === "tv" ? (
            <TVCard key={`t-${r.id}`} show={r} />
          ) : null,
        )}
      </div>
    </div>
  );
}
