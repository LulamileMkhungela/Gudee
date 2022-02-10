import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addwishlist: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addwishlist } = wishSlice.actions;
export default wishSlice.reducer;