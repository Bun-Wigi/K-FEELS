//reflect one question and answers's options

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "../types";

interface Props {
  question: Question; // { id, text, options: [{answer, tag}] }

  //callback to parent Quiz when user picks answer
  onAnswer: (tag: string) => void; // save a certain tag
}

export default function QuestionCard({ question, onAnswer }: Props) {
  //expand animation
  const [isOpen, setIsOpen] = useState(false);

  //fn that handlers user answer
  const handleSelect = (tag: string) => {
    //collapse block first
    setIsOpen(false);
    // wait for animation to finish and call parent handler
    setTimeout(() => onAnswer(tag), 220);
  };

  return (
    <motion.div layout>
      {/*header section clickable*/}
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
        {/*question text*/}
        <motion.h2 layout="position" style={{ margin: 0, fontSize: 22 }}>
          {question.text}
        </motion.h2>

        {/*hint top to choose*/}
        {!isOpen && (
          <div style={{ marginTop: 10, color: "#6b6b6b" }}>Tap to choose</div>
        )}
      </motion.div>

      {/* expandable area with questions */}
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
            {/*container for all answers*/}
            <div
              style={{
                display: "grid",
                gap: 10,
                marginTop: 14,
              }}
            >
              {question.options.map((opt) => (
                <motion.button
                  key={opt.tag}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent click from collapsing card
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
                  {/*answer's text*/}
                  {opt.answer}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
