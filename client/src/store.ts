import { configureStore } from '@reduxjs/toolkit';
import moodReducer from './features/moodSlice';
import genreReducer from './features/genreSlice';
import kdramaReducer from './features/kdramaSlice';
import authReducer from './features/authSlice';  // ← Add this

export const store = configureStore({
  reducer: {
    mood: moodReducer,
    genre: genreReducer,     // ← Make sure this is here
    kdrama: kdramaReducer,
    auth: authReducer,       // ← Add this
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
