import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import "./styles.css";

// Define the quiz flow
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

// First selection screen
const firstOptions = ["Mood", "Character", "Random"];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepOrder, setStepOrder] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  // Handle user choice
  const handleSelect = (choice: string) => {
    let nextStep = choice;

    if (currentStep === 0) {
      // If Random is chosen, randomly pick a path
      if (choice === "Random")
        nextStep = Math.random() < 0.5 ? "Mood" : "Character";

      setStepOrder([nextStep]);
      setCurrentStep(1);
    } else {
      // Store answer and move to next step
      setAnswers([...answers, choice]);
      setCurrentStep(currentStep + 1);
    }
  };

  // Determine which card to show
  const getCurrentCard = () => {
    if (currentStep === 0)
      return { title: "Choose your destiny", options: firstOptions };
    const stepKey = stepOrder[currentStep - 1];
    return allSteps[stepKey as keyof typeof allSteps];
  };

  return (
    <motion.div className="app">
      <h1 className="title">K-Feels</h1>
      <div className="card-stack">
        {/* Decorative back cards */}
        {currentStep < 1 && (
          <>
            <motion.div
              className="card-back"
              style={{ top: 10, scale: 0.95 }}
            />
            <motion.div className="card-back" style={{ top: 20, scale: 0.9 }} />
          </>
        )}

        {/* Active quiz card */}
        <Card
          step={currentStep + 1}
          title={getCurrentCard().title}
          options={getCurrentCard().options}
          onSelect={handleSelect}
        />
      </div>
    </motion.div>
  );
};

export default App;
