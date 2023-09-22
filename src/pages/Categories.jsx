import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../Component/Base'
import { Container, Row , Col} from "reactstrap";
import CategorySideMenu from "../Component/CategorySideMenu";
import { loadPostByCategory } from '../Services/post-service';
import { toast } from 'react-toastify';
import Post from '../Component/Post';
import InfiniteScroll from 'react-infinite-scroll-component';

import { deletePostService } from '../Services/post-service';

function Categories() {

    const { categoryID } = useParams()

    const [posts,setPosts]=useState({
        content:[], // as intially we get null so we were getting error so we took empty array
        lastPage:false,
        pageNumber:'',
        pageSize:'',
        totalElements:'',
        totalPages:''
    })

    const [currentPage,SetCurrentPage]=useState(0)

    useEffect( ()=>{

        changePostPage(currentPage)
        

    },[currentPage])


    const changePostPage=(pageNumber=0,pageSize=5)=>{

        if(pageNumber>posts.pageNumber && posts.lastPage)   return
        if(pageNumber<posts.pageNumber && posts.pageNumber==0)   return     
            

        //loading post by category
        loadPostByCategory(categoryID,pageNumber,pageSize)
            .then(data=>{

                //console.log(data)
                setPosts({
                    content:[...posts.content,...data.content],
                    lastPage:data.lastPage,
                    pageNumber:data.pageNumber,
                    pageSize:data.pageSize,
                    totalElements:data.totalElements,
                    totalPages:data.totalPages

                })

                //location.reload()

            }).catch(error=>{
                //console.log(error)
                toast.error(" Error in Loading Post")
            })
    }

    const changePageInfinite=()=>{
        console.log("Page Changed")
        SetCurrentPage(currentPage+1)
        
    }

    //Function to delete Post
  const deletePost=(posteId)=>{

        console.log(posteId)

        //api CAll
        deletePostService(posteId)
        .then( data =>{
            //console.log(data)
            toast("Post Deleted")

            let newPostContent= posts.content.filter( p=> p.postID !=posteId)
            setPosts( { ...posts , content : newPostContent , totalElements : newPostContent.length})

        }).catch( error=>{

            console.log(error)
            toast.error("Unable to Delete")
            
        })
  }


    return (
        <Base>
            <Container className="mt-2">
                <Row>
                    <Col md={3} className='pt-3 mt-4'>
                        <CategorySideMenu />
                    </Col>
                    <Col md={9}>
                       <h4>Blogs Count : {posts.totalElements} </h4>
                       <InfiniteScroll 
                            dataLength={posts.content.length}
                            next={changePageInfinite}
                            hasMore={!posts.lastPage}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                                </p>
                            }

                       > 
                            {    
                                posts.content && posts.content.map( (post,index)=>{
                                    return (
                                        <Post post={ post} deletePost={deletePost} />
                                    )
                                } )
                            }
                            {
                                posts.length<=0 ? <h3>No Post In This Category</h3> :'' 
                            }

                       </InfiniteScroll>

                    </Col>
                </Row>
            </Container>
        </Base>
    )
}

export default Categories
