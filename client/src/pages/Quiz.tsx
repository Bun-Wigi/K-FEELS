import { useLocation, Link } from "react-router-dom";
import dramas from "../data/drama.json";
import DramaGrid from "../components/DramaGrid";
import { useState } from "react";

export default function Results() {
  const characterImg: Record<string, string> = {
    main: "/characters/main.jpg",
    detective: "/characters/detective.jpg",
    prince: "/characters/prince.jpg",
    girlboss: "/characters/girlboss.jpg",
    softie: "/characters/softie.jpg",
    sidekick: "/characters/sidekick.jpg",
    villian: "/characters/villain.jpg",
  };

  const location = useLocation();
  const state = location.state || {};
  const { mode, tagFromAnsw = [], picks = [] } = state;

  let list: typeof dramas = [];
  let topTag: string | null = null;

  if (mode === "random") {
    list = picks;
  } else if (tagFromAnsw.length > 0) {
    const counts = tagFromAnsw.reduce((acc: Record<string, number>, tag: string) => {
      acc[tag] = (acc[tag] ?? 0) + 1;
      return acc;
    }, {});

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    topTag = sorted[0][0];
    list = dramas.filter((oneDrama) => oneDrama.tags.includes(topTag));
  }

  const charPicture = mode === "character" && topTag ? characterImg[topTag] : undefined;

  // Sparkle state for button
  const [sparkles, setSparkles] = useState<{ id: number; angle: number }[]>([]);

  const triggerButtonSparkle = () => {
    const s = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      angle: (i / 8) * 360,
    }));
    setSparkles(s);
    setTimeout(() => setSparkles([]), 600);
  };

  return (
    <div className="result-page" style={{ maxWidth: 960, margin: "0 auto", padding: 24, textAlign: "center" }}>
      <h2 style={{ marginBottom: 20 }}>
        {mode === "mood" && topTag
          ? `Your mood today is: ${topTag.toUpperCase()}`
          : mode === "character" && topTag
            ? `Your character type is: ${topTag.toUpperCase()}`
            : "Random pick"}
      </h2>

      {charPicture && (
        <img
          src={charPicture}
          alt={topTag ?? "character"}
          style={{
            width: "250px",
            height: "330px",
            borderRadius: "12px",
            objectFit: "cover",
            boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
            marginBottom: "20px",
          }}
        />
      )}

      {list.length > 0 ? <DramaGrid dramas={list.slice(0, 6)} /> : <p>No matches. Try again.</p>}

      {/* Back Home Button */}
      <div style={{ marginTop: 30, display: "inline-block", position: "relative" }}>
        <div className="sparkle-container">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="sparkle"
              style={{ transform: `rotate(${s.angle}deg) translateY(-25px)` }}
            />
          ))}
        </div>
        <Link
          to="/"
          className="back-home"
          onClick={triggerButtonSparkle}
          style={{ position: "relative", zIndex: 1 }}
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
