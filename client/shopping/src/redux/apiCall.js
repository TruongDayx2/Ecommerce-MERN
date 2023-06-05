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
  console.log('user',user)
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess());
    return res
  } catch (err) {
    dispatch(registerFailure(err.request.response));
    return err
  }
}

export const logout = async(dispatch)=>{
  dispatch(logOut())
}

export const otp = async(user)=>{
  console.log(user)
  try {
    const res = await publicRequest.post("/auth/otp",user)
    return res
  } catch (e) {
    return e
  }
}