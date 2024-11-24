import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types/types';
import axios from 'axios';
import { RootState } from '../store';

export const fetchMovies = createAsyncThunk<Movie[], string | undefined>(
  'movies/fetchMovies',
 async function fetchMovies(searchTerm = 'star') {
    try {
        const response = await axios.get(`https://itunes.apple.com/search?term=${searchTerm}&country=au&media=movie&all`);
        const data = response?.data?.results;
        const filteredResults = data.filter((item: Movie)  => item && item.trackId !== undefined);
        filteredResults.forEach((item: { trackId: any; }) => {
            // console.log('Track ID:', item.trackId);
        });
        return filteredResults;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
);

interface MoviesState {
  list: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MoviesState = {
  list: [],
  status: 'idle',
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const selectMovies = (state: RootState) => state.movies.list;

export default moviesSlice.reducer;
