import React from "react";

const Table = async ({ query, currentPage }: { query: string; currentPage: number }) => {
  const movies = await fetch(`http://www.omdbapi.com/?t=${query}%apikey=${process.env.OMDB_API_KEY}`);

  if (!movies.ok) {
    throw new Error("Failed to fetch data");
  }

  return <div></div>;
};

export default Table;
