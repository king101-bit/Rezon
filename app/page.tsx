import Hero from "@/components/hero";
import FreeSection from "@/components/FreeSection";
import FeaturedMovies from "@/components/FeaturedMovies";
import CategoriesSection from "@/components/CategoriesSection";

export default async function Home() {
  return (
    <>
      <Hero />
      <FreeSection />
      <FeaturedMovies />
      <CategoriesSection />
    </>
  );
}
