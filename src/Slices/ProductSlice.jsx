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
      let exist = state.cart.find((item) => item.id == action.payload.id)
      if (!exist) {
        state.cart = [...state.cart, action.payload]
        localStorage.setItem("cart", JSON.stringify(state.cart))
      }

    },
    RemoveReducer: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { ProductReducer, CartReducer, RemoveReducer } = ProductSlice.actions;

export default ProductSlice.reducer;