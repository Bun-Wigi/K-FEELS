// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import AnimatedCard from "../components/AnimatedCard";
import dramas from "../data/drama.json";
import "../index.css";

export default function Home() {
  const navigate = useNavigate();

  const options = [
    { label: "By mood", value: "mood" },
    { label: "By character", value: "character" },
    { label: "Random movie", value: "random" },
  ];

  const onSelect = (value) => {
    if (value === "mood") return navigate("/quiz/mood");
    if (value === "character") return navigate("/quiz/character");
    if (value === "random") {
      const pick = dramas[Math.floor(Math.random() * dramas.length)];
      return navigate("/results", { state: { mode: "random", picks: [pick] } });
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <div style={{ marginTop: 24 }}>
        <AnimatedCard
          step={1}
          title="Choose how to get a drama"
          options={options}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}
