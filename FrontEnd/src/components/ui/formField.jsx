import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FormField = ({ type = "text", placeholder, rows = 1, className, ...props }) => {
  const baseClasses = "p-3 rounded-xl bg-white/10 text-white placeholder-gray-300 w-full transition focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

  if (type === "textarea") {
    return (
      <motion.textarea
        rows={rows}
        placeholder={placeholder}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={cn(baseClasses, className)}
        {...props}
      />
    );
  }

  return (
    <motion.input
      type={type}
      placeholder={placeholder}
      whileFocus={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(baseClasses, className)}
      {...props}
    />
  );
};
