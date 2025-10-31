import React, { useState } from "react";
import Card from "./Card";
import { AnimatePresence } from "framer-motion";
import "./styles.css";

const allSteps = {
  Mood: { title: "Choose your mood", options: ["Happy", "Sad", "Excited"] },
  Character: {
    title: "Choose a character",
    options: ["Hero", "Villain", "Sidekick"],
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
      // First card logic
      if (choice === "Random") {
        nextStep = Math.random() < 0.5 ? "Mood" : "Character";
      }
      setStepOrder([nextStep]);
      setCurrentStep(1);
    } else {
      // Subsequent card
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
    <div className="app">
      <h1>K-Feels</h1>
      <AnimatePresence mode="wait">
        <Card
          key={currentStep}
          step={currentStep + 1}
          title={getCurrentCard().title}
          options={getCurrentCard().options}
          onSelect={handleSelect}
        />
      </AnimatePresence>
    </div>
  );
};

export default App;
