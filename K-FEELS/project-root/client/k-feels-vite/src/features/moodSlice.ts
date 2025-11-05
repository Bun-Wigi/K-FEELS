import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface MoodState {
  currentMood: string | null;
  moodHistory: string[];
}

const initialState: MoodState = {
  currentMood: null,
  moodHistory: [],
};

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    setCurrentMood(state, action: PayloadAction<string | null>) {
      state.currentMood = action.payload;
    },
    addMoodToHistory(state, action: PayloadAction<string>) {
      state.moodHistory.push(action.payload);
    },
    clearMoodHistory(state) {
      state.moodHistory = [];
    },
  },
});

export const { setCurrentMood, addMoodToHistory, clearMoodHistory } = moodSlice.actions;

export default moodSlice.reducer;