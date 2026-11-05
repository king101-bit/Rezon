import type { Movie } from "@/hooks/imdb";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <Link href={`/movie/${movie.id}`}>
        {movie.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded w-full h-auto"
          />
        )}
        <h3 className="mt-2 text-xl font-semibold">{movie.title}</h3>
      </Link>
      <p className="text-gray-900 line-clamp-2">{movie.overview}</p>
      <p className="text-sm text-muted-foreground">{movie.release_date}</p>
    </div>
  );
}
