"use client";
import Navbar from "@/components/Navbar";
import AnimatedFavorite from "@/components/AnimatedFavourite";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <Navbar />
      <div className="py-20 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
              From Classics to New Releases: Find Your <AnimatedFavorite />{" "}
              movies
            </h1>
            <p className="text-xl mb-8 text-gray-400">
              Ready to discover your next binge-worthy show or movie? Look no
              further than our online streaming store, where you'll find a wide
              selection of classic titles and new releases, all available at
              your fingertips.
            </p>
            <Link href="/home">
                        <button
              className="px-8 py-3 text-lg rounded-md text-white hover:bg-teal-700 transition-colors"
              style={{ backgroundColor: "#2C8C99", borderColor: "#2C8C99" }}
            >
              Get Started
            </button>
            </Link>
          </div>

          <div className="lg:w-1/2 relative h-[600px]">
            <div
              className="absolute rounded-full"
              style={{
                backgroundColor: "#2C8C99",
                right: "-10%",
                top: "0%",
                width: "110%",
                height: "110%",
                zIndex: 0,
              }}
            />

            <div className="relative h-full mb-4">
              {/* Movie Poster 1 */}
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https://m.media-amazon.com/images/M/MV5BZDI4ZWYwMGUtZGE1Yi00OTc5LWI3NDctMGY4ZWE4NzI4NWUwXkEyXkFqcGc@._V1_.jpg&f=1&h=500"
                alt="Movie Poster 1"
                className="absolute shadow-xl"
                style={{
                  top: "5%",
                  right: "15%",
                  zIndex: 3,
                  width: "300px",
                  height: "350px",
                  objectFit: "fill",
                  borderRadius: "20px",
                  transform: "rotate(5deg)",
                }}
              />

              {/* Movie Poster 2 */}
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https://m.media-amazon.com/images/M/MV5BNTZlMGQ1YjEtMzVlNC00ZmMxLTk0MzgtZjdkYTU1NmUxNTQ0XkEyXkFqcGc@._V1_.jpg&f=1&h=500"
                alt="Movie Poster 2"
                className="absolute shadow-xl"
                style={{
                  top: "15%",
                  right: "40%",
                  zIndex: 2,
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "20px",
                  transform: "rotate(-5deg)",
                }}
              />

              {/* Movie Poster 3 */}
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Official_cover_art_for_A_Tribe_Called_Judah_movie_2023.jpg/220px-Official_cover_art_for_A_Tribe_Called_Judah_movie_2023.jpg"
                alt="Movie Poster 3"
                className="absolute shadow-xl"
                style={{
                  top: "25%",
                  right: "25%",
                  zIndex: 1,
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "20px",
                  transform: "rotate(2deg)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
