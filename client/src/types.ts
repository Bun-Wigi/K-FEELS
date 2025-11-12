//for quiz, in Home, quizSlice
export type Mode = "mood" | "character";

//one user's answer, in QuestionCard
export interface AnswerOption {
  answer: string;
  tag: string;
}

//one question, in Quiz, quizSlice
export interface Question {
  id: number;
  text: string;
  options: AnswerOption[];
}

//in DramaCard, Resulrs
export interface Drama {
  id: number;
  title: string;
  year?: string | number;
  image?: string;
  poster?: string;
  poster_path?: string;
  tags?: string[];
}

//for quiz in redux
export interface QuizState {
  mode: Mode | null;
  step: number;
  answer: string[];
  question: Question[];
}

export interface RecommendationState {
  recs: Drama[];
}

//for root Redux
export interface RootState {
  quiz: QuizState;
  recs: RecommendationState;
}

export interface CharImage {
  main: String,
  detective: String, 
  prince: String, 
  girlboss: String, 
  sidekick: String, 
  villian: String,
  softie: String,
}
