import axios from "axios";
export const baseURL = 'http://192.168.1.9:5000/api'

export const publicRequest = axios.create({
    baseURL: baseURL,
});

export const userRequest = axios.create({
    baseURL: baseURL,
    // headers: { token: `Bearer ${TOKEN}` },
});