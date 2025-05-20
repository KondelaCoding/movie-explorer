"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

type FavoriteHeartProps = {
  isFavorite: boolean;
  onClick: () => void;
};

const FavoriteHeart = ({ isFavorite, onClick }: FavoriteHeartProps) => {
  const [pulse, setPulse] = useState(false);

  // Trigger pulse only when liking
  const handleClick = () => {
    if (!isFavorite) {
      setPulse(true);
      setTimeout(() => setPulse(false), 400);
    }
    onClick();
  };

  return (
    <div className="relative flex items-center justify-center w-8 h-8">
      <AnimatePresence>
        {pulse && (
          <motion.span
            key="pulse"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-400 rounded-full w-8 h-8 z-0"
          />
        )}
      </AnimatePresence>
      <button onClick={handleClick} className=" relative z-10" aria-label="Dodaj do ulubionych" type="button">
        <AnimatePresence mode="popLayout" initial={false}>
          {isFavorite ? (
            <motion.span
              key="filled"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-red-500 flex items-center justify-center w-5 h-5"
            >
              <Heart fill="currentColor" />
            </motion.span>
          ) : (
            <motion.span
              key="outline"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-muted-foreground flex items-center justify-center w-5 h-5"
            >
              <Heart />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default FavoriteHeart;
