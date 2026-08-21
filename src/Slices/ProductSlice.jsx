import { createSlice } from "@reduxjs/toolkit";
import Cart from "../Pages/Cart";

export const ProductSlice = createSlice({
  name: "products",

  initialState: {
    value: [],
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  },

  reducers: {
    ProductReducer: (state, action) => {
      state.value = action.payload;
    },
    CartReducer: (state, action) => {
      state.cart = [...state.cart,action.payload]
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
  },
});

export const { ProductReducer,CartReducer } = ProductSlice.actions;

export default ProductSlice.reducer;