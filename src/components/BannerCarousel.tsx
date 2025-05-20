"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { motion } from "framer-motion";

const moviePosterTitles = [
  "transformers",
  "star wars",
  "harry potter",
  "the lord of the rings",
  "the matrix",
  "inception",
  "interstellar",
  "the dark knight",
  "avengers",
];

const BannerCarousel = () => {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    async function fetchMovies() {
      moviePosterTitles.forEach(async (title) => {
        const movies = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/poster?title=${title}`);
        const data = await movies.json();
        console.log(data.Poster);
        setImages((prev) => [...prev, data.Poster]);
      });
    }
    fetchMovies();
  }, []);
  //TODO: Add onClick to redirect to movie page or at least to the movie list page with the selected movie
  return (
    <div className="global-grid flex-col">
      <h2 className="font-light">Polecane</h2>
      <Carousel
        className="w-full col-span-12"
        opts={{ align: "center", loop: true }}
        plugins={[Autoplay({ delay: 5000 })]}
      >
        <CarouselContent className="-ml-5">
          {images.length === 0 ? (
            <>
              {moviePosterTitles.map((title, index) => (
                <CarouselItem
                  key={index}
                  className="relative aspect-[2/2.8] pl-5 basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/5"
                >
                  <Skeleton className="w-full h-full" />
                </CarouselItem>
              ))}
            </>
          ) : (
            <>
              {images.map((image, index) => (
                <CarouselItem key={index} className="relative pl-5 basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/5">
                  <motion.div
                    className="w-full h-full aspect-[2/3]"
                    whileHover={{ scale: 1.08, zIndex: 2 }}
                    transition={{ damping: 10 }}
                    style={{ willChange: "transform" }}
                  >
                    <Image
                      src={image}
                      alt={`Movie Poster ${index + 1}`}
                      fill
                      className="object-contain object-center w-full"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </>
          )}
        </CarouselContent>
        <CarouselPrevious variant="secondary" className="border-primary border" />
        <CarouselNext variant="secondary" className="border-primary border" />
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
