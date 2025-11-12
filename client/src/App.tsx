// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <div style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:mode" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
