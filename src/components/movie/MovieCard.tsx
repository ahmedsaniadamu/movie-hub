import { Star } from "lucide-react";
import type { Movie } from "@/services/movie";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";

export function MovieCard({ movie }: { movie: Movie }) {

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <Card className="group pt-0 mt-0 overflow-hidden border-none bg-transparent shadow-none transition-all hover:translate-y-[-4px]">
        <CardContent className="p-0 mt-0 relative">
          <div className="aspect-[2/3] overflow-hidden rounded-xl bg-muted">
            <img
              src={posterUrl}
              alt={movie.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <Badge className="absolute top-2 right-2 bg-black/60 backdrop-blur-md border-none text-yellow-400 gap-1 px-2 py-0.5">
            <Star className="w-3 h-3 fill-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </Badge>
        </CardContent>
        <div className="mt-3 px-3 space-y-1">
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-brand transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
          </p>
        </div>
      </Card>
    </Link>
  );
}
