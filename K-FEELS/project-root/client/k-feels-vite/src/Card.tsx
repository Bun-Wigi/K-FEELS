import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  options: string[];
  onSelect: (option: string) => void;
  step?: number;
  isFirst?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  options,
  onSelect,
  step,
  isFirst,
}) => {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 100, scale: isFirst ? 1.05 : 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <h2>
        {title} {step !== undefined && `(Step ${step})`}
      </h2>
      <div className="options">
        {options.map((option, i) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.1,
              type: "spring",
              stiffness: 400,
              damping: 12,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(option)}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Card;
