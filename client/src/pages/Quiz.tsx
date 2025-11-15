import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentMood, addMoodToHistory } from "../features/moodSlice";
import { setGenre } from "../features/genreSlice";
import { calculateKDramaMood } from "../utils/kDramaMoodMapping";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import { Question } from "../types";

import questionsMood from "../data/questions_moods.json";
import questionsCharacter from "../data/questions_char.json";

type QuizMode = "mood" | "character" | "random";

export default function Quiz(): JSX.Element {
  const { mode = "mood" } = useParams<{ mode: QuizMode }>();
  
  const questions: Question[] = mode === "character" ? questionsCharacter : questionsMood;
  
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (answers.length === questions.length && !isComplete && mode === "mood") {
      setIsComplete(true);
      
      try {
        const result = calculateKDramaMood(answers);
        
        if (result && result.genreId) {
          // Dispatch to Redux
          dispatch(setCurrentMood(result.mood));
          dispatch(addMoodToHistory(result.mood));
          dispatch(setGenre({ genreId: result.genreId, mood: result.mood }));
          
          // Navigate to results
          setTimeout(() => {
            navigate("/results", { 
              state: { 
                mode: mode as QuizMode, 
                tagFromAnsw: answers
              } 
            });
          }, 500);
          
        } else {
          console.error("❌ [QUIZ] Invalid result from calculation:", result);
        }
      } catch (error) {
        console.error("💥 [QUIZ] Error in mood calculation:", error);
      }
    }
  }, [answers, questions.length, isComplete, mode, dispatch, navigate]);

  const handleAnswer = (tag: string): void => {
    // Add answer to our state
    const newAnswers = [...answers, tag];
    setAnswers(newAnswers);

    // Move to next question (if not the last one)
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  // Handle random mode - navigate directly to results
  useEffect(() => {
    if (mode === "random") {
      navigate("/results", { 
        state: { 
          mode: "random"
        } 
      });
    }
  }, [mode, navigate]);

  // Safety checks
  if (!questions || questions.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        marginTop: '100px',
        padding: '20px'
      }}>
        <h2>❌ Error: No questions loaded</h2>
        <p>Please try again or contact support.</p>
      </div>
    );
  }

  if (current >= questions.length) {
    return (
      <div style={{ 
        textAlign: 'center', 
        marginTop: '100px',
        padding: '20px'
      }}>
        <h2>✨ Quiz Complete!</h2>
        <p>Processing your results...</p>
      </div>
    );
  }

  const question: Question = questions[current];

  // Main quiz UI return - REMOVED ALL DEBUG INFO
  return (
    <div className="quiz-page">
      <ProgressBar progress={(answers.length / questions.length) * 100} />
      <QuestionCard {...({ question, onAnswer: handleAnswer } as any)} />
      
      {/* REMOVED THE DEBUG SECTION ENTIRELY */}
    </div>
  );
}