import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import movieReducer from './slices/movieSlice';
import favoritesReducer from './slices/favoritesSlice';
import { loadFavoritesFromStorage } from './slices/favoritesSlice';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    favorites: favoritesReducer,
  },
});

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Dispatch action to load favorites from AsyncStorage when the app starts
store.dispatch(loadFavoritesFromStorage());

export default store;
