import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getShow, IMG } from "@/hooks/imdb";
import ShowHeader from "@/components/tv/ShowHeader";
import SeasonTabs from "@/components/tv/SeasonTabs";
import EpisodeList, { EpisodeListSkeleton } from "@/components/tv/EpisodeList";
import { pickTrailer } from "@/components/TrailerEmbed";
import CastRow from "@/components/CastRow";
import TVCard from "@/components/TVCard";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ season?: string }>;
};

async function loadShow(id: string) {
  try {
    return await getShow(id);
  } catch {
    return null; // bad id or TMDB 404 -> clean 404 page
  }
}

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { id } = await params;
  const show = await loadShow(id);
  if (!show) return { title: "Show not found" };

  const year = show.first_air_date?.slice(0, 4);
  return {
    title: `${show.name}${year ? ` (${year})` : ""}`,
    description: show.overview || "TV show details, episodes, and trailers.",
    openGraph: {
      title: show.name,
      description: show.overview,
      images: show.backdrop_path
        ? [`${IMG}/w780${show.backdrop_path}`]
        : undefined,
    },
  };
}

export default async function TVPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { season } = await searchParams;

  const show = await loadShow(id);
  if (!show) notFound();

  const seasons = show.seasons.filter((s) => s.season_number > 0); // hide "Specials"
  const seasonNumber = Number(season ?? seasons[0]?.season_number);
  if (
    seasons.length > 0 &&
    !seasons.some((s) => s.season_number === seasonNumber)
  ) {
    notFound();
  }

  const trailer = pickTrailer(show.videos.results);
  const recs = show.recommendations.results.slice(0, 5);

  return (
    <div>
      <ShowHeader show={show} trailer={trailer} />

      <div className="container mx-auto px-4 pb-16">
        {seasons.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-bold">Episodes</h2>
            <SeasonTabs seasons={seasons} active={seasonNumber} />
            <Suspense key={seasonNumber} fallback={<EpisodeListSkeleton />}>
              <EpisodeList showId={id} seasonNumber={seasonNumber} />
            </Suspense>
          </section>
        )}

        <CastRow cast={show.credits.cast} />

        {recs.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-bold">You might also like</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
              {recs.map((s) => (
                <TVCard key={s.id} show={s} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
