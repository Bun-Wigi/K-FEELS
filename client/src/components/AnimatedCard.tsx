import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AnimatedOption {
  label: string; // text on the button
  value: string; // tag
}

interface Sparkle {
  id: number;
  angle: number;
  driftX: number;
  size: number;
  opacity: number;
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
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [expanded, setExpanded] = useState(false);

  const cardVariants = {
    initial: { scale: 0.9, opacity: 0, y: 40 },
    animate: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { scale: 0.8, opacity: 0, y: -40, transition: { duration: 0.3 } },
  };

  const triggerBurst = () => {
    const newSparkles: Sparkle[] = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      angle: (i / 12) * 360,
      driftX: Math.random() * 40 - 20, // random left/right drift
      size: Math.random() * 6 + 6, // size between 6-12px
      opacity: Math.random() * 0.6 + 0.4, // opacity between 0.4-1
    }));

    setSparkles(newSparkles);

    setTimeout(() => setSparkles([]), 1000);
    setExpanded(true);
    setTimeout(() => setExpanded(false), 250);
  };

  const handleSelect = (value: string) => {
    triggerBurst();
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
        {/* SPARKLES */}
        <div className="sparkle-container">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="sparkle"
              style={{
                width: s.size,
                height: s.size,
                opacity: s.opacity,
                "--drift-x": `${s.driftX}px`,
              } as React.CSSProperties}
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
