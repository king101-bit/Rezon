import Link from "next/link";
import type { SeasonSummary } from "@/hooks/imdb";

export default function SeasonTabs({
  seasons,
  active,
}: {
  seasons: SeasonSummary[];
  active: number;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {seasons.map((s) => (
        <Link
          key={s.id}
          href={`?season=${s.season_number}`}
          scroll={false}
          replace
          className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            s.season_number === active
              ? "bg-primary text-primary-foreground border-primary"
              : "hover:bg-muted"
          }`}
        >
          {s.name}
        </Link>
      ))}
    </div>
  );
}
