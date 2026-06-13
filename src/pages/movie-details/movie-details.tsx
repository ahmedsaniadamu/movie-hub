import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Star, Clock, Calendar, Heart, Languages, DollarSign, Wallet } from "lucide-react";
import { useGetMovieDetails, useGetMovieCredits, useGetSimilarMovies } from "@/hooks/useMovies";
import { Badge } from "@/components/ui/badge";
import { MovieSection } from "../home/sections/movie-section";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

function MovieDetailsSkeleton() {
    return (
        <div className="p-4 sm:p-8 max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-500">
            <Skeleton className="h-10 w-24 rounded-lg" />

            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 items-start">
                {/* Poster Skeleton */}
                <Skeleton className="aspect-[2/3] w-full rounded-3xl" />

                {/* Info Skeleton */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Skeleton className="h-16 w-3/4 sm:h-20" />
                        <div className="flex gap-6">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-16" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Skeleton className="h-20 w-48 rounded-2xl" />
                        <Skeleton className="h-14 w-44 rounded-2xl" />
                    </div>

                    <div className="space-y-4">
                        <Skeleton className="h-8 w-32" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-2/3" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Skeleton className="h-8 w-24" />
                        <div className="flex gap-3">
                            <Skeleton className="h-10 w-24 rounded-full" />
                            <Skeleton className="h-10 w-28 rounded-full" />
                            <Skeleton className="h-10 w-20 rounded-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 pt-8 border-t border-border">
                        <div className="space-y-2"><Skeleton className="h-4 w-24" /> <Skeleton className="h-6 w-32" /></div>
                        <div className="space-y-2"><Skeleton className="h-4 w-24" /> <Skeleton className="h-6 w-32" /></div>
                        <div className="space-y-2"><Skeleton className="h-4 w-24" /> <Skeleton className="h-6 w-48" /></div>
                        <div className="space-y-2"><Skeleton className="h-4 w-24" /> <Skeleton className="h-6 w-32" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: movie, isLoading: isMovieLoading } = useGetMovieDetails(id || "");
    const { data: credits, isLoading: isCreditsLoading } = useGetMovieCredits(id || "");
    const { data: similarMovies, isLoading: isSimilarLoading } = useGetSimilarMovies(id || "");

    if (isMovieLoading || isCreditsLoading) {
        return <MovieDetailsSkeleton />;
    }

    if (!movie) return null;

    const director = credits?.crew.find(person => person.job === "Director")?.name;
    const mainCast = credits?.cast.slice(0, 5).map(person => person.name).join(", ");

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
            {/* Backdrop Image */}
            <div className="absolute top-0 left-0 w-full h-[50vh] -z-10 opacity-20 overflow-hidden">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt=""
                    className="w-full h-full object-cover blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
            </div>

            <div className="p-4 sm:p-8 max-w-[1400px] mx-auto space-y-12">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="gap-2 hover:bg-brand/10 hover:text-brand transition-colors mb-4"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 items-start">
                    {/* Left Column: Poster */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative group"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="rounded-3xl shadow-2xl w-full border border-border group-hover:border-brand/50 transition-colors"
                        />
                    </motion.div>

                    {/* Right Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{movie.title}</h1>
                            <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-medium">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-brand" />
                                    {new Date(movie.release_date).getFullYear()}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-brand" />
                                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                                </span>
                                <span className="px-2 py-0.5 rounded bg-muted border border-border text-xs">
                                    PG-13
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-2xl border border-border border-brand/20">
                                <Star className="w-6 h-6 fill-brand text-brand" />
                                <div>
                                    <span className="text-xl font-bold">{movie.vote_average.toFixed(1)}</span>
                                    <span className="text-muted-foreground ml-2">({movie.vote_count.toLocaleString()} votes)</span>
                                </div>
                            </div>
                            <Button size="lg" className="rounded-2xl h-14 px-8 bg-brand hover:bg-brand/80 gap-3 text-white">
                                <Heart className="w-5 h-5" />
                                Add to Favorites
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Overview</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                                {movie.overview}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Genres</h2>
                            <div className="flex flex-wrap gap-3">
                                {movie.genres.map(genre => (
                                    <Badge key={genre.id} variant="secondary" className="px-4 py-2 pb-3 rounded-full text-sm font-medium hover:border-brand hover:bg-brand/5 transition-all cursor-default">
                                        {genre.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 pt-8 border-t border-border">
                            <div className="space-y-1">
                                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Release Date</p>
                                <p className="text-lg font-semibold">{new Date(movie.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Director</p>
                                <p className="text-lg font-semibold">{director || "N/A"}</p>
                            </div>
                            <div className="space-y-1 sm:col-span-2">
                                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Cast</p>
                                <p className="text-lg font-semibold leading-relaxed">{mainCast || "N/A"}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Language</p>
                                <p className="text-lg font-semibold flex items-center gap-2">
                                    <Languages className="w-4 h-4 text-brand" />
                                    {movie.original_language.toUpperCase()}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Budget</p>
                                <p className="text-lg font-semibold flex items-center gap-2">
                                    <Wallet className="w-4 h-4 text-brand" />
                                    {formatCurrency(movie.budget)}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Revenue</p>
                                <p className="text-lg font-semibold flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-brand" />
                                    {formatCurrency(movie.revenue)}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {isSimilarLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="aspect-[2/3] rounded-2xl" />)}
                        </div>
                    ) : (
                        <MovieSection
                            title="Similar Movies"
                            movies={similarMovies?.results}
                            isLoading={isSimilarLoading}
                        />
                    )}
                </motion.div>
            </div>
        </main>
    );
}
