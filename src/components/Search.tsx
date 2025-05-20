"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDebounce } from "@/hooks/useDebounce";
import { Skeleton } from "./ui/skeleton";
import { Movie } from "@/types";

const Search = ({ placeholder }: { placeholder?: string }) => {
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const [showMenu, setShowMenu] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm.trim().length === 0) {
      setResults([]);
      setShowMenu(false);
      return;
    }
    fetch(`/api/movie?query=${debouncedSearchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.Search || []);
        setShowMenu(true);
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
        autoComplete="off"
      />
      <Button className="text-white" type="submit">
        <SearchIcon />
        Szukaj
      </Button>
      {showMenu && results.length > 0 && (
        <div className="absolute left-0 top-full mt-2 w-full bg-background border rounded shadow-lg z-50 max-h-72 overflow-y-auto">
          {results.map((movie: Movie) => (
            <div
              key={movie.imdbID}
              className="flex gap-3 px-4 py-2 hover:bg-accent cursor-pointer"
              onClick={() => {
                replace(`/movie/${movie.imdbID}`);
                setShowMenu(false);
              }}
            >
              {movie.Poster !== "N/A" ? (
                <Image
                  src={movie.Poster}
                  alt={movie.Title}
                  width={60}
                  height={90}
                  className="object-contain w-[60px] h-[90px]"
                />
              ) : (
                <Skeleton className="w-[60px] h-[90px]" />
              )}
              <div>
                <h4 className="font-light text-base">{movie.Title}</h4>
                <p className="text-muted-foreground text-left">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default Search;
