import "dotenv/config"; // Load .env variables

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Helper function to fetch from TMDB using API key
const fetchFromTMDB = async (url) => {
  const response = await fetch(`${url}&api_key=${TMDB_API_KEY}`);

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  return response.json();
};

// GET /api/kdramas - popular K-dramas
export const getKoreanDramas = async (req, res) => {
  try {
    const url =
      "https://api.themoviedb.org/3/tv/popular?language=ko-KR&region=KR&page=1";
    const data = await fetchFromTMDB(url);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching K-dramas:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch K-dramas", error: error.message });
  }
};

// GET /api/kdramas/search?query=<title> - search K-dramas
export const searchKdramas = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query)
      return res.status(400).json({ message: "Query parameter is required" });

    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      query
    )}&language=ko-KR`;
    const data = await fetchFromTMDB(url);

    // Filter results to only TV shows (K-dramas)
    const dramas = data.results.filter((item) => item.media_type === "tv");

    res.status(200).json(dramas);
  } catch (error) {
    console.error("Error searching K-dramas:", error.message);
    res
      .status(500)
      .json({ message: "Failed to search K-dramas", error: error.message });
  }
};
