import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Cocktail } from '../../types';


export const fetchCocktails = createAsyncThunk<Cocktail[], void>(
  "coctails/fetchCocktails",
  async () => {
    const cocktailResponse = await axiosApi<Cocktail[]>("/cocktails");
    return cocktailResponse.data || [];
  },
);

// export const fetchProductsOnCategory = createAsyncThunk<Product[], string>(
//   "coctails/fetchProductsOnCategory",
//   async (id) => {
//     const productsResponse = await axiosApi<Product[]>(
//       "/coctails?category_id=" + id,
//     );
//     return productsResponse.data || [];
//   },
// );
//
// export const getProduct = createAsyncThunk<OneProduct, string>(
//   "coctails/getProduct",
//   async (productId) => {
//     const response = await axiosApi.get<OneProduct>(`/products/${productId}`);
//     return response.data;
//   },
// );
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
