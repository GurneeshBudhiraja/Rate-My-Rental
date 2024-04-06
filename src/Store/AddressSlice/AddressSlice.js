import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    searchAddress: null
}

export const addressSlice = createSlice({
  name:'address',
  initialState,
  reducers:{
    setSearchAddress:(state,action)=>{
      state.searchAddress=action.payload;
    },
    clearSearchAddress:(state)=>{
      state.searchAddress=null;
    }
  }
})

export const {setSearchAddress,clearSearchAddress} = addressSlice.actions;

export default addressSlice.reducer;