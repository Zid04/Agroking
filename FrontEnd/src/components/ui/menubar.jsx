import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MenuBar = ({ items = [], className }) => {
  return (
    <div className={cn("flex gap-4 p-4 bg-white/10 rounded-xl text-white", className)}>
      {items.map((item) => (
        <motion.a
          key={item.label}
          href={item.href}
          whileHover={{ scale: 1.1 }}
          className="transition-colors hover:text-yellow-300"
        >
          {item.label}
        </motion.a>
      ))}
    </div>
  );
};
