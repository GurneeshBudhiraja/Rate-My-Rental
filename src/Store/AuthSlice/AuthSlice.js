// AuthSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: null,
    userEmail:null,
    isAuthenticated: false,
};

// this export will be rarely used
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.userName = null;
      state.userEmail = null;
      state.isAuthenticated = false;
    }
  },
});
// reducer function
export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;  
