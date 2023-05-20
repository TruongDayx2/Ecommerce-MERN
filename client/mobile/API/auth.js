import { loginFailure, loginStart, loginSuccess,logOut,registerSuccess,registerFailure } from "../redux/userRedux";
import { publicRequest } from "./config";

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

export const register = async (user)=>{
  try {
    const res = await publicRequest.post("/auth/register", user);
    return res
  } catch (err) {
    return err
  }
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

export const logout = async(dispatch)=>{
  dispatch(logOut())
}