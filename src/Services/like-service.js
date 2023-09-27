import { authAxios } from "./helper"

// Like A Post

    export const likesPost=(userID,postID)=>{
        return authAxios
            .post(`/user/${userID}/post/${postID}/like`)
            .then(response => response.data)

    }

// Unlike A Post

    export const unlikePost=(userID,postID)=>{
        return authAxios
            .delete(`/user/${userID}/post/${postID}/dislike`)
            .then(response => response.data)

    }

// Get Likes on Post

    export const getLikesonPost=(postID)=>{
        return authAxios
            .get(`/like/post/${postID}`)
            .then( response => response.data)
    }

