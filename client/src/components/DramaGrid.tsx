//display a grid cards on the result page. shows 6 cards with poster, title, year. clicking a card could open details or add it to favorite

import DramaCard from "./DramaCard";
import type { Drama } from "../types";

interface DramaGridProps {
  dramas: Drama[];
}

export default function DramaGrid({ dramas }: DramaGridProps) {
  if (!dramas || dramas.length === 0) {
    return <p>not found</p>;
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "16px",
        maxWidth: 960,
        margin: "0 auto",
      }}
    >
      {dramas.map((d) => (
        <DramaCard
          key={d.id}
          id={d.id}
          title={d.title}
          year={d.year}
          image={d.image} // если вдруг есть
          poster={d.poster} // если вдруг есть полный URL
          poster_path={d.poster_path}
        />
      ))}
    </div>
  );
}
