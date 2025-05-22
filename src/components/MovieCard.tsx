import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import FavoriteHeart from "./FavoriteHeart";
import { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({
  movie,
  isFavorite,
  onToggleFavorite,
}: {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movieId: string) => void;
}) => (
  <Card className="flex flex-col justify-between py-1 md:py-6">
    <CardContent className="px-1 md:px-6">
      <Link href={`/movie/${movie.imdbID}`} className="flex flex-col hover:underline">
        {movie.Poster !== "N/A" ? (
          <Image
            src={movie.Poster}
            alt={movie.Title}
            className="w-full mb-2 object-cover aspect-[2/3] bg-muted-foreground"
            width={200}
            height={300}
          />
        ) : (
          <div className="aspect-[2/3] w-full bg-muted-foreground flex items-center justify-center">
            <h3>Brak plakatu</h3>
          </div>
        )}
        <CardTitle>
          <p>{movie.Title}</p>
        </CardTitle>
      </Link>
    </CardContent>
    <CardFooter className="flex items-center justify-between">
      <CardDescription>{movie.Year}</CardDescription>
      <FavoriteHeart isFavorite={isFavorite} onClick={() => onToggleFavorite(movie.imdbID)} />
    </CardFooter>
  </Card>
);

export default MovieCard;
