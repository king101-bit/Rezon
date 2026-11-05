import Image from "next/image";
import Link from "next/link";
import type { Show } from "@/hooks/imdb";

export default function TVCard({ show }: { show: Show }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <Link href={`/tv/${show.id}`}>
        {show.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
            alt={show.name}
            width={300}
            height={450}
            className="rounded w-full h-auto"
          />
        )}
        <h3 className="mt-2 text-xl font-semibold">{show.name}</h3>
      </Link>
      <p className="text-gray-900 line-clamp-2">{show.overview}</p>
      <p className="text-sm text-muted-foreground">{show.first_air_date}</p>
    </div>
  );
}
