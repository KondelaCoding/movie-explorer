import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col justify-end">
      <footer className="w-full bg-background border-t py-8 mt-10">
        <div className="global-grid flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <Link href="/" className="font-semibold text-foreground">
              🎬 Movie Explorer
            </Link>
            <span className="hidden md:inline-block mx-2">|</span>
            <span>© {new Date().getFullYear()} Wszelkie prawa zastrzeżone.</span>
          </div>
          <div className="flex gap-6">
            <Link
              href="https://github.com/KondelaCoding/movie-explorer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://www.omdbapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors"
            >
              OMDb API
            </Link>
            <Link href={`mailto:${process.env.CONTACT_EMAIL}`} className="hover:underline transition-colors">
              Kontakt
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
