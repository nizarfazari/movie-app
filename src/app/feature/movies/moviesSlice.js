import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_TMDB_URL, BASE_URL } from "../../../utils/API/api";

const initialState = {
  movies: [],
  loading: false,
};

export const getMovies = createAsyncThunk(
  //action type string
  "movies/getMovies",
  // callback function
  async () => {
    const res = await axios
      .get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_TMDB_URL,
        },
      })
      .then((res) => {
        return res.data.results;
      });
    return res;
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.loading = true;
    },
    [getMovies.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.movies = payload;
    },
    [getMovies.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// export const { movieSlice } = movieSlice.action;

export default movieSlice.reducer;
