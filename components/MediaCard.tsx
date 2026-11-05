import Image from "next/image";
import Link from "next/link";
import { Film, Star, Tv } from "lucide-react";

interface MediaCardProps {
  type: "movie" | "tv";
  href: string;
  title: string;
  posterPath: string | null;
  date?: string;
  rating?: number;
  overview?: string;
  priority?: boolean;
}

export default function MediaCard({
  type,
  href,
  title,
  posterPath,
  date,
  rating,
  overview,
  priority = false,
}: MediaCardProps) {
  const year = date?.slice(0, 4);
  const Fallback = type === "tv" ? Tv : Film;

  return (
    <Link href={href} className="group block focus-visible:outline-none">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-muted ring-1 ring-border transition-shadow group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-primary">
        {posterPath ? (
          <Image
            src={`https://image.tmdb.org/t/p/w342${posterPath}`}
            alt={title}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Fallback className="h-10 w-10 text-muted-foreground" />
          </div>
        )}

        {rating !== undefined && rating > 0 && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {rating.toFixed(1)}
          </span>
        )}

        {overview && (
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <p className="line-clamp-5 text-xs text-white">{overview}</p>
          </div>
        )}
      </div>

      <h3 className="mt-2 line-clamp-1 text-sm font-medium">{title}</h3>
      {year && <p className="text-xs text-muted-foreground">{year}</p>}
    </Link>
  );
}