import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Cocktail, CocktailMutation, DetailCocktail } from '../../types';
import { RootState } from '../../app/store.ts';


export const fetchCocktails = createAsyncThunk<Cocktail[], void>(
  "cocktails/fetchCocktails",
  async () => {
    const cocktailResponse = await axiosApi<Cocktail[]>("/cocktails");
    return cocktailResponse.data || [];
  },
);

export const fetchCocktailsForOneUser = createAsyncThunk<Cocktail[], string>(
  "cocktails/fetchProductsForOneUser",
  async (id) => {
    const cocktailResponse = await axiosApi<Cocktail[]>(
      "/cocktails?userID=" + id,
    );
    return cocktailResponse.data || [];
  },
);

export const getCocktail = createAsyncThunk<DetailCocktail, string>(
  "cocktails/getCocktail",
  async (id) => {
    const response = await axiosApi.get<DetailCocktail>(`/cocktails/${id}`);
    return response.data;
  },
);
export const createCocktail = createAsyncThunk<void, CocktailMutation,{ state: RootState }>(
  "cocktails/createCocktail",
  async (cocktailMutation, { getState }) => {
    const formData = new FormData();
    const token = getState().users.user?.token;

    const keys = Object.keys(cocktailMutation) as (keyof CocktailMutation)[];

    keys.forEach((key) => {
      const value = cocktailMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
console.log(formData)
    await axiosApi.post("/cocktails", formData,{headers: {Authorization:  token}});
  },
);
export const deleteCocktail = createAsyncThunk<void, string>(
  "cocktails/deleteCocktail",
  async (id) => {
    return axiosApi.delete(`/cocktails/${id}`, {});
  },
);

export const publishCocktail = createAsyncThunk<void, string>(
  "cocktails/publishCocktail",
  async (id) => {
    return axiosApi.patch(`/cocktails/${id}/togglePublished`, {});
  },
);
