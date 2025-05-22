import Search from "@/components/Search";
import CarouselBanner from "@/components/BannerCarousel";

export default function Home() {
  return (
    <div className="my-10">
      <div className="global-grid mb-20">
        <div className="flex flex-col items-center justify-center w-full gap-5 mt-10 col-span-8 col-start-3 text-center">
          <h1 className="text-9xl">🎬</h1>
          <h1>Witaj w Movie Explorer!</h1>
          <h3 className="font-light">
            Znajdź swoje ulubione tytuły i odkryj nowe filmy i seriale. Przeglądaj i dodawaj do ulubionych!
          </h3>
          <Search placeholder="Szukaj filmów lub seriali..." />
        </div>
      </div>
      <CarouselBanner />
    </div>
  );
}
