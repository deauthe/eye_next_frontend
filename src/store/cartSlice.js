// import { createSlice } from "@reduxjs/toolkit";

// export const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         cartItems: [],
//     },
//     reducers: {
//         addToCart: (state, action) => {
//             const item = state.cartItems.find(
//                 (p) => p.id === action.payload.id
//             );
//             if (item) {
//                 item.quantity++;
//                 item.attributes.price = item.oneQuantityPrice * item.quantity;
//             } else {
//                 state.cartItems.push({ ...action.payload, quantity: 1 });
//             }
//         },
//         updateCart: (state, action) => {
//             state.cartItems = state.cartItems.map((p) => {
//                 if (p.id === action.payload.id) {
//                     if (action.payload.key === "quantity") {
//                         p.attributes.price =
//                             p.oneQuantityPrice * action.payload.val;
//                     }
//                     return { ...p, [action.payload.key]: action.payload.val };
//                 }
//                 return p;
//             });
//         },
//         removeFromCart: (state, action) => {
//             state.cartItems = state.cartItems.filter(
//                 (p) => p.id !== action.payload.id
//             );
//         },
//     },
// });

// // Action creators are generated for each case reducer function
// export const { addToCart, updateCart, removeFromCart } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) =>
          item.id === newItem.id &&
          item.attributes.size === newItem.attributes.size
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.attributes.size === action.payload.size
          )
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
