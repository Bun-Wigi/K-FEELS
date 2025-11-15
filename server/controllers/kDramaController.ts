import { Request, Response } from 'express';
import "dotenv/config";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Genre IDs from TMDB API
const GENRES: { [key: number]: string } = {
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

// Helper function to fetch data from TMDB API
const fetchFromTMDB = async (url: string): Promise<any> => {
  const response = await fetch(`${url}&api_key=${TMDB_API_KEY}`);
  
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  
  return response.json();
};

// GET /api/kdramas - Get top 10 popular Korean dramas with English metadata
export const getKoreanDramas = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("🔍 Backend received query params:", req.query);
    
    const genreId = req.query.genreId ? parseInt(req.query.genreId as string) : null;
    const genreIds = req.query.genreIds ? (req.query.genreIds as string).split(',').map(id => parseInt(id.trim())) : null;

    console.log("🔍 Parsed genreId:", genreId);
    console.log("🔍 Parsed genreIds:", genreIds);

    // Updated to use en-US language for English results while keeping Korean content
    let url = `https://api.themoviedb.org/3/discover/tv?language=en-US&region=KR&with_original_language=ko&sort_by=popularity.desc&page=1`;

    let genreFilter = '';
    
    if (genreIds) {
      const ids = genreIds; // already a number[] from earlier parsing
      // Multiple genres - show dramas that match ANY of these genres
      genreFilter = `&with_genres=${ids.join('|')}`; // Use | for OR logic
      console.log(`🎬 Multiple genres filter: ${genreFilter}`);
    } else if (genreId) {
      // Single genre - make sure this works for romance (10749)
      genreFilter = `&with_genres=${genreId}`;
      console.log(`🎬 Single genre filter: ${genreFilter}`);
    }

    // Add the full URL to the base API call
    url += genreFilter;
    console.log(`📡 Final TMDB URL: ${url}`);

    // Fetch data from TMDB
    const data = await fetchFromTMDB(url);
    console.log(`✅ TMDB returned ${data.results?.length || 0} results`);

    // Add genre names to each show
    const results = data.results.slice(0, 10).map((show: any) => ({
      ...show,
      genre_names: show.genre_ids.map((id: number) => GENRES[id] || "Unknown"),
    }));

    res.status(200).json(results);
  } catch (error: any) {
    console.error("Error fetching popular K-dramas:", error.message);
    res.status(500).json({
      message: "Failed to fetch popular K-dramas",
      error: error.message,
    });
  }
};

// GET /api/kdramas/search?query=<title>&genreId=<optional> - Search for K-dramas by title
export const searchKdramas = async (req: Request, res: Response): Promise<any> => {
  try {
    const query = req.query.query as string;
    const genreId = req.query.genreId ? parseInt(req.query.genreId as string) : null;

    // Validate query parameter
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    let results: any[] = [];

    // Use discover endpoint with keyword search for better Korean content filtering
    // First, search for the keyword to get keyword ID
    try {
      const keywordUrl = `https://api.themoviedb.org/3/search/keyword?query=${encodeURIComponent(query)}&language=en-US`;
      const keywordData = await fetchFromTMDB(keywordUrl);
      
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
    } catch (keywordError) {
      console.log("Keyword search failed, proceeding with fallback");
    }

    // Fallback: if no keyword results, try direct search but filter for Korean content
    if (results.length === 0) {
      const searchUrl = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&language=en-US`;
      const searchData = await fetchFromTMDB(searchUrl);
      
      // Filter for Korean content (original_language should be 'ko')
      results = searchData.results.filter((item: any) => 
        item.original_language === 'ko' || 
        item.origin_country?.includes('KR')
      );
    }

    // Apply genre filter if specified
    if (genreId && results.length > 0) {
      results = results.filter((show: any) => show.genre_ids?.includes(genreId));
    }

    // Add genre names to each show
    const finalResults = results.slice(0, 10).map((show: any) => ({
      ...show,
      genre_names: show.genre_ids?.map((id: number) => GENRES[id] || "Unknown") || [],
    }));

    res.status(200).json(finalResults);
  } catch (error: any) {
    console.error("Error searching K-dramas:", error.message);
    res.status(500).json({ 
      message: "Failed to search K-dramas", 
      error: error.message 
    });
  }
};
