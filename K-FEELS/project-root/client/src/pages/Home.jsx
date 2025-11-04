import React from "react";

const Favorites = () => {
  // Sample favorite moods data
  const favoriteMoods = [
    { id: 1, mood: "Happy" },
    { id: 2, mood: "Relaxed" },
    { id: 3, mood: "Excited" },
  ];

  return (
    <div>
      <h1>Your Favorite Moods</h1>
      <ul>
        {favoriteMoods.map((favorite) => (
          <li key={favorite.id}>{favorite.mood}</li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;

//<Card title="By Mood" onClick={() => navigate("/quiz?type=mood")} />
