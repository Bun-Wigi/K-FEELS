//for quiz, in Home, quizSlice
export type Mode = "mood" | "character";

//one user's answer, in QuestionCard
export interface AnswerOption {
  answer: string;  // ← Since your data uses 'answer' not 'text'
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
  mood: any; // your existing mood state
  genre: {
    currentGenreId: number | null;
    calculatedMood: string | null;
  };
  kdrama: {
    recommendations: Drama[];
    status: string;
    error: string | null;
  };
  auth: {
    isAuthenticated: boolean;
    user: any;
  };
}
