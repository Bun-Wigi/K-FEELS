import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface MoodState {
  mood: string | null;
}

const initialState: MoodState = {
  mood: null,
};

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    setMood(state, action: PayloadAction<string>) {
      state.mood = action.payload;
    },
    clearMood(state) {
      state.mood = null;
    },
  },
});


export const { setMood, clearMood } = moodSlice.actions;

export default moodSlice.reducer;