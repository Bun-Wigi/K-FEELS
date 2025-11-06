import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import moodReducer from './slices/moodSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    mood: moodReducer,
  
  },
});