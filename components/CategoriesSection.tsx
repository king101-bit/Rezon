import Image from "next/image";
import Link from "next/link";

const CategoriesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Documentary"].map(
            (category) => (
              <Link href="#" key={category} className="group">
                <div className="relative rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-200">
                    <Image
                      src={`/placeholder.svg?height=200&width=300`}
                      width={300}
                      height={200}
                      alt={category}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors flex items-center justify-center">
                      <h3 className="text-white font-medium text-lg">
                        {category}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
export default CategoriesSection;
