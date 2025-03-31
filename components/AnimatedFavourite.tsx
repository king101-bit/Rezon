"use client";
import { motion } from "framer-motion";

const AnimatedFavorite = () => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, bounce: 0.3, type: "spring" }}
      className="inline-block relative text-5xl font-bold text-black ml-1"
    >
      favorite
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute bottom-[-5px] left-0 h-[3px] bg-[#931621]"
      />
    </motion.span>
  );
};

export default AnimatedFavorite;
