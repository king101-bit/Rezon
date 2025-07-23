"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ChartNoAxesCombined, Clapperboard } from "lucide-react";
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
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`},
          params: {
            include_adult: false,
            include_video: false,
            language: "en-US",
            sort_by: "popularity.desc",
          },
        },
      );
      setMovies(res.data.results);
      console.log("Trending Movies:", res.data.results);
    } catch (error) {
      alert(`Error fetching movies: ${error}`);
    } finally {
      setLoading(false);
    }
  };

const fetchTopRated = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
        },
        params: {
          language: "en-US",
          page: 1,
        },
      }
    );
    setTopRated(res.data.results);
    console.log("Top Rated Movies:", res.data.results);
  } catch (error) {
    alert(`Error fetching top rated movies: ${error}`);
  }
};


  useEffect(() => {
    fetchMovies();
    fetchTopRated();
  }, []);

  return (
    <>
      <section className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Clapperboard className="w-6 h-6 text-primary" />
        Popular
      </h2>

      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.slice(0,10).map((movie) => (
            <div key={movie.id} className="border rounded-lg p-4 shadow-sm">
              {movie.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  width={350}
                  height={200}
                  className="rounded"
                />
              )}
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <h3 className="mt-2 text-xl font-semibold">{movie.title}</h3>
              </Link>
              <p className="text-gray-900 line-clamp-2">{movie.overview}</p>
              <p className="text-sm text-muted-foreground">
                {movie.release_date}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
    <section>
   <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ChartNoAxesCombined className="w-6 h-6 text-primary" />
        Top Rated 
      </h2> {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {topRated.slice(0,10).map((top_rated) => (
            <div key={top_rated.id} className="border rounded-lg p-4 shadow-sm">
              {top_rated.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w300${top_rated.poster_path}`}
                  alt={top_rated.title}
                  width={350}
                  height={200}
                  className="rounded"
                />
              )}
              <Link href={`/movie/${top_rated.id}`} key={top_rated.id}>
                <h3 className="mt-2 text-xl font-semibold">{top_rated.title}</h3>
              </Link>
              <p className="text-gray-900 line-clamp-2">{top_rated.overview}</p>
              <p className="text-sm text-muted-foreground">
                {top_rated.release_date}
              </p>
            </div>
          ))}
        </div>
      )}
      </section>
    </>
  );
}
