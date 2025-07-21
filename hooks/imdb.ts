// lib/tmdb.ts
import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
  },
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, 
  },
});

export default tmdb;
  