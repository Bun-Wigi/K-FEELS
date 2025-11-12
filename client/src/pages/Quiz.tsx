import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { questionsCharacter } from "../data/questions_char";
import { questionsMood } from "../data/questions_mood";
import { useNavigate, useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

export default function Quiz() {
  //get mode parameters from url
  const { mode = "mood" } = useParams();

  //choose wich set of quesions to use based on mode
  const questions = mode === "character" ? questionsCharacter : questionsMood;

  //keep track og wich question index is currentry shown
  const [current, setCurrent] = useState(0);

  //keep track of all user's selected answers (arr of tags)
  const [tagFromAnsw, setTagFromAnsw] = useState([]);

  //reacy hook to navigate between pages
  const navigate = useNavigate();

  //fn runs every time user selects answ
  const handleAnswer = (tag:any) => {
    //add new answ tag to the arr, tagFromAnsw-prev answ, tag-current
    const next = [...tagFromAnsw, tag];
    setTagFromAnsw(next);

    //check if this is the lst quest
    const isLast = current === questions.length - 1;

    //if so go to the result page
    if (isLast) {
      //pass mode and all tags from answers using navigate state
      navigate("/results", { state: { mode, tagFromAnsw: next } });
    } else {
      setCurrent((c) => c + 1); // to the next question
    }
  };

  //get current question obj to display
  const question = questions[current];

  return (
    <div className="quiz-page">
      {/* Progress bar showing how far the user is */}
      <ProgressBar progress={current / questions.length} />
      {/* Question card — shows question text and options */}
      <QuestionCard question={question} onAnswer={handleAnswer} />
    </div>
  );
}
