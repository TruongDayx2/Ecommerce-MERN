import axios from "axios";
import {baseURL} from './config'

export const getProducts = async(field)=>{
    try{
        const res = await axios.get(
            field.catePath
            ? `${baseURL}/products/?category=${field.cate}/${field.catePath}`
            : field.cate
            ? `${baseURL}/products?category=${field.cate}`
            : `${baseURL}/products`
        )
        return res;
    } catch (err){
        console.log('err',err)
    }
}