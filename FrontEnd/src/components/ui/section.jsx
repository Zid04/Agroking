import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const Section = ({ title, children, className }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("py-12 px-6", className)}
    >
      {title && <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>}
      {children}
    </motion.section>
  );
};
