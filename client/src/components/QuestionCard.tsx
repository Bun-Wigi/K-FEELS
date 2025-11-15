import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question, AnswerOption } from "../types";

interface Props {
  question: Question;
  index: number; // Keep the index prop from your version
  onAnswer: (tag: string) => void;
}

export default function QuestionCard({ question, index, onAnswer }: Props) {
  const [sparkles, setSparkles] = useState<
    { id: number; driftX: number; size: number; opacity: number }[]
  >([]);
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(true); // Default to open for better UX

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

  const handleSelect = (tag: string): void => {
    triggerBurst(); // Keep your sparkle animation
    setIsOpen(false);
    setTimeout(() => onAnswer(tag), 250); // Keep your longer delay for animation
  };

  const cardVariants = {
    initial: { scale: 0.9, opacity: 0, y: 40 },
    animate: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { scale: 0.8, opacity: 0, y: -40, transition: { duration: 0.3 } },
  };

  if (!question || !question.options) {
    return <div>❌ No question data received</div>;
  }

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
        {/* SPARKLES - Keep your animation */}
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

        <motion.h2 layout="position" style={{ margin: 0, fontSize: 22 }}>
          {question.text}
        </motion.h2>

        {!isOpen && (
          <div style={{ marginTop: 10, color: "#6b6b6b" }}>Tap to choose</div>
        )}

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answers"
              layout
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  display: "grid",
                  gap: 10,
                  marginTop: 14,
                  padding: 10,
                }}
              >
                {question.options.map((opt: AnswerOption, optIndex: number) => (
                  <motion.button
                    key={opt.tag || `option-${optIndex}`}
                    whileHover={{ scale: 1.08 }} // Keep your stronger hover effect
                    whileTap={{ scale: 0.95 }} // Keep your stronger tap effect
                    transition={{ duration: 0.1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(opt.tag);
                    }}
                    style={{
                      textAlign: "center",
                      padding: "12px 14px",
                      borderRadius: 12,
                      border: "1px solid #e171cbff",
                      background: "#eec1e4ff",
                      fontSize: 17,
                      fontFamily: "serif",
                      cursor: "pointer",
                    }}
                  >
                    {(opt as any).answer || (opt as any).text || opt.tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}