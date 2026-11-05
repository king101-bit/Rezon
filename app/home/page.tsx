import SearchForm from "@/components/SearchForm";
import TrendingMovies from "@/components/TrendingMovies";
import TrendingShows from "@/components/TrendingShows";

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-10 bg-white text-black">
      <div className="text-center">
        <SearchForm />
      </div>
      <TrendingMovies />
      <TrendingShows />
    </main>
  );
}
