import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';

type Mood = string;

interface MoodState {
  currentMood: Mood | null;
  moodHistory: Mood[];
}

const initialState: MoodState = {
  currentMood: null,
  moodHistory: [],
};

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    setCurrentMood(state, action: PayloadAction<Mood | null>) {
      state.currentMood = action.payload;
    },
    addMoodToHistory(state, action: PayloadAction<Mood>) {
      state.moodHistory.push(action.payload);
    },
    clearMoodHistory(state) {
      state.moodHistory = [];
    },
  },
});

export const { setCurrentMood, addMoodToHistory, clearMoodHistory } = moodSlice.actions;

export default moodSlice.reducer;