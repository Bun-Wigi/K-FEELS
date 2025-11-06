import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

interface TMDBResult {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  media_type?: string;
}

interface TMDBState {
  results: TMDBResult[];
  loading: boolean;
  error: string | null;
  currentQuery: string;
}

const initialState: TMDBState = {
  results: [],
  loading: false,
  error: null,
  currentQuery: '',
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Fetch popular K-dramas from your backend
export const fetchPopularKDramas = createAsyncThunk(
  'tmdb/fetchPopular',
  async () => {
    const response = await fetch(`${API_BASE_URL}/api/kdramas`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular K-dramas');
    }
    
    const data = await response.json();
    return data.results; 
  }
);

// Search K-dramas from your backend
export const searchKDramas = createAsyncThunk(
  'tmdb/searchKDramas',
  async (query: string) => {
    const response = await fetch(`${API_BASE_URL}/api/kdramas/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Failed to search K-dramas');
    }
    
    const data = await response.json();
    return data; // Your backend already filters to TV shows
  }
);

const tmdbSlice = createSlice({
  name: 'tmdb',
  initialState,
  reducers: {
    clearResults(state) {
      state.results = [];
      state.error = null;
    },
    setCurrentQuery(state, action: PayloadAction<string>) {
      state.currentQuery = action.payload;
    },
    resetQuiz(state) {
      state.results = [];
      state.error = null;
      state.currentQuery = '';
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Popular K-dramas
      .addCase(fetchPopularKDramas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularKDramas.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchPopularKDramas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch popular K-dramas';
      })
      // Search K-dramas
      .addCase(searchKDramas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchKDramas.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchKDramas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search K-dramas';
      });
  },
});

export const { clearResults, setCurrentQuery, resetQuiz } = tmdbSlice.actions;
export default tmdbSlice.reducer;