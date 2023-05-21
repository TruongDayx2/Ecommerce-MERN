import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    errorDetail:"",
    errRegister:false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.errorDetail = "";
    },
    loginFailure: (state,action) => {
      state.isFetching = false;
      state.error = true;
      state.errorDetail= action.payload 
    },
    logOut:(state)=>{
      state.isFetching = false;
      state.currentUser = null;
    },
    registerSuccess:(state) => {
      state.errRegister = false;
      state.errorDetail = "";
    },
    registerFailure:(state,err) =>{
      state.errRegister = true;
      state.errorDetail=err.payload;
    }

  },
});

export const { loginStart, loginSuccess, loginFailure, logOut, registerSuccess, registerFailure } = userSlice.actions;
export default userSlice.reducer;