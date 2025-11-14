import "dotenv/config";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const GENRES = {
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

// Helper function to fetch from TMDB
const fetchFromTMDB = async (url) => {
  const response = await fetch(`${url}&api_key=${TMDB_API_KEY}`);
  if (!response.ok) throw new Error(`TMDB API error: ${response.status}`);
  return response.json();
};

// GET /api/kdramas - Top 10 popular Korean dramas with English metadata
export const getKoreanDramas = async (req, res) => {
  try {
    const genreId = parseInt(req.query.genreId);

    // Updated to use en-US language for English results
    let url = `https://api.themoviedb.org/3/discover/tv?language=en-US&region=KR&with_original_language=ko&sort_by=popularity.desc&page=1`;

    if (genreId) {
      url += `&with_genres=${genreId}`;
    }

    const data = await fetchFromTMDB(url);

    const results = data.results.slice(0, 10).map((show) => ({
      ...show,
      genre_names: show.genre_ids.map((id) => GENRES[id] || "Unknown"),
    }));

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching popular K-dramas:", error.message);
    res
      .status(500)
      .json({
        message: "Failed to fetch popular K-dramas",
        error: error.message,
      });
  }
};

// GET /api/kdramas/search?query=<title>&genreId=<optional>
export const searchKdramas = async (req, res) => {
  try {
    const query = req.query.query;
    const genreId = parseInt(req.query.genreId);

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Use discover endpoint with keyword search for better Korean content filtering
    // First, search for the keyword to get keyword ID
    const keywordUrl = `https://api.themoviedb.org/3/search/keyword?query=${encodeURIComponent(query)}&language=en-US`;
    const keywordData = await fetchFromTMDB(keywordUrl);
    
    let results = [];

    // If keywords found, use discover with keyword
    if (keywordData.results && keywordData.results.length > 0) {
      const keywordId = keywordData.results[0].id;
      let discoverUrl = `https://api.themoviedb.org/3/discover/tv?language=en-US&with_original_language=ko&with_keywords=${keywordId}&sort_by=popularity.desc`;
      
      if (genreId) {
        discoverUrl += `&with_genres=${genreId}`;
      }

      const discoverData = await fetchFromTMDB(discoverUrl);
      results = discoverData.results;
    }

    // Fallback: if no keyword results, try direct search but filter for Korean content
    if (results.length === 0) {
      const searchUrl = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&language=en-US`;
      const searchData = await fetchFromTMDB(searchUrl);
      
      // Filter for Korean content (original_language should be 'ko')
      results = searchData.results.filter(item => 
        item.original_language === 'ko' || 
        item.origin_country?.includes('KR')
      );
    }

    // Apply genre filter if specified
    if (genreId && results.length > 0) {
      results = results.filter((show) => show.genre_ids?.includes(genreId));
    }

    const finalResults = results.slice(0, 10).map((show) => ({
      ...show,
      genre_names: show.genre_ids?.map((id) => GENRES[id] || "Unknown") || [],
    }));

    res.status(200).json(finalResults);
  } catch (error) {
    console.error("Error searching K-dramas:", error.message);
    res
      .status(500)
      .json({ message: "Failed to search K-dramas", error: error.message });
  }
};
