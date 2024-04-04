import { configureStore } from '@reduxjs/toolkit';
import authSlice from './AuthSlice/AuthSlice.js'; // Importing the default export, which is the reducer

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
