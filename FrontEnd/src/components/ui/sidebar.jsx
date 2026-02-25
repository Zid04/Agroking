import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Sidebar = ({ children, className }) => {
  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn("w-64 min-h-screen bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 text-white p-6 flex flex-col gap-6", className)}
    >
      {children}
    </motion.aside>
  );
};
