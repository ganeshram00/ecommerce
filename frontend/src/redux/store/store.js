// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '.././slice/productSlicer';
import userSlicer from '.././slice/userSlicer';
import cartSlice from '.././slice/cartSlice';
import shippingSlice from '.././slice/shippingSlice';
import orderSlice from '.././slice/orderSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userSlicer,
    cart: cartSlice,
    shipping:shippingSlice,
    newOrder:orderSlice,
  
  },
});

export default store;
