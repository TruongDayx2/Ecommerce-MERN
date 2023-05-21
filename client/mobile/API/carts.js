import axios from "axios";
import {baseURL} from './config'


export const addCart = async(field)=>{

    const userRequest = axios.create({
        baseURL: baseURL,
        headers: { token: `Bearer ${field.token}` },
    });
    try{
        const res = await userRequest.post("/carts",field.data)
        // console.log('first',res.status)
        return res.status
    }catch (e){
        console.log(e)
    }
}