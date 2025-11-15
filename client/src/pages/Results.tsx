import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AppDispatch, RootState } from "../store";
import DramaGrid from "../components/DramaGrid";
import { fetchRecommendations } from "../features/kDramaSlice";

export default function Results(): JSX.Element {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const state = location.state as any;
  
  // Pagination state - 6 ITEMS PER PAGE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sparkle state for hover (from HEAD version)
  const [sparkles, setSparkles] = useState<{ id: number; angle: number }[]>([]);

  // Get genre from Redux
  const { currentGenreId, calculatedMood } = useSelector((state: RootState) => state.genre);
  const { recommendations, status, error } = useSelector((state: RootState) => state.kdrama);

  useEffect(() => {
    if (state?.mode === "mood" && currentGenreId) {
      // Mood mode - use genre filter
      dispatch(fetchRecommendations({ genreId: currentGenreId, mode: 'mood' }));
    } else if (state?.mode === "random") {
      // Random mode - no genre filter
      dispatch(fetchRecommendations({ genreId: null as unknown as number, mode: 'random' }));
    } else if (state?.mode === "trending") { // NEW: Add trending support
      // Trending mode - get trending Korean dramas
      dispatch(fetchRecommendations({ genreId: null as unknown as number, mode: 'trending' }));
    }
  }, [currentGenreId, state?.mode, dispatch]);

  // Calculate pagination
  const totalPages = Math.ceil((recommendations?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecommendations = recommendations?.slice(startIndex, endIndex) || [];

  // Pagination handlers
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Sparkle trigger for back button (from HEAD version)
  const triggerHoverSparkle = () => {
    const s = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      angle: (i / 8) * 360,
    }));
    setSparkles(s);
    setTimeout(() => setSparkles([]), 600);
  };

  // Function to get the appropriate heading
  const getHeading = () => {
    if (state?.mode === "mood") {
      return {
        title: `Perfect K-Dramas for your ${calculatedMood} mood! 🎭`,
        emoji: "🎭"
      };
    } else if (state?.mode === "trending") { // NEW: Trending support
      return {
        title: "Trending K-Dramas Right Now! 🔥",
        emoji: "🔥"
      };
    } else {
      return {
        title: "Random K-Drama Discoveries! 🎲",
        emoji: "🎲"
      };
    }
  };

  const heading = getHeading();

  return (
    <div className="results-page" style={{ 
      maxWidth: '1600px',
      margin: '0 auto', 
      padding: '20px 40px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '120px'
    }}>

      {/* Drama Cards Section */}
      <div style={{ 
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
        {status === 'loading' && (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p>Loading your K-drama recommendations...</p>
          </div>
        )}
        
        {status === 'succeeded' && recommendations?.length > 0 && (
          <>
            <div style={{ marginBottom: '15px', textAlign: 'center' }}>
              <h1 style={{ 
                fontSize: '26px',
                margin: '0 0 8px 0',
                color: '#333'
              }}>
                {heading.title}
              </h1>
              <p style={{ 
                fontSize: '13px',
                color: '#666', 
                margin: '0'
              }}>
                Showing {startIndex + 1}-{Math.min(endIndex, recommendations.length)} of {recommendations.length} results (Page {currentPage} of {totalPages})
              </p>
            </div>
            
            {/* Drama Grid - Shows 6 items with tighter spacing */}
            <div style={{ 
              flex: '1',
              marginBottom: '10px',
              width: '100%'
            }}>
              <DramaGrid 
                dramas={currentRecommendations.map((drama: any) => {
                  const posterUrl = drama.poster_path 
                    ? `https://image.tmdb.org/t/p/w300${drama.poster_path}` 
                    : 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image';
                  
                  return {
                    id: drama.id,
                    title: drama.name || drama.title || 'Unknown Title',
                    year: drama.first_air_date?.split('-')[0] || 'Unknown',
                    poster_path: drama.poster_path,
                    image: posterUrl,
                    poster: posterUrl,
                  };
                })}
              />
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '8px',
                marginTop: '10px',
                padding: '10px 0',
                position: 'sticky',
                bottom: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px'
              }}>
                <button 
                  onClick={handlePrevPage} 
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: currentPage === 1 ? '#f5f5f5' : '#fff',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ← Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageClick(pageNum)}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      backgroundColor: currentPage === pageNum ? '#007bff' : '#fff',
                      color: currentPage === pageNum ? '#fff' : '#000',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: currentPage === pageNum ? 'bold' : 'normal'
                    }}
                  >
                    {pageNum}
                  </button>
                ))}
                
                <button 
                  onClick={handleNextPage} 
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: currentPage === totalPages ? '#f5f5f5' : '#fff',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Next →
                </button>
              </div>
            )}

            {/* Animated Back Home Button - Keep from HEAD */}
            <div style={{ marginTop: 30, display: "flex", justifyContent: "center", position: "relative" }}>
              {/* Sparkles overlay */}
              <div className="sparkle-container">
                {sparkles.map((s) => (
                  <div
                    key={s.id}
                    className="sparkle"
                    style={{ transform: `rotate(${s.angle}deg) translateY(-25px)` }}
                  />
                ))}
              </div>

              <motion.div
                onMouseEnter={triggerHoverSparkle}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  to="/"
                  className="back-home"
                  style={{
                    display: "inline-block",
                    padding: "0.8rem 1.8rem",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    borderRadius: "14px",
                    cursor: "pointer",
                    background: "linear-gradient(135deg, #ffd1b3, #ffafcc)",
                    color: "#fff",
                    textDecoration: "none",
                    textAlign: "center",
                    boxShadow: "0 6px 18px rgba(255, 95, 155, 0.4)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  Back Home
                </Link>
              </motion.div>
            </div>
          </>
        )}
        
        {status === 'succeeded' && recommendations?.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>No recommendations found.</h2>
            <p>Try the mood quiz or refresh for different selections!</p>
          </div>
        )}
        
        {status === 'failed' && (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2 style={{ color: 'red' }}>Oops! Something went wrong.</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
