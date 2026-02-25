import React from "react";
import { motion } from "framer-motion";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-2xl p-6 transition transform shadow-md",
  {
    variants: {
      variant: {
        default: "bg-white/10 backdrop-blur",
        primary: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Card = ({ className, variant, children, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5 }}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
