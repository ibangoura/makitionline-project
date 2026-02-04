import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  userInfo: null,
};

const makitimaSlice = createSlice({
  name: "makitima",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },

    userSignOut(state) {
      state.userInfo = null;
      state.cart = [];
    },

    addToCart(state, action) {
      const item = state.cart.find(
        (i) => i.id === action.payload.id
      );
      if (item) item.quantity += 1;
      else state.cart.push({ ...action.payload, quantity: 1 });
    },

    removeFromCart(state, action) {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload
      );
    },

    increaseQuantity(state, action) {
      const item = state.cart.find(
        (i) => i.id === action.payload
      );
      if (item) item.quantity += 1;
    },

    decreaseQuantity(state, action) {
      const item = state.cart.find(
        (i) => i.id === action.payload
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    resetCart(state) {
      state.cart = [];
    },
  },
});

export const {
  setUserInfo,
  userSignOut,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  resetCart,
} = makitimaSlice.actions;

export default makitimaSlice.reducer;
