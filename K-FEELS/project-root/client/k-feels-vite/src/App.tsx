import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Card from "./Card";
import "./styles.css";

const allSteps = {
  Mood: {
    title: "Choose your mood",
    options: ["Happy 😊", "Sad 😢", "Excited 🤩"],
  },
  Character: {
    title: "Choose a character",
    options: ["Hero 🦸‍♂️", "Villain 🦹‍♀️", "Sidekick 🧙‍♂️"],
  },
};

const firstOptions = ["Mood", "Character", "Random"];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepOrder, setStepOrder] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSelect = (choice: string) => {
    let nextStep = choice;

    if (currentStep === 0) {
      if (choice === "Random") {
        nextStep = Math.random() < 0.5 ? "Mood" : "Character";
      }
      setStepOrder([nextStep]);
      setCurrentStep(1);
    } else {
      setAnswers([...answers, choice]);
      setCurrentStep(currentStep + 1);
    }
  };

  const getCurrentCard = () => {
    if (currentStep === 0) {
      return { title: "Choose your destiny", options: firstOptions };
    }
    const stepKey = stepOrder[currentStep - 1];
    return allSteps[stepKey as keyof typeof allSteps];
  };

  return (
    <motion.div
      className="app"
      animate={{
        backgroundColor: answers.includes("Happy 😊")
          ? "#ffe6f0"
          : answers.includes("Sad 😢")
          ? "#d0e0f5"
          : "#fff0f5",
      }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="title">K-Feels</h1>

      <div className="card-stack">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1.2, 0.95, 1], opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            layout
          >
            <Card
              step={currentStep + 1}
              title={getCurrentCard().title}
              options={getCurrentCard().options}
              onSelect={handleSelect}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default App;
