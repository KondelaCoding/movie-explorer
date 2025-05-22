"use client";

import { Movie } from "@/types";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";
import PaginationComponent from "./PaginationComponent";
import MovieCard from "./MovieCard";

type TableProps = {
  query?: string;
  page?: number;
  data?: Movie[] | false | null;
  totalPages?: number;
};

const Table = ({ query = "", page = 1, data: externalData, totalPages: externalTotalPages }: TableProps) => {
  const [data, setData] = useState<Movie[] | null | false>(externalData ?? null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState<number>(externalTotalPages ?? 0);

  // Fetch only if data is not provided
  useEffect(() => {
    if (typeof externalData !== "undefined") {
      setData(externalData);
      if (typeof externalTotalPages === "number") setTotalPages(externalTotalPages);
      return;
    }
    setData(null); // reset to loading state on new query/page
    if (!query) {
      setData(false);
      return;
    }
    const fetchData = async () => {
      const res = await fetch(`/api/movie-search?query=${query}&page=${page}`);
      const data = await res.json();
      if (data.Response === "False") {
        setData(false);
        setTotalPages(0);
        return;
      }
      setData(data.Search);
      setTotalPages(Math.ceil(Number(data.totalResults) / 10));
    };
    fetchData();
  }, [query, page, externalData, externalTotalPages]);

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

  return (
    <div className="col-span-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-20">
        {data === null ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Card key={index}>
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
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={favorites.includes(movie.imdbID)}
              onToggleFavorite={toggleFavorite}
            />
          ))
        )}
      </div>
      {externalData && totalPages > 1 && (
        <PaginationComponent query={query} totalPages={totalPages} currentPage={page} />
      )}
    </div>
  );
};

export default Table;
