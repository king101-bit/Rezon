"use client";
import { useEffect, useState } from "react";
import type { IMDBSearchMovie } from "@/app/types/imdb";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Star, Calendar, Film, Clapperboard } from "lucide-react";
import Link from "next/link";

export default function TrendingMovies() {
  const [movies, setMovies] = useState<IMDBSearchMovie[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/trending");
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const movies = await res.json();
        setMovies(movies.slice(0, 10));
      } catch (error) {
        setError(error instanceof Error ? error.message : "Fetch failed");
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  if (loading)
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">🔥 Trending Movies</h2>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">🔥 Trending Movies</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  if (!movies || movies.length === 0) return <EmptyState />;

  return (
    <section className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Clapperboard className="w-6 h-6 text-primary" />
        Trending Movies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

function MovieCard({ movie }: { movie: IMDBSearchMovie }) {
  return (
    <Card className="h-full flex flex-col group hover:shadow-lg transition-shadow overflow-hidden">
      {/* Image Container with Fallback */}
      <div className="relative aspect-[2/3] bg-muted">
        {movie.primaryImage?.url ? (
          <Image
            src={movie.primaryImage.url}
            alt={`Poster for ${movie.primaryTitle}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={false}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/movie-placeholder.jpg";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <Film className="w-10 h-10 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Card Content */}
      <CardHeader className="flex-1 px-4 pt-4 pb-2">
        <CardTitle className="text-lg font-bold line-clamp-2 leading-tight">
          {movie.primaryTitle || "Untitled Movie"}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 py-2">
        {movie.startYear && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{movie.startYear}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-2">
        {movie.averageRating ? (
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-500" />
            <span className="font-medium">{movie.averageRating}/10</span>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            No rating available
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

function EmptyState() {
  return (
    <section className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">🔥 Trending Movies</h2>
      <div className="p-8 text-center border-2 border-dashed rounded-lg">
        <Film className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-500">
          No trending movies found
        </h3>
        <p className="text-gray-400 mt-2">Try refreshing or check back later</p>
      </div>
    </section>
  );
}
