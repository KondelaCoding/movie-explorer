"use client";

import Table from "@/components/Table";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Movie } from "@/types";

const Page = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const favoritesIdArray = JSON.parse(localStorage.getItem("favorites") || "[]");
    const fetchData = async () => {
      const movies = await Promise.all(
        favoritesIdArray.map(async (id: string) => {
          const response = await fetch(`/api/movie-details?movieId=${id}`);
          const data = await response.json();
          return {
            Title: data.Title,
            Year: data.Year,
            imdbID: data.imdbID,
            Type: data.Type,
            Poster: data.Poster,
          };
        })
      );
      setFavorites(movies);
    };
    fetchData();
  }, []);

  return (
    <div className="global-grid mt-20 flex-col">
      <h3 className="font-light col-span-12 inline-flex items-center gap-2">
        <Heart strokeWidth={1} />
        Ulubione
      </h3>
      <Separator orientation="horizontal" className="col-span-12" />
      {favorites.length > 0 ? (
        <>
          <p className="col-span-12">Twoja lista ulubionych filmów:</p>
          <Table data={favorites} />
        </>
      ) : (
        <div className="col-span-12 text-center mt-40">
          <h3>Brak ulubionych filmów</h3>
          <p className="text-muted-foreground">Dodaj filmy do ulubionych, aby je tutaj zobaczyć.</p>
        </div>
      )}
    </div>
  );
};

export default Page;
