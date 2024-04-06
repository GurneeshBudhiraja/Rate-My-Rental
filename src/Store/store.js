import { configureStore } from '@reduxjs/toolkit';
import authSlice from './AuthSlice/AuthSlice.js'; // Importing the default export, which is the reducer
import addressSlice from "./AddressSlice/AddressSlice.js";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    address: addressSlice,
  },
});
