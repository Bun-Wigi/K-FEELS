import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

  // Get genre from Redux
  const { currentGenreId, calculatedMood } = useSelector((state: RootState) => state.genre);
  const { recommendations, status, error } = useSelector((state: RootState) => state.kdrama);

  useEffect(() => {
    if (state?.mode === "mood" && currentGenreId) {
      // Mood mode - use genre filter
      dispatch(fetchRecommendations({ genreId: currentGenreId }));
    } else if (state?.mode === "random") {
      // Random mode - no genre filter
      dispatch(fetchRecommendations({ genreId: null as unknown as number }));
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

  return (
    <div className="results-page" style={{ 
      maxWidth: '1600px', // INCREASED from 1200px to 1600px for 6 cards
      margin: '0 auto', 
      padding: '20px 40px', // INCREASED padding for wider layout
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
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              {state?.mode === "mood" ? (
                <h1 style={{ 
                  fontSize: '28px',
                  margin: '0 0 10px 0',
                  color: '#333'
                }}>
                  Perfect K-Dramas for your {calculatedMood} mood! 🎭
                </h1>
              ) : (
                <h1 style={{ 
                  fontSize: '28px',
                  margin: '0 0 10px 0',
                  color: '#333'
                }}>
                  Random K-Drama Discoveries! 🎲
                </h1>
              )}
              <p style={{ 
                fontSize: '14px',
                color: '#666', 
                margin: '0'
              }}>
                Showing {startIndex + 1}-{Math.min(endIndex, recommendations.length)} of {recommendations.length} results (Page {currentPage} of {totalPages})
              </p>
            </div>
            
            {/* Drama Grid - Shows 6 items with wider layout */}
            <div style={{ 
              flex: '1',
              marginBottom: '20px',
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
                marginTop: '20px',
                padding: '15px 0'
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
          </>
        )}
        
        {status === 'succeeded' && recommendations?.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>No recommendations found.</h2>
            <p>Try the mood quiz or refresh for different random selections!</p>
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
