import { authAxios } from "./helper";

// Create Comment

    export const createComment = (comment, postID, userId) => {
        return authAxios
            .post(`user/${userId}/post/${postID}/comments/`, comment);
    };

// Create Comment

    export const deleteCommentfromServer = (commentID) => {
        return authAxios
            .delete(`/comments/${commentID}` )
            .then(response=> response.data)
    };

