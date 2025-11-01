import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { store } from '../app/store';

// Derive the RootState type from the store configuration
export type RootState = ReturnType<typeof store.getState>;

// Derive the AppDispatch type
export type AppDispatch = typeof store.dispatch;

// Export custom typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;