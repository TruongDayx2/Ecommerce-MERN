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
        baseURL: baseURL,
        headers: { token: `Bearer ${field.token}` },
    });
    try {
        const res = await userRequest.post(`/carts/update/${field.idUser}`,field.k)
        return res
    } catch (e) {
        return e
    }
}
export const updateCartOrder = async(field)=>{
    const userRequest = axios.create({
        baseURL: baseURL,
        headers: { token: `Bearer ${field.token}` },
    });
    try {
        const res = await userRequest.post(`/carts/updateOrder/${field.idUser}`,field.k)
        return res
    } catch (e) {
        return e
    }
}

export const deleteCart = async(field)=>{
    const userRequest = axios.create({
        baseURL: baseURL,
        headers: { token: `Bearer ${field.token}` },
    });

    try {
        const res = await userRequest.post(`/carts/delete/${field.idUser}`,field.checkedItems)
        return res
    } catch (e) {
        return e
    }
}