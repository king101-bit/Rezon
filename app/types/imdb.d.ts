export interface IMDBSearchMovie {
  id: string;
  primaryTitle: string;
  description: string;
  averageRating: string;
  primaryImage?: {
    url: string;
    width?: number;
    height?: number;
  };
  startYear?: number;
  genres?: string[];
  plot?: string;
}

// The API returns a direct array of movies
export type IMDBApiResponse = IMDBSearchMovie[];
