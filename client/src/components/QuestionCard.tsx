import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question, AnswerOption } from "../types";

interface Props {
  question: Question;
  onAnswer: (tag: string) => void;
}

export default function QuestionCard({ question, onAnswer }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (tag: string): void => {
    setIsOpen(false);
    setTimeout(() => onAnswer(tag), 220);
  };

  if (!question || !question.options) {
    return <div>❌ No question data received</div>;
  }

  return (
    <motion.div layout>
      <motion.div
        layout
        onClick={() => setIsOpen((v) => !v)}
        style={{
          cursor: "pointer",
          padding: "12px 8px",
          borderRadius: 12,
          background: isOpen ? "#f4f0ff" : "#f6f7fb",
        }}
      >
        <motion.h2 layout="position" style={{ margin: 0, fontSize: 22 }}>
          {question.text}
        </motion.h2>

        {!isOpen && (
          <div style={{ marginTop: 10, color: "#6b6b6b" }}>Tap to choose</div>
        )}
      </motion.div>

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
              {question.options.map((opt: AnswerOption, index: number) => (
                <motion.button
                  key={opt.tag || `option-${index}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
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
  );
}