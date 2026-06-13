import { useQuery } from "@tanstack/react-query";
import { movieService } from "@/services/movie";

export const useGetMovies = (params: { page?: number; query?: string; category?: string; with_genres?: string }) => {
    return useQuery({
        queryKey: ["movies", params.category, params.query, params.page, params.with_genres],
        queryFn: () => movieService.getMovies(params),
    });
};

export const useGetGenres = () => {
    return useQuery({
        queryKey: ["genres"],
        queryFn: () => movieService.getGenres(),
    });
};

export const useGetMovieDetails = (movieId: string) => {
    return useQuery({
        queryKey: ["movieDetails", movieId],
        queryFn: () => movieService.getMovieDetails(movieId),
        enabled: !!movieId,
    });
};

export const useGetMovieCredits = (movieId: string) => {
    return useQuery({
        queryKey: ["movieCredits", movieId],
        queryFn: () => movieService.getMovieCredits(movieId),
        enabled: !!movieId,
    });
};

export const useGetSimilarMovies = (movieId: string) => {
    return useQuery({
        queryKey: ["similarMovies", movieId],
        queryFn: () => movieService.getSimilarMovies(movieId),
        enabled: !!movieId,
    });
};
