import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieDatabaseResponse {
    results: Movie[];
}

const movieDatabaseToken = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies (query:string): Promise<Movie[]> {
    const response = await axios.get<MovieDatabaseResponse>('https://api.themoviedb.org/3/search/movie', {
        params: {
            query,
            page: 1,
        },
        headers: {
            Authorization: `Bearer ${movieDatabaseToken}`,
        },
    });
    
    return response.data.results;
}