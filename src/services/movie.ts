import { api } from "./api";

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path?: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    overview: string;
    genres: { id: number; name: string }[];
    runtime: number;
    revenue: number;
    budget: number;
    original_language: string;
}

export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}

export interface Crew {
    id: number;
    name: string;
    job: string;
}

export interface CreditsResponse {
    cast: Cast[];
    crew: Crew[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface GenreResponse {
    genres: Genre[];
}

export interface MovieResponse {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
}

export const movieService = {
    getMovies: async (params: { page?: number; query?: string; category?: string; with_genres?: string }): Promise<MovieResponse> => {
        let endpoint = `/movie/${params.category || "popular"}`;

        if (params.query) {
            endpoint = "/search/movie";
        } else if (params.with_genres) {
            endpoint = "/discover/movie";
        }

        const response = await api.get(endpoint, {
            params: {
                page: params.page,
                query: params.query,
                with_genres: params.with_genres,
                sort_by: "popularity.desc",
            },
        });
        return response.data;
    },

    getGenres: async (): Promise<GenreResponse> => {
        const response = await api.get("/genre/movie/list");
        return response.data;
    },

    getMovieDetails: async (movieId: string): Promise<Movie> => {
        const response = await api.get(`/movie/${movieId}`);
        return response.data;
    },

    getMovieCredits: async (movieId: string): Promise<CreditsResponse> => {
        const response = await api.get(`/movie/${movieId}/credits`);
        return response.data;
    },

    getSimilarMovies: async (movieId: string): Promise<MovieResponse> => {
        const response = await api.get(`/movie/${movieId}/similar`);
        return response.data;
    },
};
