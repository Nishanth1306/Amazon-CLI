import {createSlice} from "@reduxjs/toolkit";


export const WishSlice = createSlice({
    name:"wishlist",
    initialState:{
        wishlist : [],
    },
    reducers:{
        addToWish: (state, action) => {
            console.log(action.payload)
            const itempresent = state.wishlist.find((item) => {
              return (
                (item.id && item.id === action.payload.id) ||
                (item.asin && item.asin === action.payload.asin)
              );
            });
          
            if (itempresent) {
              itempresent.quantity++;
            } else {
              state.wishlist.push({ ...action.payload, quantity: 1 });
            }
        },
        loadWishlist: (state, action) => {
            state.wishlist = action.payload
        },
        removeFromWish: (state, action) => {
            const idToRemove = action.payload; 
            state.wishlist = state.wishlist.filter(item => item.id !== idToRemove);
          },
          cleanWish:(state) => {
            state.wishlist = [];
    
        }
    }
})

export const {addToWish, removeFromWish, cleanWish, loadWishlist} = WishSlice.actions;

export default WishSlice.reducer;

