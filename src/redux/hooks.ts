import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store';

// Custom hook to use `AppDispatch` with correct typing
export const useAppDispatch: () => AppDispatch = useDispatch;
