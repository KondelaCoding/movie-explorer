"use client";

import Image from "next/image";
import { Movie } from "@/types";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FavoriteHeart from "./FavoriteHeart";
import { Skeleton } from "./ui/skeleton";

const Table = ({ query, page = 1 }: { query: string; page: number }) => {
  const [data, setData] = useState<Movie[] | null | false>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setData(null); // reset to loading state on new query/page
    const fetchData = async () => {
      const res = await fetch(`/api/movie?query=${query}&page=${page}`);
      const data = await res.json();
      if (data.Response === "True") {
        setData(data.Search);
      } else {
        setData(false);
      }
    };
    fetchData();
  }, [query, page]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  const toggleFavorite = (id: string) => {
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter((fid) => fid !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Skeletons for loading state
  const skeletons = Array.from({ length: 10 });

  return (
    <div className="col-span-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {data === null ? (
          skeletons.map((_, i) => (
            <Card key={i}>
              <CardContent>
                <Skeleton className="w-full aspect-[2/3] mb-2" />
              </CardContent>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="w-3/4 h-5" />
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Skeleton className="w-1/2 h-4" />
              </CardFooter>
            </Card>
          ))
        ) : data === false ? (
          <div className="col-span-12 text-center mt-40">
            <h3>Brak wyników</h3>
            <p className="text-muted-foreground">Spróbuj zmienić zapytanie lub sprawdź inne filmy.</p>
          </div>
        ) : (
          data.map((movie) => (
            <Card key={movie.imdbID}>
              <CardContent>
                {movie.Poster !== "N/A" ? (
                  <Image
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full mb-2 object-cover aspect-[2/3]"
                    width={200}
                    height={300}
                  />
                ) : (
                  <div className="aspect-[2/3] w-full bg-muted-foreground flex items-center justify-center">
                    <h3>Brak plakatu</h3>
                  </div>
                )}
              </CardContent>
              <CardHeader>
                <CardTitle>
                  <p>{movie.Title}</p>
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <CardDescription>{movie.Year}</CardDescription>
                <FavoriteHeart
                  isFavorite={favorites.includes(movie.imdbID)}
                  onClick={() => toggleFavorite(movie.imdbID)}
                />
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
