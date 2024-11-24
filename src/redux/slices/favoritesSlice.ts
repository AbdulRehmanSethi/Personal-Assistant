import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../../types/types';
import { AppDispatch, AppThunk } from '../store';

type FavoritesState = {
  list: Movie[];
};

const initialState: FavoritesState = {
  list: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Movie[]>) => {
      state.list = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      if (movie && movie.trackId) {  
        const index = state.list.findIndex((fav) => fav.trackId === movie.trackId);
        if (index >= 0) {
          state.list.splice(index, 1);
        } else {
          state.list.push(movie);
        }
        saveFavoritesToStorage(state.list); 
      } else {
        console.warn("Movie or trackId is missing:", movie);
      }
    },
  },
});

const saveFavoritesToStorage = async (favorites: Movie[]) => {
  try {
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites:', error);
  }
};

export const loadFavoritesFromStorage = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const storedFavorites = await AsyncStorage.getItem('favorites');
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      
      // Validate each movie object
      const validFavorites = parsedFavorites.filter((movie: Movie) => movie && movie.trackId);

      dispatch(setFavorites(validFavorites));
    }
  } catch (error) {
    console.error('Failed to load favorites:', error);
  }
};


export const { setFavorites, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
