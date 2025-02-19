import { Cocktail} from '../../types';
import { createSlice } from "@reduxjs/toolkit";
import {
 fetchCocktails
} from './coctailsThunk.ts';
import { RootState } from "../../app/store.ts";

interface IProductsState {
  cocktails: Cocktail[];
  fetchLoading: boolean;
  // createLoading: boolean;
  // oneProduct: OneProduct | null;
  // fetchOneLoading: boolean;
  // deleteLoading: boolean;
}

const initialState: IProductsState = {
  cocktails: [],
  fetchLoading: false,
//   createLoading: false,
//   oneProduct: null,
//   fetchOneLoading: false,
//   deleteLoading: false,
};

export const selectProductsItems = (state: RootState) =>
  state.cocktails.cocktails;
export const selectFetchLoading = (state: RootState) =>
  state.cocktails.fetchLoading;
// export const selectCreateLoading = (state: RootState) =>
//   state.products.createLoading;
// export const selectOneProduct = (state: RootState) => state.products.oneProduct;
// export const selectFetchOneLoading = (state: RootState) =>
//   state.products.fetchOneLoading;
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
      // .addCase(fetchProductsOnCategory.pending, (state) => {
      //   state.fetchLoading = true;
      // })
      // .addCase(
      //   fetchProductsOnCategory.fulfilled,
      //   (state, { payload: products }) => {
      //     state.fetchLoading = false;
      //     state.products = products;
      //   },
      // )
      // .addCase(fetchProductsOnCategory.rejected, (state) => {
      //   state.fetchLoading = false;
      // })
      // .addCase(getProduct.pending, (state) => {
      //   state.fetchOneLoading = true;
      // })
      // .addCase(getProduct.fulfilled, (state, { payload: product }) => {
      //   state.fetchOneLoading = false;
      //   state.oneProduct = product;
      // })
      // .addCase(getProduct.rejected, (state) => {
      //   state.fetchOneLoading = false;
      // })
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
      // .addCase(createProduct.pending, (state) => {
      //   state.createLoading = true;
      // })
      // .addCase(createProduct.fulfilled, (state) => {
      //   state.createLoading = false;
      // })
      // .addCase(createProduct.rejected, (state) => {
      //   state.createLoading = false;
      // });
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
