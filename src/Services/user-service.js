import { authAxios, myAxios } from "./helper";

// SignUp
export const signUp=(user)=>{

    return myAxios
        .post('/home/auth/register',user)
        .then( (response) => response.data )

}

// Login 
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
    
// Delete  USER 

    export const deleteUserService=(userId)=>{
        return authAxios
            .delete(`/users/${userId}`)
            .then(response => response.data)
    }

// GET ALl  USER 

    export const loadAllUserservie=(pageNumber,pageSize)=>{
        return authAxios
            .get(`/users/?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=createdAt&sortDir=desc`)
            .then(response => response.data)
    }

// Update USer 

    export  const updateUserService=(userId,user)=>{
        return authAxios
            .put(`/users/${userId}`,user)
            .then( response => response.data)
    }

// Update Role
    
    export const updateRole=(userID,roleID)=>{
        return authAxios
            .put(`/users/${userID}/role/${roleID}`)
            .then()
    }

//Follow User

    export const followUser=(followerId,followingId)=>{
        return authAxios
            .post(`/users/${followerId}/following/${followingId}/follow`)
            .then(response => response.data)
    }

//Un-Follow User

export const unfollowUser=(followerId,followingId)=>{
    return authAxios
        .put(`/users/${followerId}/following/${followingId}/unfollow`)
        .then(response => response.data)
}