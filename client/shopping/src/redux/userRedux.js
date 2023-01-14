import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    errorDetail:"",
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut:(state)=>{
      state.isFetching = false;
      state.currentUser = null;
    },
    registerSuccess:(state) => {
      state.error = false
      state.errorDetail = ""
    },
    registerFailure:(state,action) =>{
      state.error = true
      state.errorDetail = action.payload
    }

  },
});

export const { loginStart, loginSuccess, loginFailure, logOut, registerSuccess, registerFailure } = userSlice.actions;
export default userSlice.reducer;