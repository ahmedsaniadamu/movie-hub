import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Filter, FolderSearch } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchInput from "@/components/ui/search";
import { MovieSection } from "./sections/movie-section";
import { EmptyState } from "@/components/ui/empty-state";
import { useGetMovies, useGetGenres } from "@/hooks/useMovies";
import {
    Collapsible,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { MoviePagination } from "@/components/movie/MoviePagination";

import { useSearchParams } from "react-router";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const page = parseInt(searchParams.get("page") || "1");

    const category = searchParams.get("category") || "now_playing";
    const { data: moviesData, isLoading: isMoviesLoading, refetch: refetchMovies } = useGetMovies({
        category: category || undefined,
        page: page,
        with_genres: selectedGenre?.toString(),
        query: searchQuery,
    });

    useEffect(() => {
        setSelectedGenre(null);
        setSearchQuery("");
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set("page", "1");
        setSearchParams(nextParams);
        refetchMovies();
    }, [category]);

    const handlePageChange = (newPage: number) => {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set("page", newPage.toString());
        setSearchParams(nextParams);
        document.querySelector('.movie-container').scrollTo({ top: 0, behavior: 'smooth' });
    };

    const { data: genresData } = useGetGenres();

    const title = searchQuery
        ? `Search Results for "${searchQuery}"`
        : selectedGenre
            ? `${genresData?.genres.find((g: any) => g.id === selectedGenre)?.name || 'Genre'} Movies`
            : `${category.replace('_', ' ')} Movies`;

    return (
        <main className="flex-1 flex flex-col min-w-0 mx-auto overflow-y-scroll movie-container">
            <header className="flex items-center gap-4 p-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
                <SidebarTrigger className="lg:hidden" />
                <div className="flex-1 max-w-2xl relative">
                    <SearchInput
                        placeHolder="Search movies..."
                        setSearch={setSearchQuery}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button
                        variant="outline"
                        className={cn(
                            "h-11 px-4 gap-2 rounded-xl group hover:border-brand transition-all",
                            isFilterOpen && "border-brand bg-brand/5"
                        )}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <Filter className={cn("w-4 h-4 group-hover:text-brand", isFilterOpen && "text-brand")} />
                        <span className="hidden sm:inline">Filters</span>
                    </Button>
                </div>
            </header>

            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <CollapsibleContent className="px-8 pb-6 border-b border-border bg-background/95 backdrop-blur animate-in fade-in slide-in-from-top-2">
                    <div className="max-w-[1400px] mx-auto overflow-hidden">
                        <div className="flex flex-wrap gap-2 pt-2 max-h-[200px] overflow-y-auto no-scrollbar scroll-smooth">
                            <Badge
                                variant={selectedGenre === null ? "default" : "outline"}
                                className={cn(
                                    "cursor-pointer px-4 py-1.5 rounded-full transition-all",
                                    selectedGenre === null ? "bg-brand text-white border-brand hover:bg-brand/90" : "hover:border-brand hover:text-brand"
                                )}
                                onClick={() => setSelectedGenre(null)}
                            >
                                All Genres
                            </Badge>
                            {genresData?.genres.map((genre: any) => (
                                <Badge
                                    key={genre.id}
                                    variant={selectedGenre === genre.id ? "default" : "outline"}
                                    className={cn(
                                        "cursor-pointer px-4 py-1.5 rounded-full transition-all",
                                        selectedGenre === genre.id
                                            ? "bg-brand text-white border-brand hover:bg-brand/90"
                                            : "hover:border-brand hover:text-brand"
                                    )}
                                    onClick={() => setSelectedGenre(genre.id)}
                                >
                                    {genre.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>

            <ScrollArea className="flex-1">
                <div className="p-8 max-w-[1400px] mx-auto">
                    <div className="mb-10">
                        <h1 className="text-4xl capitalize font-extrabold tracking-tight mb-2">{title}</h1>
                        <p className="text-lg text-muted-foreground">
                            {searchQuery
                                ? `${moviesData?.total_results || 0} results found`
                                : "Find and explore your next favorite movie."}
                        </p>
                    </div>


                    {!isMoviesLoading && moviesData?.results?.length === 0 ? (
                        <EmptyState
                            icon={FolderSearch}
                            title="No movies found"
                            description={searchQuery ? `We couldn't find any results for "${searchQuery}".` : "Try selecting a different genre."}
                            className="py-20"
                        />
                    ) : (
                        <>
                            <MovieSection
                                title={searchQuery || selectedGenre ? "" : "Discover & Explore"}
                                movies={moviesData?.results}
                                isLoading={isMoviesLoading}
                            />

                            <MoviePagination
                                currentPage={page}
                                totalPages={moviesData?.total_pages || 0}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </div>
            </ScrollArea>
        </main>
    );
}
