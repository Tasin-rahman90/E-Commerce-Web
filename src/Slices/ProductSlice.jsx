import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "products",

  initialState: {
    value: [],
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    wishlist: localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : [],
  },

  reducers: {
    ProductReducer: (state, action) => {
      state.value = action.payload;
    },
    CartReducer: (state, action) => {
      const exist = state.cart.find((item) => item.id === action.payload.id);
      if (exist) {
        exist.quantity = (exist.quantity || 1) + 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    AddToWishlist: (state, action) => {
      const exists = state.wishlist.some((item) => item.id === action.payload.id);
      if (!exists) state.wishlist.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    RemoveFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    ClearWishlist: (state) => {
      state.wishlist = [];
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    ClearCartReducer: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    IncreaseCartQuantity: (state, action) => {
      const item = state.cart.find((product) => product.id === action.payload.id);
      if (item) item.quantity = (item.quantity || 1) + 1;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    DecreaseCartQuantity: (state, action) => {
      const item = state.cart.find((product) => product.id === action.payload.id);
      if (item) item.quantity = Math.max(1, (item.quantity || 1) - 1);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    RemoveReducer: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const {
  ProductReducer,
  CartReducer,
  AddToWishlist,
  RemoveFromWishlist,
  ClearWishlist,
  ClearCartReducer,
  IncreaseCartQuantity,
  DecreaseCartQuantity,
  RemoveReducer,
} = ProductSlice.actions;

export default ProductSlice.reducer;