import { authAxios, myAxios } from "./helper";


export const signUp=(user)=>{

    return myAxios
        .post('/home/auth/register',user)
        .then( (response) => response.data )

}

export const loginUser=(loginDetail)=>{

    return myAxios
        .post('/home/auth/login',loginDetail)
        .then( (response) => response.data)
}

// GET USER 

    export const getUserbyId=(userId)=>{
        return myAxios
            .get(`/users/${userId}`)
            .then(response => response.data)
    }

// Update USer 

    export  const updateUserService=(userId,user)=>{
        return authAxios
            .put(`/users/${userId}`,user)
            .then( response => response.data)
    }