import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "products",

  initialState: {
    value: [],
  },

  reducers: {
    ProductReducer: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { ProductReducer } = ProductSlice.actions;

export default ProductSlice.reducer;