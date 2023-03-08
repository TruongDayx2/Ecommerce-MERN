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
      console.log(action.payload)
      const itemInCart = state.products.find((item) => 
        item.id === action.payload.id 
        && item.size === action.payload.size 
        && item.color === action.payload.color)
      if (itemInCart) {
        itemInCart.quantity = itemInCart.quantity + action.payload.quantity > action.payload.quantityStock 
                            ? action.payload.quantityStock 
                            : itemInCart.quantity + action.payload.quantity
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
      }

      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;