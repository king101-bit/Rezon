import Image from "next/image";
import { User } from "lucide-react";
import type { CastMember } from "@/hooks/imdb";

export default function CastRow({ cast }: { cast: CastMember[] }) {
  if (cast.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-bold">Cast</h2>
      <div className="flex gap-4 overflow-x-auto pb-3">
        {cast.slice(0, 12).map((c) => (
          <div key={c.id} className="w-28 shrink-0">
            {c.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
                alt={c.name}
                width={185}
                height={278}
                className="rounded-lg w-28 h-auto"
              />
            ) : (
              <div className="flex aspect-[2/3] w-28 items-center justify-center rounded-lg bg-muted">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <p className="mt-2 text-sm font-semibold leading-tight">{c.name}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{c.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
}