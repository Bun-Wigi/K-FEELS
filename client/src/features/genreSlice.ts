import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GenreState {
  currentGenreId: number | null;
  calculatedMood: string | null;
}

const initialState: GenreState = {
  currentGenreId: null,
  calculatedMood: null,
};

export const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<{ genreId: number; mood: string }>) => {
      console.log("🎬 [REDUX] setGenre reducer called with payload:", action.payload);
      console.log("🎬 [REDUX] Previous state:", { currentGenreId: state.currentGenreId, calculatedMood: state.calculatedMood });
      
      state.currentGenreId = action.payload.genreId;
      state.calculatedMood = action.payload.mood;
      
      console.log("🎬 [REDUX] New state after update:", { currentGenreId: state.currentGenreId, calculatedMood: state.calculatedMood });
      console.log("🎬 [REDUX] ✅ Genre successfully set - genreId:", state.currentGenreId, "mood:", state.calculatedMood);
    },
    clearGenre: (state) => {
      console.log("🎬 [REDUX] clearGenre reducer called");
      state.currentGenreId = null;
      state.calculatedMood = null;
      console.log("🎬 [REDUX] Genre state cleared");
    },
  },
});

export const { setGenre, clearGenre } = genreSlice.actions;
export default genreSlice.reducer;