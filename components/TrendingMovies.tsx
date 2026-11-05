import { ChartNoAxesCombined, Clapperboard } from "lucide-react";
import MovieCard from "./MovieCard";
import { getPopular, getTopRated } from "@/hooks/imdb";

const GRID =
  "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";

export default async function TrendingMovies() {
  const [popular, topRated] = await Promise.all([getPopular(), getTopRated()]);

  return (
    <>
      <section className="px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Clapperboard className="w-6 h-6 text-primary" />
          Popular
        </h2>
        <div className={GRID}>
          {popular.results.slice(0, 12).map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>

      <section className="px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ChartNoAxesCombined className="w-6 h-6 text-primary" />
          Top Rated
        </h2>
        <div className={GRID}>
          {topRated.results.slice(0, 10).map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>
    </>
  );
}
