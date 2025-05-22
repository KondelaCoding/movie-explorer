import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/ui/page-wrapper";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Explorer",
  description: "Wszystkie twoje ulubione filmy w jednym miejscu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] antialiased`}>
        <ThemeProvider>
          <PageWrapper>
            <div className="min-h-screen h-full grid grid-rows-[auto_1fr_auto] grid-cols-1">
              <Navbar />
              <div className="pt-10">{children}</div>
              <Footer />
            </div>
          </PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
