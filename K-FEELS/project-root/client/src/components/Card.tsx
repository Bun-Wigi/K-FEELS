//base card for any content(question, movies). Defines shape, size, animation(Home, Quiz)
import React from "react";

interface CardProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

export default function Card({ title, description, onClick }: CardProps) {
  return (
    <div onClick={onClick} style={{}}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
