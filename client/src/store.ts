import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import moodReducer from './features/moodSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    mood: moodReducer,
  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
