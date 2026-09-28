import { createSlice } from "@reduxjs/toolkit";

const readStoredArray = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

export const ProductSlice = createSlice({
  name: "products",

  initialState: {
    value: [],
    cart: readStoredArray("cart"),
    wishlist: readStoredArray("wishlist"),
  },

  reducers: {
    ProductReducer: (state, action) => {
      state.value = action.payload;
    },
    CartReducer: (state, action) => {
      const product = action.payload.product || action.payload;
      const quantity = Math.max(1, Math.floor(Number(action.payload.quantity) || 1));
      const exist = state.cart.find((item) => item.id === product.id);
      const previousQuantity = exist ? (Number(exist.quantity) || 1) : 0;
      const stock = product.stock == null ? Infinity : Number(product.stock);
      const nextQuantity = Math.min(previousQuantity + quantity, Number.isFinite(stock) ? stock : Infinity);
      if (nextQuantity <= previousQuantity) return;
      if (exist) {
        exist.quantity = nextQuantity;
      } else {
        state.cart.push({ ...product, quantity: nextQuantity });
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
      if (item) {
        const stock = item.stock == null ? Infinity : Number(item.stock);
        item.quantity = Math.min((Number(item.quantity) || 1) + 1, Number.isFinite(stock) ? stock : Infinity);
      }
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