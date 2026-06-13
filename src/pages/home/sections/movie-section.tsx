import { Skeleton } from "@/components/ui/skeleton";
import { MovieCard } from "@/components/movie/MovieCard";

interface MovieSectionProps {
    title: string;
    movies?: any[];
    isLoading: boolean;
}

export function MovieSection({ title, movies, isLoading }: MovieSectionProps) {
    return (
        <section className="space-y-4 mb-10">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-3">
                            <Skeleton className="aspect-[2/3] rounded-xl" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/4" />
                        </div>
                    ))
                ) : (
                    movies?.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                )}
            </div>
        </section>
    );
}
