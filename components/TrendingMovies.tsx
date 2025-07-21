"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Clapperboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path?: string;
  overview?: string;
}

export default function TrendingMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("https://api.themoviedb.org/3/discover/movie", {
        headers: {
          accept: "application/json",
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWQxZTI2OTc1ZDEyMmY3ZmEwMmEwMzEzZWQ3NGZlNCIsIm5iZiI6MTYwNjE1NzE2MS4wNzQsInN1YiI6IjVmYmMwMzY5Zjk0NzViMDAzZWMxZTVlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5TaytiPlagc2BjQVz9idWAE-FWoWtXBSpopnoFCI2H8'
        },
        params: {
          include_adult: false,
          include_video: false,
          language: "en-US",
          page: 1,
          sort_by: "popularity.desc",
        },
      });

      setMovies(res.data.results);
      console.log("Fetched movies:", res.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <section className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Clapperboard className="w-6 h-6 text-primary" />
        Trending Movies
      </h2>

      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="border rounded-lg p-4 shadow-sm">
              {movie.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="rounded"
                />
              )}
              <Link href={`/movie/${movie.id}`} key={movie.id}>
               <h3 className="mt-2 text-xl font-semibold">{movie.title}</h3>
              </Link>
              <p className="text-gray-900 line-clamp-2">{movie.overview}</p>
              <p className="text-sm text-muted-foreground">{movie.release_date}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
