import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Dropdown = ({ options = [], selected, onChange, className, ...props }) => {
  return (
    <motion.select
      value={selected}
      onChange={onChange}
      whileFocus={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn("p-3 rounded-xl bg-white/10 text-white w-full transition", className)}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </motion.select>
  );
};
