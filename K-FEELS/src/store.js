import { configureStore} from '@reduxjs/toolkit';
import moodReducer from './features/mood/moodSlice';
import authSlice from './features/authentication/authSlice';

export const store = configureStore({
  reducer: {
    authSlice,
    mood: moodReducer,
    // Add your reducers here
  },
});