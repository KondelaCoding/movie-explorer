"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Search = ({ placeholder }: { placeholder?: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="inline-flex gap-5 items-center w-full">
      <Input
        type="text"
        placeholder={placeholder ?? "Szukaj..."}
        className="bg-border"
        // onChange={isInstant ? (e) => setSearchTerm(e.target.value) : (e) => handleSearch(e.target.value)}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString() ?? ""}
      />
      <Button className="text-white">
        <SearchIcon />
        Szukaj
      </Button>
    </div>
  );
};

export default Search;
