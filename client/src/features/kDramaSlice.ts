import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface KDrama {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

interface KDramaState {
  recommendations: KDrama[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: KDramaState = {
  recommendations: [],
  status: 'idle',
  error: null,
};

// Add this async thunk
export const fetchRecommendations = createAsyncThunk(
  'kdrama/fetchRecommendations',
  async ({ genreId }: { genreId: number }) => {
    console.log('📡 [API] fetchRecommendations called with genreId:', genreId);
    
    // Update this line to point to your backend server:
    const response = await fetch(`http://localhost:5172/api/recommendations?genreId=${genreId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📡 [API] fetchRecommendations response:', data);
    
    return data.results || data; // Handle different response formats
  }
);

export const kdramaSlice = createSlice({
  name: 'kdrama',
  initialState,
  reducers: {
    clearRecommendations: (state) => {
      state.recommendations = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch recommendations';
      });
  },
});

export const { clearRecommendations } = kdramaSlice.actions;
export default kdramaSlice.reducer;