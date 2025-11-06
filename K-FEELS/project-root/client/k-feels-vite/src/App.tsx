import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./Navbar";
import Card from "./Card";
import Results from "./Results";
import Auth from "./Auth";
import { useAppDispatch } from '../../hooks/hooks';
import { searchKDramas, fetchPopularKDramas } from './features/tmdbSlice';
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

const QuizFlow: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepOrder, setStepOrder] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Map mood and character combinations to search queries
  const getSearchQuery = (answers: string[]) => {
    const mood = answers.find(a => ["Happy 😊", "Sad 😢", "Excited 🤩"].includes(a));
    const character = answers.find(a => ["Hero 🦸‍♂️", "Villain 🦹‍♀️", "Sidekick 🧙‍♂️"].includes(a));

    if (mood === "Happy 😊" && character === "Hero 🦸‍♂️") {
      return "romantic comedy korean drama";
    } else if (mood === "Sad 😢") {
      return "melodrama korean drama";
    } else if (mood === "Excited 🤩" || character === "Villain 🦹‍♀️") {
      return "action thriller korean drama";
    } else if (character === "Sidekick 🧙‍♂️") {
      return "friendship comedy korean drama";
    }
    
    return "popular korean drama";
  };

  // Handle user choice
  const handleSelect = (choice: string) => {
    let nextStep = choice;

    if (currentStep === 0) {
      if (choice === "Random") {
        nextStep = Math.random() < 0.5 ? "Mood" : "Character";
        dispatch(fetchPopularKDramas());
        setShowResults(true);
        return;
      }

      setStepOrder([nextStep]);
      setCurrentStep(1);
    } else {
      const newAnswers = [...answers, choice];
      setAnswers(newAnswers);
      
      if (currentStep >= stepOrder.length) {
        const query = getSearchQuery(newAnswers);
        setSearchQuery(query);
        dispatch(searchKDramas(query));
        setShowResults(true);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setStepOrder([]);
    setAnswers([]);
    setShowResults(false);
    setSearchQuery('');
  };

  const getCurrentCard = () => {
    if (currentStep === 0)
      return { title: "Choose your destiny", options: firstOptions };
    const stepKey = stepOrder[currentStep - 1];
    return allSteps[stepKey as keyof typeof allSteps];
  };

  if (showResults) {
    return (
      <motion.div className="app">
        <div className="results-container">
          <h1 className="title">Your K-Drama Recommendations</h1>
          
          <div className="quiz-summary">
            <p>Based on your choices: {answers.join(', ')}</p>
            <button onClick={resetQuiz} className="reset-btn">
              Take Quiz Again
            </button>
          </div>
          
          <Results searchQuery={searchQuery} loadPopular={!searchQuery} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="app">
      <h1 className="title">K-Feels</h1>
      <div className="card-stack">
        {currentStep < 1 && (
          <>
            <motion.div className="card-back" style={{ top: 10, scale: 0.95 }} />
            <motion.div className="card-back" style={{ top: 20, scale: 0.9 }} />
          </>
        )}

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

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<QuizFlow />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Navigate to="/auth" replace />} />
            <Route path="/register" element={<Navigate to="/auth" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
