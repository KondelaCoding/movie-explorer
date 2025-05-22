"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDebounce } from "@/hooks/useDebounce";
import { useCache } from "@/hooks/useCache";
import { Skeleton } from "./ui/skeleton";
import { Movie } from "@/types";
import Link from "next/link";

const Search = ({ placeholder }: { placeholder?: string }) => {
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const [showMenu, setShowMenu] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { get, set } = useCache<any>();

  useEffect(() => {
    if (debouncedSearchTerm.trim().length === 0) {
      setResults([]);
      setShowMenu(false);
      return;
    }

    const cacheKey = debouncedSearchTerm.toLowerCase();

    const cached = get(cacheKey);
    if (cached) {
      setResults(cached.Search || []);
      setShowMenu(true);
      return;
    }

    fetch(`/api/movie-search?query=${debouncedSearchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.Search || []);
        setShowMenu(true);
        set(cacheKey, data); // cache the result
      });
  }, [debouncedSearchTerm]);

  // Hide menu when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!inputRef.current?.parentElement?.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [showMenu]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      replace(`/search?query=${encodeURIComponent(searchTerm)}`);
      setShowMenu(false);
    }
  };

  return (
    <form className="relative inline-flex gap-5 items-center w-full" onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder ?? "Wyszukaj..."}
        className="bg-border"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        onFocus={() => results.length > 0 && setShowMenu(true)}
      />
      <Button className="text-white" type="submit">
        <SearchIcon />
        Szukaj
      </Button>
      {showMenu && results.length > 0 && (
        <div className="absolute left-0 top-full mt-2 w-full bg-background border rounded shadow-lg z-50 max-h-72 overflow-y-auto">
          {results.map((movie: Movie) => (
            <Link
              key={movie.imdbID}
              className="flex gap-3 px-4 py-2 hover:bg-accent cursor-pointer"
              href={`/movie/${movie.imdbID}`}
            >
              {movie.Poster !== "N/A" ? (
                <Image
                  src={movie.Poster}
                  alt={movie.Title}
                  width={60}
                  height={90}
                  className="object-contain w-[60px] h-[90px] overflow-hidden"
                />
              ) : (
                <Skeleton className="w-[60px] h-[90px]" />
              )}
              <div>
                <h4 className="font-light text-base">{movie.Title}</h4>
                <p className="text-muted-foreground text-left">{movie.Year}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </form>
  );
};

export default Search;
