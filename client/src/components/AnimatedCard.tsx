import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AnimatedOption {
  label: string; // text on the bottom
  value: string; //tag
}

interface AnimatedCardProps {
  step: number;
  title: string;
  options: AnimatedOption[];
  onSelect: (value: string) => void;
}

export default function AnimatedCard({
  step,
  title,
  options,
  onSelect,
}: AnimatedCardProps) {
  //state for sparkle burst
  const [sparkles, setSparkles] = useState<{ id: number; angle: number }[]>([]);
  //state foir expansion animation
  const [expanded, setExpanded] = useState(false);

  //animation presets for when card appears/disappears
  const cardVariants = {
    initial: { scale: 0.9, opacity: 0, y: 40 },
    animate: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { scale: 0.8, opacity: 0, y: -40, transition: { duration: 0.3 } },
  };

  //sparkle burst + cars pop when user clicks
  const triggerBurst = () => {
    const s = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      angle: (i / 12) * 360, //evenly distributed around circle
    }));
    setSparkles(s);
    //clear sparkles after 1 sec
    setTimeout(() => setSparkles([]), 1000);
    //expand card briefly
    setExpanded(true);
    setTimeout(() => setExpanded(false), 250);
  };

  //handle user selection
  const handleSelect = (value: string) => {
    triggerBurst();
    //delay advancing to next card slightly to sync with animation
    setTimeout(() => onSelect(value), 250);
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
        {/* Sparkles overlay*/}
        <div className="sparkle-container">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="sparkle"
              style={{ transform: `rotate(${s.angle}deg) translateY(-80px)` }}
            />
          ))}
        </div>

        {/* Card Title */}
        <h2>{title}</h2>

        {/* Option Buttons */}
        <div className="options">
          {options.map((opt) => (
            <motion.button
              key={opt.label}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
