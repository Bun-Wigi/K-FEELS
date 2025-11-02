import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/slices/authSlice';
import moodReducer from './features/slices/moodSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    mood: moodReducer,
  
  },
});