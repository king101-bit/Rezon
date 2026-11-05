import Image from "next/image";
import { Star, Tv } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import { IMG, Video, type TVShow } from "@/hooks/imdb";
import TrailerEmbed from "@/components/TrailerEmbed";

export default function ShowHeader({
  show,
  trailer,
}: {
  show: TVShow;
  trailer?: Video | null;
}) {
  const year = show.first_air_date?.slice(0, 4);

  return (
    <>
      {/* Hero backdrop */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        {show.backdrop_path && (
          <Image
            src={`${IMG}/w1280${show.backdrop_path}`}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute top-4 left-4 z-10 md:left-8">
          <BackButton />
        </div>
      </div>

      {/* Poster + info, overlapping the hero */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-32 md:-mt-48 flex flex-col md:flex-row gap-8">
          {show.poster_path ? (
            <Image
              src={`${IMG}/w500${show.poster_path}`}
              alt={show.name}
              width={300}
              height={450}
              className="rounded-xl shadow-2xl ring-1 ring-border shrink-0 w-40 md:w-64 h-auto self-start"
            />
          ) : (
            <div className="w-40 md:w-64 aspect-[2/3] rounded-xl bg-muted shrink-0 flex items-center justify-center">
              <Tv className="w-10 h-10 text-muted-foreground" />
            </div>
          )}

          <div className="md:pt-20 flex-1 min-w-0">
            <h1 className="text-3xl md:text-5xl font-bold">
              {show.name}
              {year && (
                <span className="ml-3 text-2xl font-normal text-muted-foreground">
                  ({year})
                </span>
              )}
            </h1>

            {show.tagline && (
              <p className="mt-2 italic text-muted-foreground">
                {show.tagline}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              {show.vote_average > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/15 px-3 py-1 font-semibold text-yellow-600">
                  <Star className="w-4 h-4 fill-current" />
                  {show.vote_average.toFixed(1)}
                </span>
              )}
              <span className="rounded-full bg-muted px-3 py-1">
                {show.status}
              </span>
              <span className="rounded-full bg-muted px-3 py-1">
                {show.number_of_seasons} season
                {show.number_of_seasons !== 1 && "s"} ·{" "}
                {show.number_of_episodes} episodes
              </span>
            </div>

            {show.genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {show.genres.map((g) => (
                  <span
                    key={g.id}
                    className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
              <div>
                <h2 className="text-lg font-semibold">Overview</h2>
                <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
                  {show.overview || "No overview available."}
                </p>
              </div>

              {trailer && (
                <TrailerEmbed compact video={trailer} title={show.name} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
