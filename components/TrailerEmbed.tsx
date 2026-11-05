import type { Video } from "@/hooks/imdb";

export function pickTrailer(videos: Video[]) {
  const yt = videos.filter((v) => v.site === "YouTube");
  return (
    yt.find((v) => v.type === "Trailer" && v.official) ??
    yt.find((v) => v.type === "Trailer") ??
    yt.find((v) => v.type === "Teaser")
  );
}

export default function TrailerEmbed({
  video,
  title,
  compact = false,
}: {
  video: Video;
  title: string;
  compact?: boolean;
}) {
  const label = video.type === "Teaser" ? "Teaser" : "Trailer";

  const player = (
    <div
      className={`aspect-video overflow-hidden rounded-xl shadow-lg ${
        compact ? "w-full" : "max-w-4xl"
      }`}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.key}`}
        title={`${title} ${video.type}`}
        allowFullScreen
        loading="lazy"
        className="h-full w-full"
      />
    </div>
  );

  if (compact) {
    return (
      <div className="w-full max-w-md xl:max-w-none">
        <h2 className="mb-2 text-lg font-semibold">{label}</h2>
        {player}
      </div>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-bold">{label}</h2>
      {player}
    </section>
  );
}