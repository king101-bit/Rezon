import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import TrendingMovies from "@/components/TrendingMovies";
import MovieSearch from "@/components/MovieSearch";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <Navigation user={user} />
      <main className="container mx-auto p-4">
        <TrendingMovies />
      </main>
    </>
  );
}
