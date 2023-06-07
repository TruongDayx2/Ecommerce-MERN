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