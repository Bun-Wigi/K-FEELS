import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authentication/authSlice'
import moodReducer from './features/mood/moodSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    mood: moodReducer,
    // Add your reducers here
  },
});