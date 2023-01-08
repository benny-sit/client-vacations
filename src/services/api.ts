import axios from "axios";
import { setToken } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";

export const BASE_URL = "http://localhost:3001/"


export const AuthAxios = axios.create({
    baseURL: BASE_URL
});

AuthAxios.interceptors.request.use(request => {
    const token = localStorage.getItem('auth')
    if (token) {
        request.headers = {
            "Authorization": token
        }
    }

    return request
})


AuthAxios.interceptors.response.use(response => {
    const newToken = response.headers.authorization;

    localStorage.setItem('auth', newToken || '');

    return response
})
