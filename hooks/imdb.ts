const BASE_URL = "https://api.themoviedb.org/3";
export const IMG = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
}

interface TMDBList<T> {
  results: T[];
  page: number;
  total_pages: number;
}

export interface SeasonSummary {
  id: number;
  season_number: number;
  name: string;
  overview: string;
  air_date: string | null;
  episode_count: number;
  poster_path: string | null;
}
export interface Episode {
  id: number;
  episode_number: number;
  season_number: number;
  name: string;
  overview: string;
  air_date: string | null;
  runtime: number | null;
  still_path: string | null;
  vote_average: number;
}

export interface TVShow {
  id: number;
  name: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  status: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: SeasonSummary[];
  videos: { results: Video[] };
  credits: { cast: CastMember[] };
  recommendations: TMDBList<Show>;
}

export interface Show {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  overview: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieDetails {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number | null;
  status: string;
  vote_average: number;
  original_language: string;
  genres: { id: number; name: string }[];
  videos: { results: Video[] };
  credits: { cast: CastMember[] };
  recommendations: TMDBList<Movie>;
}

export type SearchResult =
  | ({ media_type: "movie" } & Movie)
  | ({ media_type: "tv" } & Show)
  | { media_type: "person"; id: number };

export const searchMulti = (query: string, page = 1) =>
  tmdb<TMDBList<SearchResult>>(
    "/search/multi",
    { query, include_adult: false, language: "en-US", page },
    0, // don't cache searches
  );

export const getMovie = (id: string) =>
  tmdb<MovieDetails>(`/movie/${id}`, {
    language: "en-US",
    append_to_response: "videos,credits,recommendations",
  });

export const getShow = (id: string) =>
  tmdb<TVShow>(`/tv/${id}`, {
    language: "en-US",
    append_to_response: "videos,credits,recommendations",
  });

export const getPopularTV = () =>
  tmdb<TMDBList<Show>>("/discover/tv", {
    include_adult: false,
    language: "en-US",
    sort_by: "popularity.desc",
  });

export const getTopRatedTV = () =>
  tmdb<TMDBList<Show>>("/tv/top_rated", { language: "en-US", page: 1 });

export async function tmdb<T>(
  path: string,
  params: Record<string, string | number | boolean> = {},
  revalidate = 3600,
): Promise<T> {
  const url = new URL(BASE_URL + path);
  Object.entries(params).forEach(([k, v]) =>
    url.searchParams.set(k, String(v)),
  );

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
    next: { revalidate },
  });

  if (res.status === 429)
    throw new Error("TMDB rate limit hit, try again shortly");
  const body = await res.text();
  if (!res.ok) {
    throw new Error(`TMDB ${res.status} on ${path}: ${body.slice(0, 200)}`);
  }
  if (!body) {
    throw new Error(
      `TMDB returned an empty body on ${path} (status ${res.status})`,
    );
  }
  return JSON.parse(body) as T;
}

export const getPopular = () =>
  tmdb<TMDBList<Movie>>("/discover/movie", {
    include_adult: false,
    language: "en-US",
    sort_by: "popularity.desc",
  });

export const getTopRated = () =>
  tmdb<TMDBList<Movie>>("/movie/top_rated", { language: "en-US", page: 1 });

export const getSeason = (id: string, season: number) =>
  tmdb<{ episodes: Episode[] }>(`/tv/${id}/season/${season}`);
