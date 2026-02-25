import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const Separator = ({ orientation = "horizontal", className, ...props }) => {
  if (orientation === "vertical") {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "100%" }}
        transition={{ duration: 0.5 }}
        className={cn("w-px bg-white/30 mx-2", className)}
        {...props}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      transition={{ duration: 0.5 }}
      className={cn("h-px bg-white/30 my-4", className)}
      {...props}
    />
  );
};
