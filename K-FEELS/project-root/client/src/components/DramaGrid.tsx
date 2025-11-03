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
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "16px",
        padding: "20px",
      }}
    >
      {dramas.map((drama) => (
        <DramaCard key={drama.id} {...drama} />
      ))}
    </div>
  );
}
