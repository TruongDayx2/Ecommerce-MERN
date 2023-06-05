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