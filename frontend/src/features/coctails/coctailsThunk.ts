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
//
// export const deleteProduct = createAsyncThunk<
//   void,
//   { productId: string; token: string }
// >("coctails/deleteProduct", async ({ productId, token }) => {
//   return axiosApi.delete(`${apiUrl}/products/${productId}`, {
//     headers: { Authorization: `${token}` },
//   });
// });
//
// export const createProduct = createAsyncThunk<
//   Product,
//   { productMutation: IProductMutation },
//   { state: RootState }
// >("coctails/createProduct", async ({ productMutation }, { getState }) => {
//   const token = getState().users.user?.token;
//
//   try {
//     const formData = new FormData();
//     const keys = Object.keys(productMutation) as (keyof IProductMutation)[];
//
//     keys.forEach((key) => {
//       const value = productMutation[key];
//
//       if (value !== null) {
//         formData.append(key, value as string | File);
//       }
//     });
//
//     const response = await axiosApi.post<Product>("/products", formData, {
//       headers: { Authorization: token },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// });
