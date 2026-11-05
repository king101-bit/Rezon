import BackButton from "@/components/ui/BackButton";
import MovieCard from "@/components/MovieCard";
import CastRow from "@/components/CastRow";
import TrailerEmbed, { pickTrailer } from "@/components/TrailerEmbed";
import { getMovie } from "@/hooks/imdb";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, Film, Star } from "lucide-react";

const IMG = "https://image.tmdb.org/t/p";

type Props = { params: Promise<{ id: string }> };

const formatDate = (d?: string) =>
  d
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(d))
    : "Release date TBA";

const formatRuntime = (m: number | null) =>
  m ? `${Math.floor(m / 60)}h ${m % 60}m` : null;

async function loadMovie(id: string) {
  try {
    return await getMovie(id);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const movie = await loadMovie(id);
  if (!movie) return { title: "Movie not found | Rezon" };

  const year = movie.release_date?.slice(0, 4);
  return {
    title: `${movie.title}${year ? ` (${year})` : ""}`,
    description: movie.overview || "Detailed movie information and trailers.",
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: movie.backdrop_path
        ? [`${IMG}/w780${movie.backdrop_path}`]
        : undefined,
    },
  };
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  const movie = await loadMovie(id);
  if (!movie) notFound();

  const year = movie.release_date?.slice(0, 4);
  const runtime = formatRuntime(movie.runtime);
  const trailer = pickTrailer(movie.videos.results);
  const recs = movie.recommendations.results.slice(0, 5);

  return (
    <div>
      {/* Hero backdrop */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        {movie.backdrop_path && (
          <Image
            src={`${IMG}/w1280${movie.backdrop_path}`}
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

      <div className="container mx-auto px-4 pb-16">
        {/* Poster + info */}
        <div className="relative -mt-32 md:-mt-48 flex flex-col md:flex-row gap-8">
          {movie.poster_path ? (
            <Image
              src={`${IMG}/w500${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-xl shadow-2xl ring-1 ring-border shrink-0 w-40 md:w-64 h-auto self-start"
            />
          ) : (
            <div className="w-40 md:w-64 aspect-[2/3] rounded-xl bg-muted shrink-0 flex items-center justify-center">
              <Film className="w-10 h-10 text-muted-foreground" />
            </div>
          )}

          <div className="md:pt-20">
            <h1 className="text-3xl md:text-5xl font-bold">
              {movie.title}
              {year && (
                <span className="ml-3 text-2xl font-normal text-muted-foreground">
                  ({year})
                </span>
              )}
            </h1>

            {movie.tagline && (
              <p className="mt-2 italic text-muted-foreground">
                {movie.tagline}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              {movie.vote_average > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/15 px-3 py-1 font-semibold text-yellow-600">
                  <Star className="w-4 h-4 fill-current" />
                  {movie.vote_average.toFixed(1)}
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1">
                <Calendar className="w-4 h-4" />
                {formatDate(movie.release_date)}
              </span>
              {runtime && (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1">
                  <Clock className="w-4 h-4" />
                  {runtime}
                </span>
              )}
              <span className="rounded-full bg-muted px-3 py-1">
                {movie.status}
              </span>
              <span className="rounded-full bg-muted px-3 py-1 uppercase">
                {movie.original_language}
              </span>
            </div>

            {movie.genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <h2 className="mt-6 text-lg font-semibold">Overview</h2>
            <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
              {movie.overview || "No overview available."}
            </p>
          </div>
        </div>

        {/* Trailer + cast */}
        {trailer && <TrailerEmbed video={trailer} title={movie.title} />}
        <CastRow cast={movie.credits.cast} />

        {/* Recommendations */}
        {recs.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-bold">You might also like</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
              {recs.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
