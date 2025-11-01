import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardProps {
  step: number;
  title: string;
  options: string[];
  onSelect: (choice: string) => void;
}

const Card: React.FC<CardProps> = ({ step, title, options, onSelect }) => {
  // State for sparkle burst
  const [sparkles, setSparkles] = useState<{ id: number; angle: number }[]>([]);
  // State for expansion animation
  const [expanded, setExpanded] = useState(false);

  // Animation presets for when card appears/disappears
  const cardVariants = {
    initial: { scale: 0.9, opacity: 0, y: 40 },
    animate: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { scale: 0.8, opacity: 0, y: -40, transition: { duration: 0.3 } },
  };

  // Sparkle burst + card pop when user clicks
  const triggerBurst = () => {
    const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      angle: (i / 12) * 360, // evenly distributed around circle
    }));
    setSparkles(newSparkles);

    // Clear sparkles after 1 second
    setTimeout(() => setSparkles([]), 1000);

    // Expand card briefly
    setExpanded(true);
    setTimeout(() => setExpanded(false), 250);
  };

  // Handle user selection
  const handleSelect = (choice: string) => {
    triggerBurst();
    // Delay advancing to next card slightly to sync with animation
    setTimeout(() => onSelect(choice), 250);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        className={`card ${expanded ? "card-expand" : ""}`}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Sparkles overlay */}
        <div className="sparkle-container">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="sparkle"
              style={{
                transform: `rotate(${s.angle}deg) translateY(-80px)`,
              }}
            />
          ))}
        </div>

        {/* Card Title */}
        <h2>{title}</h2>

        {/* Option Buttons */}
        <div className="options">
          {options.map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              onClick={() => handleSelect(option)}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Card;
