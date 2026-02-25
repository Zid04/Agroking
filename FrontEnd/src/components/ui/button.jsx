import React from "react";
import { motion } from "framer-motion";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "px-6 py-3 rounded-xl font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "#0cf4e4",
        secondary: "bg-white text-white",
        outline: "border-2 border-white text-white",
        destructive: "bg-red-500 text-white",
      },
      size: {
        small: "text-sm px-4 py-2",
        medium: "text-base px-6 py-3",
        large: "text-lg px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

export const Button = ({ className, variant, size, children, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
