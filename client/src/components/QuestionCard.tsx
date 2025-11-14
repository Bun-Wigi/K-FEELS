//reflect one question and answers's options

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "../types";

interface Props {
  question: Question; // { id, text, options: [{ answer, tag }] }

  // callback to parent when user picks an answer
  onAnswer: (tag: string) => void;
}

export default function AnimatedQuestionCard({ question, onAnswer }: Props) {
  // state for sparkle burst
  const [sparkles, setSparkles] = useState<{ id: number; angle: number }[]>([]);
  // state for brief expansion animation when option clicked
  const [expanded, setExpanded] = useState(false);

  // Trigger sparkle + card pop
  const triggerBurst = () => {
    // generate 12 sparkles evenly around a circle
    const s = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      angle: (i / 12) * 360,
    }));
    setSparkles(s);
    // clear sparkles after 1 sec
    setTimeout(() => setSparkles([]), 1000);

    // expand card briefly for click effect
    setExpanded(true);
    setTimeout(() => setExpanded(false), 250);
  };

  // Handle user selecting an answer
  const handleSelect = (tag: string) => {
    triggerBurst();
    // delay calling parent to sync with animation
    setTimeout(() => onAnswer(tag), 250);
  };

  // Animation presets for card appear/disappear
  const cardVariants = {
    initial: { scale: 0.95, opacity: 0, y: 30 },
    animate: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { scale: 0.9, opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        className={`card ${expanded ? "card-expand" : ""}`}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          padding: 12,
          borderRadius: 12,
          background: "#f4f0ff",
        }}
      >
        {/* Sparkles overlay */}
        <div className="sparkle-container">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="sparkle"
              style={{ transform: `rotate(${s.angle}deg) translateY(-80px)` }}
            />
          ))}
        </div>

        {/* Question text */}
        <h2 style={{ margin: 0, fontSize: 22, color: "#1c1c1c" }}>
          {question.text}
        </h2>

        {/* Hint for user */}
        <div style={{ marginTop: 10, color: "#6b6b6b", fontSize: 14 }}>
          Tap to choose
        </div>

        {/* Option Buttons */}
        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          {question.options.map((opt) => (
            <motion.button
              key={opt.tag}
              // hover and tap animations
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.1 }}
              onClick={() => handleSelect(opt.tag)}
              style={{
                textAlign: "center",
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid #e171cbff",
                background: "#eec1e4ff",
                color: "#1c1c1c",
                fontSize: 17,
                fontFamily: "serif",
                cursor: "pointer",
              }}
            >
              {/* answer text */}
              {opt.answer}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
