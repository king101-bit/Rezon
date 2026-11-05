import { Activity, PlusCircle, Search, TrendingUp } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Discover",
    description:
      "Browse what’s popular and top rated across movies and TV, with trailers, cast, and recommendations on every page.",
  },
  {
    icon: Search,
    title: "Search anything",
    description:
      "Look up any title and get the details you need before you decide: ratings, seasons, episodes, and more.",
  },
  {
    icon: PlusCircle,
    title: "Request in one click",
    description:
      "Found something that isn’t available yet? Request a movie or a specific season and let it go from there.",
    soon: true,
  },
  {
    icon: Activity,
    title: "Track every request",
    description:
      "See each request move from pending to approved to available, all in one place.",
    soon: true,
  },
];

export default function FeaturesSection() {
  return (
    <section className="container mx-auto mb-16 px-4">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold">
          Everything you need to find and request media
        </h2>
        <p className="text-muted-foreground">
          One simple place to discover titles and keep tabs on what you’ve asked
          for.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, description, soon }) => (
          <div
            key={title}
            className="relative rounded-xl border bg-muted/40 p-6 text-center"
          >
            {soon && (
              <span className="absolute right-3 top-3 rounded-full bg-[#2C8C99]/10 px-2 py-0.5 text-xs font-medium text-[#2C8C99]">
                Soon
              </span>
            )}
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#2C8C99]/10">
              <Icon className="h-8 w-8 text-[#2C8C99]" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
