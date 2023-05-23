import axios from "axios";
import {baseURL} from './config'


export const addOrder = async(field)=>{
    const userRequest = axios.create({
        baseURL: baseURL,
        headers: { token: `Bearer ${field.token}` },
    });
    console.log('first',field)
    try {
        const res = await userRequest.post("/orders",field.data)
        console.log(res.status)
        return res
    } catch (error) {
        console.log('err',error)
        return error
    }
}