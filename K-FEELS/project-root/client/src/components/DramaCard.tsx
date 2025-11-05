//represents a single drama card from the list
import React from "react";

const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

interface DramaCardProp {
  id: number;
  title: string;
  year?: string | number;
  image?: string; // полный URL (если есть)
  poster?: string; // полный URL (если есть)
  poster_path?: string; // путь от TMDB (начинается с /)
  tags?: string[];
  onClick?: () => void;
}

export default function DramaCard({
  id,
  title,
  year,
  image,
  poster,
  poster_path,
  tags,
  onClick,
}: DramaCardProp) {
  const src =
    image ||
    poster ||
    (poster_path ? TMDB_IMG + poster_path : "/posters/placeholder.jpg");

  return (
    <div
      onClick={onClick}
      style={{
        width: "200px",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <img
        src={src}
        alt={title}
        style={{
          width: "100%",
          height: "260px",
          objectFit: "cover",
          display: "block",
          background: "#eee",
        }}
      />
      <div
        style={{
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "70px",
        }}
      >
        <h4
          style={{
            fontSize: "15px",
            fontWeight: 600,
            margin: 0,
            color: "#333",
            lineHeight: "1.2",
          }}
        >
          {title}
          {year}
        </h4>
      </div>
    </div>
  );
}
