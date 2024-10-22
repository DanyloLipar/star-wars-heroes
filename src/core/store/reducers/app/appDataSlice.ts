import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AppService from "../../../services/app.service";
import { AppDataTypes } from "./appDataTypes";

export const fetchHeroes = createAsyncThunk(
  "app/fetchHeroes",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await AppService.getHeroes(page);
      const { results, count } = response.data;

      return { results, totalHeroes: Math.floor(count / 10) };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: AppDataTypes = {
  heroes: [],
  page: 1,
  totalPages: 0,
  loading: false,
  error: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.loading = false;
        state.heroes = action.payload.results;
        state.totalPages = action.payload.totalHeroes;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appSlice.reducer;
export const { setPage } = appSlice.actions;
