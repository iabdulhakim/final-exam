import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthState: false,
  cartItems: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = null;
    },
    isAuthChange: (state) => {
      state.isAuthState = true;
    },
    setCatItem: (state, { payload }) => {
      const item1 = state.cartItems.find((e) => e.id === payload.id);
      if (!item1) {
        state.cartItems = [...state.cartItems, payload];
      } else {
        const filtData = state.cartItems.filter((e) => e.id !== payload.id);
        state.cartItems = [...filtData, { ...item1, count: payload.count }];
      }
    },

    removeAll: (state) => {
      state.cartItems = [];
    },
  },
});

export const { isAuthChange, login, logout, setCatItem,removeAll } = userSlice.actions;
export default userSlice.reducer;
