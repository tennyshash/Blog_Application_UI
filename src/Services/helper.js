import axios from "axios";
import { getToken } from "../auth";


export const BASE_URL='http://localhost:9999';

export const myAxios=axios.create({
    baseURL:BASE_URL
});


export const authAxios=axios.create({
    baseURL:BASE_URL
});

authAxios.interceptors.request.use(config=>{

    const token=getToken()
    //console.log(token)

    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
        //console.log(config)
    }
    return config;

    }, 
    error=>Promise.reject(error)
);