import React, { useContext , useEffect, useState } from 'react'
import {  Container } from 'reactstrap'
import { deletePostService, loadPostByTitle, loadPostByUser } from '../../Services/post-service'
import { toast } from 'react-toastify'
import InfiniteScroll from "react-infinite-scroll-component"
import Post from '../Post'
import Base from '../Base'
import { useParams } from 'react-router-dom'

const PostByTitle = () => {

    const keyword= useParams()

    const [userPosts,setUserPosts]=useState({
        content:[], // as intially we get null so we were getting error so we took empty array
        lastPage:false,
        pageNumber:'',
        pageSize:'',
        totalElements:'',
        totalPages:''
    })
  
    const [currentPage,SetCurrentPage]=useState(0)
  
    useEffect( ()=>{
     
      loadPostdata(currentPage)
  
    },[currentPage])
  
      const  changePageInfinite=()=>{
          console.log("Page Changed")
          SetCurrentPage(currentPage+1)
      }
  
  
  
    function loadPostdata(pageNumber=0,pageSize=5){
  
      if(pageNumber>userPosts.pageNumber && userPosts.lastPage)   return
      if(pageNumber<userPosts.pageNumber && userPosts.pageNumber==0)   return
  
  
      loadPostByTitle(keyword.input,pageNumber,pageSize)
        .then(data=>{
  
          //console.log(data)
          setUserPosts({
                  content:[...userPosts.content,...data.content],
                  lastPage:data.lastPage,
                  pageNumber:data.pageNumber,
                  pageSize:data.pageSize,
                  totalElements:data.totalElements,
                  totalPages:data.totalPages
              })
          //console.log(userPosts)
          
        }).catch(error=>{
          
          console.log(error)
          toast.error("Unable To Load Post")
        })
    }
  
    //Function to delete Post
  const deletePost=(posteId)=>{
  
      console.log(posteId)
  
      //api CAll
      deletePostService(posteId)
        .then( data =>{
          //console.log(data)
          toast("Post Deleted")
  
          let updatedContent= userPosts.content.filter( p=> p.postID!=posteId)
          setUserPosts({...userPosts, content: updatedContent , totalElements: updatedContent.length})
  
        }).catch( error=>{
  
          console.log(error)
          toast.error("Unable to Delete")
          
        })
    }
    //console.log(userContextData.user.data.name)
  
    return (
  
      <Base>
        <div className="wrapper">
        <Container className='  mt-3' >
          <h3 className='my-2  mt-2 divider'> Post Count : {userPosts?.totalElements}</h3>
  
          <InfiniteScroll
              dataLength={userPosts.content.length}
              next={changePageInfinite}
              hasMore={!userPosts.lastPage}
              loader={<h4>Loading...</h4>}
              endMessage={
                  <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                  </p>
              }
            >
              {
                userPosts?.content.map( (post,index)=>{
                  return(
                    <Post post={post} kye={index} deletePost={deletePost} />
                  )
                })
              }
          </InfiniteScroll>
          
        </Container>
      </div>
      </Base>
        
  
    )
  }

export default PostByTitle