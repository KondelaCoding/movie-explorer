import Image from "next/image";

const page = async ({ params }: { params: Promise<{ movieId: string }> }) => {
  const { movieId } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie-details/?movieId=${movieId}`);

  const movieInfo = await response.json();
  return (
    <div className="global-grid mt-20 flex-col">
      <h3 className="font-light col-span-12">Szczegóły filmu</h3>
      <div className="col-span-12 flex flex-col md:flex-row gap-5">
        <Image
          src={movieInfo.Poster}
          alt={movieInfo.Title}
          className="w-full h-auto max-w-[300px] rounded-lg"
          width={300}
          height={450}
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{movieInfo.Title}</h2>
          <p className="text-sm text-gray-500">{movieInfo.Year}</p>
          <p>{movieInfo.Plot}</p>
          <p className="font-semibold">Gatunek: {movieInfo.Genre}</p>
          <p className="font-semibold">Reżyser: {movieInfo.Director}</p>
          <p className="font-semibold">Obsada: {movieInfo.Actors}</p>
        </div>
      </div>
    </div>
  );
};

export default page;
