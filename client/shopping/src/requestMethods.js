import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTA2MDZjNDI4YzEzNDU4YmZjNDBmZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTcyMzMwMywiZXhwIjoxNjcxOTgyNTAzfQ.Xp28LetTWIRw2_YYiRcvOwtiRU0H81d1lDABWe4qiFU"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});