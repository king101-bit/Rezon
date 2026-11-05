import { Search } from "lucide-react";

export default function SearchForm({
  defaultValue = "",
}: {
  defaultValue?: string;
}) {
  return (
    <form action="/search" className="relative mx-auto max-w-xl">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <input
        name="q"
        defaultValue={defaultValue}
        placeholder="Search movies and TV shows..."
        className="w-full rounded-full border bg-background py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary"
      />
    </form>
  );
}
