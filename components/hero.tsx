import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getTrending, Movie } from "@/hooks/imdb";

const POSITIONS = [
  "top-[5%] right-[8%] z-30 rotate-[5deg]",
  "top-[15%] right-[38%] z-20 -rotate-[5deg]",
  "top-[28%] right-[22%] z-10 rotate-[2deg]",
];

async function getPosters(): Promise<Movie[]> {
  try {
    const { results } = await getTrending();
    return results.filter((m) => m.poster_path).slice(0, 3);
  } catch {
    return [];
  }
}

const COLUMN_OFFSETS = ["mt-0", "mt-10", "mt-5"];

export default async function Hero() {
  const posters = (await getPosters()) ?? [];

  const columns = [0, 1, 2].map((col) =>
    posters.filter((_, i) => i % 3 === col),
  );

  return (
    <>
      <Navbar />
      <section className="overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row">
          <div className="lg:w-1/2">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Find what to watch. Request it in one click.
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Rezon is a media discovery and request app. Browse what’s
              trending, search any movie or show, and follow each request from
              pending to available.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/home"
                className="rounded-md bg-[#2C8C99] px-8 py-3 text-lg text-white transition-colors hover:bg-[#237681]"
              >
                Browse trending
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-md border px-8 py-3 text-lg transition-colors hover:bg-muted"
              >
                <Search className="h-5 w-5" />
                Search titles
              </Link>
            </div>
          </div>

          {posters.length > 0 && (
            <div className="w-full max-w-md lg:w-1/2 lg:max-w-lg">
              <div className="grid grid-cols-3 gap-3 [mask-image:linear-gradient(to_bottom,black_65%,transparent)] md:gap-4">
                {columns.map((col, c) => (
                  <div
                    key={c}
                    className={`flex flex-col gap-3 md:gap-4 ${COLUMN_OFFSETS[c]}`}
                  >
                    {col.map((m, r) => (
                      <Link
                        key={m.id}
                        href={`/movie/${m.id}`}
                        className="group block overflow-hidden rounded-xl shadow-lg ring-1 ring-border"
                      >
                        <Image
                          src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                          alt={m.title}
                          width={342}
                          height={513}
                          priority={r === 0}
                          sizes="(min-width: 1024px) 180px, 30vw"
                          className="aspect-[2/3] h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
