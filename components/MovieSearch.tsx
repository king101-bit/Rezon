"use client";

import { useState, useEffect } from "react";
import type { IMDBSearchMovie } from "@/app/types/imdb";

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<IMDBSearchMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/imdb?q=${encodeURIComponent(searchQuery)}`);

      if (!res.ok) {
        throw new Error(
          res.status === 429
            ? "Too many requests. Please try again later."
            : `Failed to fetch: ${res.status}`,
        );
      }

      const data = await res.json();
      setMovies(data.d || data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) fetchMovies(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchMovies(query)}
          placeholder="Search movies..."
          className="px-4 py-2 border rounded flex-1"
          aria-label="Movie search input"
        />
        <button
          onClick={() => fetchMovies(query)}
          disabled={loading || !query.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          aria-label="Search movies"
        >
          {loading ? (
            <span className="inline-flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching...
            </span>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {movies.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : query && !loading ? (
        <p className="text-gray-500">No results found for "{query}"</p>
      ) : null}
    </div>
  );
}

// Separate card component for better readability
function MovieCard({ movie }: { movie: IMDBSearchMovie }) {
  return (
    <li className="border p-4 rounded-lg hover:shadow-md transition-shadow">
      {movie.i?.imageUrl && (
        <img
          src={movie.i.imageUrl}
          alt={movie.l}
          width={movie.i.width || 150}
          height={movie.i.height || 225}
          className="mb-2 rounded object-cover w-full h-56"
          loading="lazy"
        />
      )}
      <h3 className="font-bold truncate" title={movie.l}>
        {movie.l}
      </h3>
      <div className="text-sm text-gray-600">
        {movie.y && <span>{movie.y}</span>}
        {movie.s && movie.y && <span> • </span>}
        {movie.s && <span>{movie.s.split(",")[0]}</span>}
      </div>
    </li>
  );
}
