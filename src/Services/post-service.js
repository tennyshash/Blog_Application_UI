import { authAxios, myAxios } from "./helper"

//create post
    export const createNewPost=(postData)=>{

        //Console.log(postData);

        return authAxios
            .post(`/user/${postData.userId}/category/${postData.categoryID}/posts`,postData)
            .then( response => response.data);
    };

//Update Post 

    export const updatePostService=(post,postID)=>{

        //console.log(post )

        return authAxios
            .put(`/posts/${postID}`,post)
            .then( response=> response.data)

    }

//Get all Posts 

    export const loadAllPost=(pageNumber,pageSize)=>{

        return myAxios
            .get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=createdAt&sortDir=desc`)
            .then( response => response.data)
    };

//Load Single Post 

export const loadSinglePost=(postID)=>{

    return myAxios
        .get(`/posts/` + postID)
        .then( response => response.data)
    };

//Load  Post by User 

    export const loadPostByUser=(userID,pageNumber,pageSize)=>{

        return authAxios
            .get(`/user/${userID}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=createdAt&sortDir=desc`)
            .then( response => response.data)
        };


// Upload Post banner image

    export const uploadPostImage=(image,postID)=>{
        let formData= new FormData()
                formData.append("image",image)
        
        return authAxios
            .post(`/posts/${postID}/image/upload`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            .then(response=> response.data);

    };

// Get Post BY Categories

    export const loadPostByCategory=(categoryID,pageNumber,pageSize)=>{
        return  myAxios
            .get(`/category/${categoryID}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=createdAt&sortDir=desc`)
            .then( response => response.data)
    }

// Delete Post

    export const deletePostService=(postID)=>{
        return authAxios
            .delete(`/posts/${postID}`)
            .then( response=>response.data)
    }

// Load Post By Title

    export const loadPostByTitle=(keyword,pageNumber,pageSize)=>{
        return myAxios
            .get(`/posts/search/${keyword}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=createdAt&sortDir=desc`)
            .then( response=> response.data)
    }
    