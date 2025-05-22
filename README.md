# Movie Explorer

Movie Explorer to aplikacja webowa stworzona w Next.js, pozwalająca na wyszukiwanie, przeglądanie oraz dodawanie do ulubionych filmów i seriali z bazy OMDb.

## Funkcje

- Wyszukiwanie filmów i seriali po tytule
- Przeglądanie szczegółów wybranego filmu/serialu
- Dodawanie i usuwanie pozycji z ulubionych (lokalnie w przeglądarce)
- Przeglądanie listy ulubionych
- Paginacja wyników wyszukiwania
- Responsywny i nowoczesny interfejs z animacjami

## Uruchomienie lokalne

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/KondelaCoding/movie-explorer.git
   cd movie-explorer
   ```

2. Zainstaluj zależności:
   ```bash
   npm install
   ```

3. Skonfiguruj plik `.env` (przykład poniżej):

   ```
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   OMDB_API_KEY="twoj_klucz_omdb"
   ```

4. Uruchom aplikację:
   ```bash
   npm run dev
   ```

5. Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## Technologie

- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Framer Motion (animacje)
- OMDb API
