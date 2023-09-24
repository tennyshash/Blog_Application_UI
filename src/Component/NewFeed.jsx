import { useEffect, useState } from "react"
import React from "react"
import { loadAllPost ,deletePostService} from "../Services/post-service"
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap"
import Post from "./Post"
import { toast } from "react-toastify"
import InfiniteScroll from "react-infinite-scroll-component"

const NewFeed=()=>{

    const [postContent,setPostContent]=useState({
        content:[], // as intially we get null so we were getting error so we took empty array
        lastPage:false,
        pageNumber:'',
        pageSize:'',
        totalElements:'',
        totalPages:''
    })

    const [currentPage,SetCurrentPage]=useState(0)

    useEffect( ()=>{

        changePage(currentPage)

    },[currentPage] )

    const changePage=(pageNumber=0,pageSize=5)=>{

        if(pageNumber>postContent.pageNumber && postContent.lastPage)   return
        if(pageNumber<postContent.pageNumber && postContent.pageNumber==0)   return

        loadAllPost(pageNumber,pageSize).then(data=>{
            
            setPostContent({
                content:[...postContent.content,...data.content],
                lastPage:data.lastPage,
                pageNumber:data.pageNumber,
                pageSize:data.pageSize,
                totalElements:data.totalElements,
                totalPages:data.totalPages
            })

            //console.log(postContent)

            window.scroll(0,0)
        }).catch(error =>{
            toast.error(error.response.data.message)
            //toast.error("Error In Loading Posts ")
        })
    }

    const  changePageInfinite=()=>{
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

            let newPostContent =postContent.content.filter(p=>p.postID!=posteId)
            setPostContent({...postContent,content: newPostContent})

        }).catch( error=>{

            toast.error(error.response.data.message)
            // console.log(error)
            // toast.error("Unable to Delete")
            
        })
        window.location.reload(true)
  }


    return(

    <div className="container-fluid">
        <Row>
            <Col md={ 
                    {size:12}
                } >

                <h3> Blogs Count : {postContent?.totalElements} </h3> 

                <InfiniteScroll
                    dataLength={postContent.content.length}
                    next={changePageInfinite}
                    hasMore={!postContent.lastPage}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {
                        postContent.content.map( (post)=>(
                            <Post post={post} key={post.postID} deletePost={deletePost} />
                        ) )
                    } 
                </InfiniteScroll>

                {/* <Container className="mt-2">
                    <Pagination >
                        <PaginationItem onClick={ ()=> changePage(postContent.pageNumber-1)} disabled ={postContent.pageNumber==0}>
                            <PaginationLink previous>
                                Previous
                            </PaginationLink>
                        </PaginationItem>

                        {
                            [ ...Array(postContent.totalPages)].map( (item,index)=>(
                                <PaginationItem onClick={ ()=>changePage(index) } active={index==[postContent.pageNumber]} key={index}>
                                    <PaginationLink>
                                        {index+1}
                                    </PaginationLink>
                                </PaginationItem>
                            ) ) 
                        }

                        <PaginationItem onClick={ ()=> changePage(postContent.pageNumber+1)} disabled ={postContent.lastPage}>
                            <PaginationLink next>
                                Next
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </Container> */}

            </Col>
        </Row>
    </div>
    )
}
export default NewFeed