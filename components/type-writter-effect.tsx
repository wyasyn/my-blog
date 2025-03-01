"use client";
import { motion } from "framer-motion";

type TypewriterTextProps = {
  text: string;
};

const TypewriterText = ({ text }: TypewriterTextProps) => {
  return (
    <h2 className="max-sm:text-xl font-mono text-muted-foreground mt-4 lg:ml-8 md:mt-5">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          transition={{ delay: index * 0.1, duration: 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </h2>
  );
};

export default TypewriterText;
