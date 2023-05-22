import axios from "axios";
import {baseURL} from './config'


export const addCart = async(field)=>{
    const userRequest = axios.create({
        baseURL: baseURL,
        headers: { token: `Bearer ${field.token}` },
    });
    try{
        const res = await userRequest.post("/carts",field.data)
        return res.status
    }catch (e){
        console.log(e)
        return e
    }
}

export const getCart = async(field)=>{
    const userRequest = axios.create({
        baseURL: baseURL,
        headers: { token: `Bearer ${field.token}` },
    });
    // console.log('field',field.idUser)
    try{
        const res = await userRequest.get(`/carts/find/${field.idUser}`)
        return res 
    }catch (e){
        console.log(e)
        return e
    }
}