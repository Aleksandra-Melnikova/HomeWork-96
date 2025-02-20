import { Cocktail, DetailCocktail } from '../../types';
import { createSlice } from "@reduxjs/toolkit";
import {
  createCocktail,
  fetchCocktails, fetchCocktailsForOneUser, getCocktail
} from './coctailsThunk.ts';
import { RootState } from "../../app/store.ts";

interface ICocktailState {
  cocktails: Cocktail[];
  fetchLoading: boolean;
  createLoading: boolean;
  oneCocktail: DetailCocktail | null;
  fetchOneLoading: boolean;
  // deleteLoading: boolean;
}

const initialState:  ICocktailState = {
  cocktails: [],
  fetchLoading: false,
  createLoading: false,
  oneCocktail:null,
  fetchOneLoading: false,
//   deleteLoading: false,
};

export const selectProductsItems = (state: RootState) =>
  state.cocktails.cocktails;
export const selectFetchLoading = (state: RootState) =>
  state.cocktails.fetchLoading;
export const selectCreateLoading = (state: RootState) =>
  state.cocktails.createLoading;
export const selectOneCocktail = (state: RootState) => state.cocktails.oneCocktail;
export const selectFetchOneLoading = (state: RootState) =>
  state.cocktails.fetchOneLoading;
// export const selectDeleteLoading = (state: RootState) =>
//   state.products.deleteLoading;

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
      .addCase(getCocktail.fulfilled, (state, { payload: cocktail}) => {
        state.fetchOneLoading = false;
        state.oneCocktail = cocktail;
      })
      .addCase(getCocktail.rejected, (state) => {
        state.fetchOneLoading = false;
      })
      // .addCase(deleteProduct.pending, (state) => {
      //   state.deleteLoading = true;
      // })
      // .addCase(deleteProduct.fulfilled, (state) => {
      //   state.deleteLoading = false;
      // })
      // .addCase(deleteProduct.rejected, (state) => {
      //   state.deleteLoading = false;
      // })
      //
      .addCase(createCocktail.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createCocktail.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createCocktail.rejected, (state) => {
        state.createLoading = false;
      });
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
