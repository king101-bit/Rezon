import Image from "next/image";
import { Calendar, Clock, Star, Tv } from "lucide-react";
import Bone from "@/components/Bone";
import { getSeason, IMG } from "@/hooks/imdb";

const formatDate = (d: string | null) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "TBA";

export default async function EpisodeList({
  showId,
  seasonNumber,
}: {
  showId: string;
  seasonNumber: number;
}) {
  const { episodes } = await getSeason(showId, seasonNumber);

  if (episodes.length === 0) {
    return (
      <p className="mt-6 text-muted-foreground">No episodes listed yet.</p>
    );
  }

  return (
    <ul className="mt-6 grid gap-4">
      {episodes.map((e) => (
        <li
          key={e.id}
          className="flex flex-col sm:flex-row gap-4 rounded-xl border p-3 transition-colors hover:bg-muted/50"
        >
          {e.still_path ? (
            <Image
              src={`${IMG}/w300${e.still_path}`}
              alt={e.name}
              width={300}
              height={169}
              className="rounded-lg shrink-0 w-full sm:w-56 h-auto self-start"
            />
          ) : (
            <div className="w-full sm:w-56 aspect-video rounded-lg bg-muted shrink-0 flex items-center justify-center">
              <Tv className="w-6 h-6 text-muted-foreground" />
            </div>
          )}

          <div className="min-w-0">
            <h3 className="font-semibold">
              <span className="text-muted-foreground mr-2">
                {e.episode_number}.
              </span>
              {e.name}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(e.air_date)}
              </span>
              {e.runtime ? (
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {e.runtime} min
                </span>
              ) : null}
              {e.vote_average > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  {e.vote_average.toFixed(1)}
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
              {e.overview || "No description available yet."}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function EpisodeListSkeleton() {
  return (
    <div className="mt-6 grid gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row gap-4 rounded-xl border p-3"
        >
          <Bone className="aspect-video w-full sm:w-56 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Bone className="h-5 w-1/2" />
            <Bone className="h-3 w-1/3" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
