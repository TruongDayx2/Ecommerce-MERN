import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      const itemInCart = state.products.find((item) => item.id === action.payload.id)
      if (itemInCart) {
        if ((itemInCart.size === action.payload.size && itemInCart.color === action.payload.color)){
          itemInCart.quantity += action.payload.quantity
        }else {
          state.products.push(action.payload);
        }
      }else{
        state.products.push(action.payload);
      }

      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;