import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itempresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itempresent) {
        itempresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removeItem;
    },
    incrementQuantity: (state, action) => {
      const itempresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      itempresent.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itempresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itempresent.quantity === 1) {
        itempresent.quantity = 0; 
        const removeItem = state.cart.filter(
            (item) => item.id !== action.payload.id
        );
        state.cart = removeItem;
      }
      else {
        itempresent.quantity--;
      }
    },
    cleanCart:(state) => {
        state.cart = [];

    }
  },
});


export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, cleanCart } = CartSlice.actions;


export default CartSlice.reducer;
