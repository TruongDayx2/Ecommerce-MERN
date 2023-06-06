import { BASE_URL, userRequest } from "../requestMethods";
import axios from "axios";

export const addToCart = async ( field) => {
    const userRequest = axios.create({
        baseURL: BASE_URL,
        headers: { token: `Bearer ${field.token}` },
    });
    try {
      const res = await userRequest.post("/carts", field.data);
      return res.status
    } catch (err) {
        console.log(err)
      return err
    }
  };

  export const getCart = async(field)=>{
    const userRequest = axios.create({
        baseURL: BASE_URL,
        headers: { token: `Bearer ${field.token}` },
    });
    try{
        const res = await userRequest.get(`/carts/find/${field.idUser}`)
        return res 
    }catch (e){
        console.log(e)
        return e
    }
}

export const updateCart = async(field)=>{
  const userRequest = axios.create({
      baseURL: BASE_URL,
      headers: { token: `Bearer ${field.token}` },
  });
  try {
      const res = await userRequest.post(`/carts/update/${field.idUser}`,field.data)
      return res
  } catch (e) {
      return e
  }
}

export const deleteCart = async(field)=>{
    const userRequest = axios.create({
        baseURL: BASE_URL,
        headers: { token: `Bearer ${field.token}` },
    });

    try {
        const res = await userRequest.post(`/carts/delete/${field.idUser}`,field.list)
        return res
    } catch (e) {
        return e
    }
}