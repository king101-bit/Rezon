import type { Show } from "@/hooks/imdb";
import MediaCard from "./MediaCard";

export default function TVCard({
  show,
  priority,
}: {
  show: Show;
  priority?: boolean;
}) {
  return (
    <MediaCard
      type="tv"
      href={`/tv/${show.id}`}
      title={show.name}
      posterPath={show.poster_path}
      date={show.first_air_date}
      rating={show.vote_average}
      overview={show.overview}
      priority={priority}
    />
  );
}
