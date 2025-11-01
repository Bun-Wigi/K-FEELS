//display a grid cards on the result page. shows 6 cards with poster, title, year. clicking a card could open details or add it to favorite
import React from "react";
import DramaCard from "./DramaCard";

export default function DramaGrid() {
  const dramas = [
    {
      id: 1,
      title: "Crash landing on you",
      image: "/image/crash.jpg",
      tags: ["romantic", "drama"],
    },
    {
      id: 2,
      title: "Business Proposal",
      image: "images/business.ipg",
      tags: ["romcom"],
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "16px",
        padding: "20px",
      }}
    >
      {dramas.map((drama, i) => (
        <DramaCard key={i} {...drama} />
      ))}
    </div>
  );
}
