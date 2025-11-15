import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "../types";

interface Props {
  question: Question;
  index: number; // step index
  onAnswer: (tag: string) => void;
}

export default function AnimatedQuestionCard({ question, index, onAnswer }: Props) {
  const [sparkles, setSparkles] = useState<
    { id: number; driftX: number; size: number; opacity: number }[]
  >([]);
  const [expanded, setExpanded] = useState(false);

  const triggerBurst = () => {
    const s = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      driftX: (Math.random() - 0.5) * 60, // horizontal drift -30 to +30
      size: 5 + Math.random() * 8,
      opacity: 0.5 + Math.random() * 0.5,
    }));
    setSparkles(s);
    setTimeout(() => setSparkles([]), 1000);

    setExpanded(true);
    setTimeout(() => setExpanded(false), 250);
  };

  const handleSelect = (tag: string) => {
    triggerBurst();
    setTimeout(() => onAnswer(tag), 250);
  };

  const cardVariants = {
    initial: { scale: 0.9, opacity: 0, y: 40 },
    animate: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { scale: 0.8, opacity: 0, y: -40, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
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
                "--drift": `${s.driftX}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <h2>{question.text}</h2>

        <div className="options">
          {question.options.map((opt, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              onClick={() => handleSelect(opt.tag)}
            >
              {opt.answer}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
