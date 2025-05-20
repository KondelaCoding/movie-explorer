"use client";

import { Button } from "@/components/ui/button";
import { Film, Moon, Sun, Search, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed top-0 z-50 w-full bg-background border-b">
      <div className="global-grid items-center justify-between">
        <Link href="/" className="col-span-3  inline-flex items-center gap-3">
          <h3>🎬</h3>
          <h3 className="hidden md:block text-nowrap">Movie Explorer</h3>
        </Link>
        <div className="col-span-9 ">
          <div className="flex items-center justify-end gap-5">
            <Link href="/" className="hidden md:inline-flex">
              <Button variant="ghost" size="lg" className="font-light">
                <Film />
                Strona główna
              </Button>
            </Link>
            <Link href="/favorites">
              <Button variant="ghost" size="lg" className="font-light">
                <Heart />
                <span className="hidden md:inline-flex">Ulubione</span>
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" className="inline-flex items-center gap-2 text-white">
                <Search />
                Szukaj
              </Button>
            </Link>
            {mounted && (
              <Button
                size="lg"
                variant="ghost"
                onClick={() => {
                  theme.setTheme(theme.theme === "dark" ? "light" : "dark");
                }}
                className="relative overflow-hidden"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {theme.theme === "dark" ? (
                    <motion.span
                      key="moon"
                      initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex items-center"
                    >
                      <Moon size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="sun"
                      initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex items-center"
                    >
                      <Sun size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
