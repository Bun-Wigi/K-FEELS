import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authentication/authSlice';
import moodReducer from '../features/moodSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    mood: moodReducer,
  
  },
});