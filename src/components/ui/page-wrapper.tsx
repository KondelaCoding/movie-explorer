"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const search = useSearchParams();

  // Use a unique key for each page (pathname + search params)
  const pageKey = pathname + (search ? `?${search.toString()}` : "");

  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
