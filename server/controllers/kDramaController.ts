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

// GET /api/kdramas - Get top 10 popular Korean dramas
export const getKoreanDramas = async (req: Request, res: Response): Promise<any> => {
  try {
    const genreId = req.query.genreId ? parseInt(req.query.genreId as string) : null;

    // Build TMDB API URL
    let url = `https://api.themoviedb.org/3/discover/tv?language=ko-KR&region=KR&with_original_language=ko&sort_by=popularity.desc&page=1`;

    // Add genre filter if provided
    if (genreId) {
      url += `&with_genres=${genreId}`;
    }

    // Fetch data from TMDB
    const data = await fetchFromTMDB(url);

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

// GET /api/kdramas/search?query=<title> - Search for K-dramas by title
export const searchKdramas = async (req: Request, res: Response): Promise<any> => {
  try {
    const query = req.query.query as string;
    const genreId = req.query.genreId ? parseInt(req.query.genreId as string) : null;

    // Validate query parameter
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Build TMDB search URL
    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&language=ko-KR`;
    const data = await fetchFromTMDB(url);

    // Filter for TV shows only
    let dramas = data.results.filter((item: any) => item.media_type === "tv");

    // Filter by genre if provided
    if (genreId) {
      dramas = dramas.filter((show: any) => show.genre_ids.includes(genreId));
    }

    // Add genre names to each show
    const results = dramas.slice(0, 10).map((show: any) => ({
      ...show,
      genre_names: show.genre_ids.map((id: number) => GENRES[id] || "Unknown"),
    }));

    res.status(200).json(results);
  } catch (error: any) {
    console.error("Error searching K-dramas:", error.message);
    res.status(500).json({ 
      message: "Failed to search K-dramas", 
      error: error.message 
    });
  }
};
