import express, { Request, Response } from "express";
import {
  getMoods,
  createMood,
  getMoodById,
  updateMood,
  deleteMood,
} from "../controllers/moodController.js";

const router = express.Router();

// Mood routes
router.get("/moods", getMoods);
router.post("/moods", createMood);
router.get("/moods/:id", getMoodById);
router.put("/moods/:id", updateMood);
router.delete("/moods/:id", deleteMood);

// Add the recommendations route with randomization
router.get('/recommendations', async (req: Request, res: Response) => {
  try {
    const { genreId } = req.query;
    console.log('🎬 [SERVER] Recommendations requested for genreId:', genreId);
    
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    
    if (!TMDB_API_KEY) {
      console.error('❌ [SERVER] TMDB_API_KEY not found in environment variables');
      return res.status(500).json({ error: 'TMDB API key not configured' });
    }
    
    const allResults: any[] = [];
    
    if (genreId === 'null' || genreId === null || !genreId) {
      // RANDOM MODE - Fetch more pages for maximum variety
      console.log('🎲 [SERVER] Random mode - fetching 5 pages for maximum variety...');
      const pages = [1, 2, 3, 4, 5]; // Up to 100 dramas
      
      for (const page of pages) {
        // NO GENRE FILTER - just Korean TV shows
        const url = `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&with_origin_country=KR&original_language=ko&sort_by=popularity.desc&page=${page}`;
        
        console.log(`🎲 [SERVER] Fetching random page ${page}...`);
        
        try {
          const response = await fetch(url);
          
          if (!response.ok) {
            console.warn(`⚠️ [SERVER] Random page ${page} failed: ${response.status}`);
            continue;
          }
          
          const data = await response.json() as unknown;
          if (data && typeof data === 'object' && 'results' in data) {
            const results = (data as { results?: unknown }).results;
            if (Array.isArray(results)) {
              allResults.push(...(results as any[]));
              console.log(`✅ [SERVER] Random page ${page}: ${results.length} dramas added`);
            }
          }
        } catch (pageError) {
          console.warn(`⚠️ [SERVER] Error fetching random page ${page}:`, pageError);
          continue;
        }
      }
    } else {
      // MOOD MODE - Fetch 3 pages with genre filter
      console.log('🎭 [SERVER] Mood mode - fetching 3 pages with genre filter...');
      const pages = [1, 2, 3];
      
      for (const page of pages) {
        const url = `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&with_genres=${genreId}&with_origin_country=KR&original_language=ko&sort_by=popularity.desc&page=${page}`;
        
        console.log(`🎭 [SERVER] Fetching mood page ${page}...`);
        
        try {
          const response = await fetch(url);
          
          if (!response.ok) {
            console.warn(`⚠️ [SERVER] Mood page ${page} failed: ${response.status}`);
            continue;
          }
          
          const data = await response.json() as unknown;
          if (data && typeof data === 'object' && 'results' in data) {
            const results = (data as { results?: unknown }).results;
            if (Array.isArray(results)) {
              allResults.push(...(results as any[]));
              console.log(`✅ [SERVER] Mood page ${page}: ${results.length} dramas added`);
            }
          }
        } catch (pageError) {
          console.warn(`⚠️ [SERVER] Error fetching mood page ${page}:`, pageError);
          continue;
        }
      }
    }
    
    console.log(`🎬 [SERVER] Total dramas fetched: ${allResults.length}`);
    
    // Randomly shuffle and select 20 dramas for variety
    const shuffled = allResults.sort(() => 0.5 - Math.random());
    const selectedResults = shuffled.slice(0, 20);
    
    console.log(`🎲 [SERVER] Randomly selected ${selectedResults.length} dramas for variety`);
    
    res.json({
      results: selectedResults,
      total_results: allResults.length,
      selected_count: selectedResults.length,
      genreId: genreId,
      mode: genreId === 'null' || genreId === null || !genreId ? 'random' : 'mood'
    });
    
  } catch (error) {
    console.error('❌ [SERVER] Error fetching recommendations:', error);
    res.status(500).json({ 
      error: 'Failed to fetch recommendations',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
