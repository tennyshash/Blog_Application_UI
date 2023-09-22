import { authAxios, myAxios } from "./helper"

//load All Categories
    export const loadAllCategories=()=>{
        return myAxios
            .get('/categories/all')
            .then(response=>{ return response.data})
    }

//Create Category

    export const creatingCategory=(category)=>{
        return authAxios
            .post(`/categories/`,category)
            .then( response=> response.data)
    }


// //Delete Category

//     export const deletingCategory=(categoryID)=>{
//         return authAxios
//             .delete(`/categories/${categoryID}`)
//             .then( response=> response.data)
//     }
// //Get  Category By ID

//     export const getCategoryById=(categoryID)=>{
//         return authAxios
//             .get(`/categories/${categoryID}`)
//             .then( response=> response.data)
//     }
    