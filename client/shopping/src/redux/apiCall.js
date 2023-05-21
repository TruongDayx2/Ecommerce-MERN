import { loginFailure, loginStart, loginSuccess,logOut,registerSuccess,registerFailure } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  console.log('user',user)
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch,user)=>{
  try {
    await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess());
  } catch (err) {
    dispatch(registerFailure(err.request.response));
  }
}

export const logout = async(dispatch)=>{
  dispatch(logOut())
}