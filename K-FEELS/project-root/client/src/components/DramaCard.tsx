//represents a single drama card from the list
import React from "react";

interface DramaCardProp {
  id: number;
  title: string;
  year?: string | number;
  image?: string;
  tags?: string[];
  onClick?: () => void;
}

export default function DramaCard({
  id,
  title,
  year,
  image,
  tags,
  onClick,
}: DramaCardProp) {
  return (
    <div
      onClick={onClick}
      style={{
        width: "180px",
        borderRadius: "10px",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
        }}
      />
      <h4>
        {title}
        {year}
      </h4>
    </div>
  );
}
