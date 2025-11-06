import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './features/results.css';

type TMDBResult = {
  id: number;
  poster_path?: string | null;
  name?: string;
  overview?: string;
  vote_average?: number;
  first_air_date?: string;
};

interface TMDBResultsProps {
  searchQuery?: string;
  loadPopular?: boolean;
}

// Local stub action creators to avoid missing module errors in this file.
// Replace these with real imports from your redux slice when available.
const fetchPopularKDramas = () => ({ type: 'tmdb/fetchPopular' } as const);
const searchKDramas = (q: string) => ({ type: 'tmdb/search', payload: q } as const);
const clearResults = () => ({ type: 'tmdb/clear' } as const);

type RootState = {
  tmdb: {
    results: TMDBResult[];
    loading: boolean;
    error?: string | null;
  };
};

const TMDBResults: React.FC<TMDBResultsProps> = ({
  searchQuery = '',
  loadPopular = false,
}) => {
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state: RootState) => state.tmdb);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchKDramas(searchQuery));
    } else if (loadPopular) {
      dispatch(fetchPopularKDramas());
    } else {
      dispatch(clearResults());
    }
  }, [searchQuery, loadPopular, dispatch]);

  if (loading) {
    return (
      <div className="results-loading">
        <div className="loading-spinner"></div>
        Loading Korean dramas...
      </div>
    );
  }

  if (error) {
    return <div className="results-error">Error: {error}</div>;
  }

  if (!results || results.length === 0) {
    return (
      <div className="results-empty">
        <h3>No results found</h3>
        <p>Try adjusting your search or browse popular dramas.</p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-grid">
        {results.map((item: TMDBResult) => (
          <div key={item.id} className="result-card">
            <div className="result-card-header">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : '/placeholder-poster.jpg'
                }
                alt={item.name || 'poster'}
                className="result-poster"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/placeholder-poster.jpg';
                }}
              />
              <div className="result-content">
                <h3 className="result-title">{item.name}</h3>
                <p className="result-date">{item.first_air_date}</p>
                <div className="result-rating">
                  {(item.vote_average ?? 0).toFixed(1)}
                </div>
              </div>
            </div>
            <p className="result-overview">{item.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TMDBResults;