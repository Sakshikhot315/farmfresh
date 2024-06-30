import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
        message.success('Product Already Added To Cart')
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        message.success('Added To Cart')
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
      message.success('Deleted From Cart')
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions

export default cartSlice.reducer