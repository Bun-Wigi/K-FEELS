import { createSlice } from '@reduxjs/toolkit';

const moodSlice = createSlice({
  name: 'mood',
  initialState: {
    currentMood: null,
    moodHistory: [],
  },
  reducers: {
    setCurrentMood(state, action) {
      state.currentMood = action.payload;
    },
    addMoodToHistory(state, action) {
      state.moodHistory.push(action.payload);
    },
    clearMoodHistory(state) {
      state.moodHistory = [];
    },
  },
});

export const { setCurrentMood, addMoodToHistory, clearMoodHistory } = moodSlice.actions;

export default moodSlice.reducer;