import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import moodReducer from './features/moodSlice';
import tmdbReducer from './features/tmdbSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    mood: moodReducer,
    tmdb: tmdbReducer,
  },
});