import axios from "axios";
export const baseURL = 'http://10.251.0.125:5000/api'

export const publicRequest = axios.create({
    baseURL: baseURL,
});

export const userRequest = axios.create({
    baseURL: baseURL,
    // headers: { token: `Bearer ${TOKEN}` },
});