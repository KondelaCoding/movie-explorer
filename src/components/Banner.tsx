import CarouselBanner from "./BannerCarousel";
import Search from "./Search";

const Banner = () => {
  return (
    <div className="mt-10">
      <div className="global-grid mb-20">
        <div className="flex flex-col items-center justify-center w-full gap-5 mt-10 col-span-8 col-start-3 text-center">
          <h1>Witaj w Movie Explorer!</h1>
          <p className="lead">
            Znajdź swoje ulubione tytuły i odkryj nowe filmy i seriale. Przeglądaj i dodawaj do ulubionych!
          </p>
          <Search placeholder="Szukaj filmów lub seriali..." />
        </div>
      </div>
      <CarouselBanner />
    </div>
  );
};

export default Banner;
