import BackButton from "@/components/ui/BackButton";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

type Genre = {
  id: number;
  name: string;
};

type Props = {
  params: Promise<{ id: string }>; 
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; 
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,  {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    });
  const movie = await res.json();

  return {
    title: `${movie.title} (${movie.release_date?.slice(0, 4)}) | Rezon`,
    description: movie.overview || 'Detailed movie information and trailers.',
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`],
    },
  };
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) { 
  const { id } = await params; 
  console.log('Movie ID', id);
  console.log("TMDB_TOKEN:", process.env.TMDB_TOKEN);

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    }
  );

  const trailerRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    },
  });

  const { results: videos } = await trailerRes.json();
  const trailer = videos.find(
    (v: Video) => v.type === "Trailer" && v.site === "YouTube"
  );

  const movie = await res.json();

  return (
    <div className="min-h-screen px-4 py-10 md:px-8 lg:px-16 bg-white text-gray-900">
      <BackButton />
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Trailer Section */}
        <div className="flex items-center justify-center">
          {trailer ? (
            <div className="w-full max-w-xl">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Movie Trailer"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-400 italic text-center">No trailer available</p>
          )}
        </div>

        {/* Movie Details Section */}
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-4xl font-extrabold">{movie.title}</h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span>{movie.release_date}</span>
            <Badge>{movie.status}</Badge>
            <Badge variant="secondary">{movie.original_language.toUpperCase()}</Badge>
            <Badge variant="outline">{movie.runtime} mins</Badge>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Genres:</span>
            {movie.genres?.map((genre: Genre) => (
              <Badge key={genre.id} variant="secondary">
                {genre.name}
              </Badge>
            ))}
          </div>

          {/* Overview */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Overview</h2>
            <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}