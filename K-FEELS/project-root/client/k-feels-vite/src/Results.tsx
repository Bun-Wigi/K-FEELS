import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  const dispatch = useDispatch<any>();
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
    return <div className="loading">Loading Korean dramas...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!results || results.length === 0) {
    return <div className="no-results">No results found</div>;
  }

  return (
    <div className="tmdb-results">
      <div className="results-grid">
        {results.map((item: TMDBResult) => (
          <div key={item.id} className="result-card">
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : '/placeholder-poster.jpg'
              }
              alt={item.name || 'poster'}
              className="poster"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/placeholder-poster.jpg';
              }}
            />
            <div className="result-info">
              <h3 className="title">{item.name}</h3>
              <p className="overview">{item.overview}</p>
              <div className="meta">
                <span className="rating">⭐ {(item.vote_average ?? 0).toFixed(1)}</span>
                <span className="date">{item.first_air_date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TMDBResults;