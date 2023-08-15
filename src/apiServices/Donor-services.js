import BASE_URL ,{ myAxios } from "./BaseUrl"

export const signUp = (donor)=>{
    return myAxios.post(`${BASE_URL}/api/donors/register`,donor).then((response)=>response.data)
 }
 
 export const login = (loginDetail)=>{
    return myAxios.post(`${BASE_URL}/api/donors/login`,loginDetail).then((response)=>response.data)
 }