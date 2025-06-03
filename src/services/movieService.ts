import axios from "axios";
import type { MovieDatabaseResponse } from "../types/movie";

const movieDatabaseToken = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies (query:string, page: number = 1): Promise<MovieDatabaseResponse> {
    const response = await axios.get<MovieDatabaseResponse>('https://api.themoviedb.org/3/search/movie', {
        params: {
            query,
            page,
        },
        headers: {
            Authorization: `Bearer ${movieDatabaseToken}`,
        },
    });
    
    return response.data;
}