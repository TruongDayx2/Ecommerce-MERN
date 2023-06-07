import { BASE_URL, userRequest } from "../requestMethods";
import axios from "axios";

export const getOrders = async(field)=>{
  const userRequest = axios.create({
      baseURL: BASE_URL,
      headers: { token: `Bearer ${field.token}` },
  });
  console.log('first',field)
  try {
      const res = await userRequest.get(`/orders/find/${field.idUser}`)
      console.log(res.status)
      return res
  } catch (error) {
      console.log('err',error)
      return error
  }
}

export const addOrder = async(field)=>{
    const userRequest = axios.create({
        baseURL: BASE_URL,
        headers: { token: `Bearer ${field.token}` },
    });
    console.log('first',field)
    try {
        const res = await userRequest.post("/orders",field.data1)
        console.log(res.status)
        return res
    } catch (error) {
        console.log('err',error)
        return error
    }
}

export const CancelOrder = async(field)=>{
    const userRequest = axios.create({
        baseURL: BASE_URL,
        headers: { token: `Bearer ${field.token}` },
    });
    try {
        const res = await userRequest.post(`/orders/user/${field.idUser}/${field.id}/Canceled`)
        console.log(res.status)
        return res
    } catch (error) {
        console.log('err',error)
        return error
    }
}