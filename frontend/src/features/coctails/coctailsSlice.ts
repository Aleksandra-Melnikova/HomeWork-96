import { Cocktail, DetailCocktail } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createCocktail,
  deleteCocktail,
  fetchCocktails,
  fetchCocktailsForOneUser,
  getCocktail,
  publishCocktail,
} from "./coctailsThunk.ts";
import { RootState } from "../../app/store.ts";

interface ICocktailState {
  cocktails: Cocktail[];
  fetchLoading: boolean;
  createLoading: boolean;
  oneCocktail: DetailCocktail | null;
  fetchOneLoading: boolean;
  deleteLoading: boolean;
  publishedLoading: boolean;
}

const initialState: ICocktailState = {
  cocktails: [],
  fetchLoading: false,
  createLoading: false,
  oneCocktail: null,
  fetchOneLoading: false,
  deleteLoading: false,
  publishedLoading: false,
};

export const selectProductsItems = (state: RootState) =>
  state.cocktails.cocktails;
export const selectFetchLoading = (state: RootState) =>
  state.cocktails.fetchLoading;
export const selectCreateLoading = (state: RootState) =>
  state.cocktails.createLoading;
export const selectOneCocktail = (state: RootState) =>
  state.cocktails.oneCocktail;
export const selectFetchOneLoading = (state: RootState) =>
  state.cocktails.fetchOneLoading;
export const selectDeleteLoading = (state: RootState) =>
  state.cocktails.deleteLoading;
export const selectPublishedLoading = (state: RootState) =>
  state.cocktails.publishedLoading;

export const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCocktails.fulfilled, (state, { payload: cocktails }) => {
        state.fetchLoading = false;
        state.cocktails = cocktails;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(fetchCocktailsForOneUser.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(
        fetchCocktailsForOneUser.fulfilled,
        (state, { payload: cocktails }) => {
          state.fetchLoading = false;
          state.cocktails = cocktails;
        },
      )
      .addCase(fetchCocktailsForOneUser.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(getCocktail.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(getCocktail.fulfilled, (state, { payload: cocktail }) => {
        state.fetchOneLoading = false;
        state.oneCocktail = cocktail;
      })
      .addCase(getCocktail.rejected, (state) => {
        state.fetchOneLoading = false;
      })
      .addCase(deleteCocktail.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteCocktail.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteCocktail.rejected, (state) => {
        state.deleteLoading = false;
      })

      .addCase(createCocktail.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createCocktail.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createCocktail.rejected, (state) => {
        state.createLoading = false;
      })
      .addCase(publishCocktail.pending, (state) => {
        state.publishedLoading = true;
      })
      .addCase(publishCocktail.fulfilled, (state) => {
        state.publishedLoading = false;
      })
      .addCase(publishCocktail.rejected, (state) => {
        state.publishedLoading = false;
      });
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
