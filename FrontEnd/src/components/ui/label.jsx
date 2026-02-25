import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Label = ({ children, className, ...props }) => {
  return (
    <motion.label
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("text-white text-sm font-medium mb-1 block", className)}
      {...props}
    >
      {children}
    </motion.label>
  );
};
