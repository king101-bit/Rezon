import { ChartNoAxesCombined, Tv } from "lucide-react";
import TVCard from "./TVCard";
import { getPopularTV, getTopRatedTV } from "@/hooks/imdb";
const GRID =
  "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";

export default async function TrendingShows() {
  const [popular, topRated] = await Promise.all([
    getPopularTV(),
    getTopRatedTV(),
  ]);

  return (
    <>
      <section className="px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Tv className="w-6 h-6 text-primary" />
          Popular Shows
        </h2>
        <div className={GRID}>
          {popular.results.slice(0, 13).map((s) => (
            <TVCard key={s.id} show={s} />
          ))}
        </div>
      </section>

      <section className="px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ChartNoAxesCombined className="w-6 h-6 text-primary" />
          Top Rated Shows
        </h2>
        <div className={GRID}>
          {topRated.results.slice(0, 10).map((s) => (
            <TVCard key={s.id} show={s} />
          ))}
        </div>
      </section>
    </>
  );
}
