import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  options: string[];
  onSelect: (choice: string) => void;
  step: number;
}

const Card: React.FC<CardProps> = ({ title, options, onSelect, step }) => {
  return (
    <motion.div
      className="card"
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2>{title}</h2>
      <div className="options">
        {options.map((option, index) => (
          <motion.button
            key={option}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * 0.12, // staggered pop
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            whileHover={{
              scale: 1.08,
              backgroundColor: "#ffb6c1",
              boxShadow: "0 0 20px rgba(255, 182, 193, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              onSelect(option);
              // subtle card bounce on click
              const cardEl = e.currentTarget.closest(".card");
              if (cardEl) {
                cardEl.animate(
                  [
                    { transform: "scale(1)" },
                    { transform: "scale(1.03)" },
                    { transform: "scale(1)" },
                  ],
                  { duration: 150, easing: "ease-out" }
                );
              }
            }}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Card;
