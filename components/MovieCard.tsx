import type { Movie } from "@/hooks/imdb";
import MediaCard from "./MediaCard";

export default function MovieCard({
  movie,
  priority,
}: {
  movie: Movie;
  priority?: boolean;
}) {
  return (
    <MediaCard
      type="movie"
      href={`/movie/${movie.id}`}
      title={movie.title}
      posterPath={movie.poster_path}
      date={movie.release_date}
      rating={movie.vote_average}
      overview={movie.overview}
      priority={priority}
    />
  );
}
