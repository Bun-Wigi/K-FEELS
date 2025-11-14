//display a grid cards on the result page. shows 6 cards with poster, title, year. clicking a card could open details or add it to favorite

import DramaCard from "./DramaCard";
import type { Drama } from "../types";

interface DramaGridProps {
  dramas: Drama[];
}

export default function DramaGrid({ dramas }: DramaGridProps) {
  if (!dramas || dramas.length === 0) {
    return <p>No dramas found</p>;
  }
  
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)", // EXACTLY 6 columns
        gap: "20px", // GOOD spacing for 6 cards
        width: "100%",
        maxWidth: "100%",
        margin: "0",
        padding: "0",
        boxSizing: "border-box"
      }}
    >
      {dramas.map((d: any) => (
        <div 
          key={d.id}
          style={{
            overflow: "hidden",
            boxSizing: "border-box"
          }}
        >
          <DramaCard
            id={d.id}
            title={d.title || d.name || 'Unknown Title'}
            year={d.year || d.first_air_date?.split('-')[0] || 'Unknown'}
            image={d.image}
            poster={d.poster}
            poster_path={d.poster_path}
          />
        </div>
      ))}
    </div>
  );
}
