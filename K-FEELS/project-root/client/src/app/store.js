import { configureStore } from '@reduxjs/toolkit';
import moodReducer from '../features/moodSlice';

const store = configureStore({
  reducer: {
    mood: moodReducer,
  },
});

export default store;