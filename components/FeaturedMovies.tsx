import { ChevronRight, Play, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeaturedMovies = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
          <Link
            href="#"
            className="flex items-center text-teal-600 hover:text-teal-700 font-medium"
          >
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="group relative rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-[2/3] relative">
                <Image
                  src={`/placeholder.svg?height=450&width=300`}
                  fill
                  alt={`Trending movie ${item}`}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <button className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md transition-colors">
                      <Play className="h-4 w-4" /> Watch Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center mb-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-700 ml-1">4.8</span>
                </div>
                <h3 className="font-medium text-gray-900 line-clamp-1">
                  Movie Title {item}
                </h3>
                <p className="text-sm text-gray-500">2023 • Action</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovies;
