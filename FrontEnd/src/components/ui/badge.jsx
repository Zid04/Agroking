import React from "react";
import { motion } from "framer-motion";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-red-500 text-white",
        outline: "border border-white text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Badge = ({ className, variant, children, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
