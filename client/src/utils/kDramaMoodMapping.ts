export interface MoodWeight {
  [mood: string]: number;
}

// K-drama genre IDs from your TMDB controller
export const kDramaGenres = {
  10759: "Action & Adventure",
  16: "Animation", 
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk", 
  10768: "War & Politics",
  37: "Western",
  10749: "Romance",
};

// Map quiz answer tags to K-drama moods with genre weights
export const tagToGenreMoodWeights: { [tag: string]: MoodWeight } = {
  "romantic": { 
    "romance": 0.95,
    "drama": 0.8,
    "comedy": 0.3
  },
  "melancholic": { 
    "drama": 0.95,
    "melodrama": 0.9,
    "emotional": 0.7
  },
  "comedy": { 
    "comedy": 0.95,
    "light": 0.8,
    "rom-com": 0.6
  },
  "drama": { 
    "drama": 0.95,
    "melodrama": 0.8,
    "emotional": 0.7
  },
  "action": { 
    "action": 0.95,
    "adventure": 0.8,
    "thriller": 0.6
  },
  "family": { 
    "family": 0.95,
    "slice-of-life": 0.8,
    "wholesome": 0.7
  },
  "crime": { 
    "crime": 0.9,
    "mystery": 0.8,
    "thriller": 0.7
  },
  "fantasy": { 
    "fantasy": 0.95,
    "sci-fi": 0.8,
    "adventure": 0.6
  }
};

// Map moods to TMDB genre IDs
export const moodToGenreId: { [mood: string]: number } = {
  "romance": 18,        // Drama
  "drama": 18,          // Drama
  "comedy": 35,         // Comedy
  "action": 10759,      // Action & Adventure
  "adventure": 10759,   // Action & Adventure
  "family": 10751,      // Family
  "crime": 80,          // Crime
  "mystery": 9648,      // Mystery
  "fantasy": 10765,     // Sci-Fi & Fantasy
  "sci-fi": 10765,      // Sci-Fi & Fantasy
  "melodrama": 18,      // Drama
  "emotional": 18,      // Drama
  "rom-com": 35,        // Comedy
  "light": 35,          // Comedy
  "thriller": 80,       // Crime
  "slice-of-life": 18,  // Drama
  "wholesome": 10751    // Family
};

export const calculateKDramaMood = (tags: string[]): { mood: string; genreId: number } => {
  console.log("🏷️ [MAPPING] calculateKDramaMood called with tags:", tags);
  
  if (!tags || tags.length === 0) {
    console.log("🏷️ [MAPPING] No tags, returning default");
    return { mood: "drama", genreId: 18 };
  }

  const moodScores: { [mood: string]: number } = {};

  // Process each tag
  tags.forEach((tag, index) => {
    console.log(`🏷️ [MAPPING] Processing tag ${index + 1}: "${tag}"`);
    
    if (tagToGenreMoodWeights[tag]) {
      const weights = tagToGenreMoodWeights[tag];
      console.log(`🏷️ [MAPPING] Found weights for "${tag}":`, weights);
      
      Object.entries(weights).forEach(([mood, weight]) => {
        moodScores[mood] = (moodScores[mood] || 0) + weight;
        console.log(`🏷️ [MAPPING] Added ${weight} to mood "${mood}" (total: ${moodScores[mood]})`);
      });
    } else {
      console.warn(`🏷️ [MAPPING] ⚠️ No mapping found for tag: "${tag}"`);
    }
  });

  console.log("🏷️ [MAPPING] Final mood scores:", moodScores);

  // Find highest scoring mood
  const sortedMoods = Object.entries(moodScores).sort((a, b) => b[1] - a[1]);
  
  if (sortedMoods.length === 0) {
    console.log("🏷️ [MAPPING] No scores, returning default");
    return { mood: "drama", genreId: 18 };
  }

  const topMood = sortedMoods[0][0];
  console.log("🏷️ [MAPPING] Top mood:", topMood);

  const genreId = moodToGenreId[topMood];
  console.log("🏷️ [MAPPING] GenreId for mood:", genreId);

  if (!genreId) {
    console.error(`🏷️ [MAPPING] No genreId for mood: "${topMood}"`);
    return { mood: topMood, genreId: 18 };
  }

  const result = { mood: topMood, genreId };
  console.log("🏷️ [MAPPING] ✅ Final result:", result);
  
  return result;
};