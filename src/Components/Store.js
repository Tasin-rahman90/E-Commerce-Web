import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "../Slices/ProductSlice";

export default configureStore({
  reducer: {
    products: ProductSlice.reducer,
  },
});