import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap"
import { getCurrentUser, isLoggedIn } from "../auth"
import Base from "../Component/Base"
import { BASE_URL } from "../Services/helper"
import { loadSinglePost } from "../Services/post-service"
import { createComment, deleteCommentfromServer } from "../Services/comment-service"

const PostPage=()=>{

    const {postID}=useParams()
    const [post,setPost]=useState(null)
    const [comment,setComment] =useState({
        content:''
    })

    const [loggedUser,setUser]=useState(undefined)

    useEffect( ()=> {

        // load post of postID
        loadSinglePost(postID).then(data=>{
            console.log(data);
            setPost(data)
        }).catch( error=>{
            console.log(error)
            toast.error(error.response.data.message)
            //toast.error("Error in Loading Post")
        })

        
        setUser(getCurrentUser())

    },[])

    const printDateTime=(numbers)=>{
        return new Date(numbers).toLocaleString()
    }
    const printDate=(numbers)=>{
        return new Date(numbers).toLocaleDateString()
    }

    const submitComment=()=>{

        createComment(comment,post.postID,loggedUser.userId)
            .then(data=>{
                toast.success("Comment Added")
                //console.log(data)

                setPost({
                    ...post,comments:[...post.comments,data.data]
                })

                setComment({
                    content:''
                })
            }).catch(error=>{
                toast.error(error.response.data.message)
                //toast.error("Comment Could'nt be Added")
                //console.log(error)
            })
    }

    const disableDelete=(commentuserId,postUserID)=>{
        if( isLoggedIn()==false )   return true
        else if( postUserID ==loggedUser?.userId) return false
        else if( commentuserId!=loggedUser?.userId )    return true
        else return false
    }

    const deleteComment=(commentID)=>{
        //console.log(commentID)

        deleteCommentfromServer(commentID)
            .then( data=>{

                //console.log(data)
                toast.success("Comment Deleted")

            }).catch( error=>{

                toast.error(error.response.data.message)
                //console.log(error)
                //toast.error(error)

            })

    }

    return(
        <Base>
            <Container className="mt-4">
                <Link  to='/'>Home </Link> {''} / {post && ( <Link  to="" > {post.title} </Link>)}

                <Row>
                    <Col md={{
                        size: 12
                    }}>
                        <Card className="mt-3 shadow">
                            {
                                (post) && (
                                    <CardBody>

                                        <CardText>
                                            Posted BY <b>{post.user.name}</b> on <b>{ printDateTime(post.createdAt)}</b>  
                                        </CardText>

                                        <CardText>
                                            <span className="text-muted">
                                                {post.category.categoryTitle}
                                            </span>
                                        </CardText>

                                        <div className="divder" style={{
                                            width:'100%',
                                            height:'1px',
                                            background:'#e2e2e2'
                                        }}></div>

                                        <CardText className="mt-3 ps-2"> 
                                            <h2> {post.title} </h2> 
                                        </CardText>

                                        <div className="image-container mt-4 shadow " style={ {maxWidth:'50%'} }>
                                            <img className="img-fluid" src={BASE_URL+'/post/image/'+ post.imageName} alt="" />
                                        </div>

                                        <CardText className="mt-5" dangerouslySetInnerHTML={ {__html:post.content} }>

                                        </CardText>

                                    </CardBody>

                                )
                            }
                        </Card>

                    </Col>
                </Row>
 {/* Comment Part Of UI */}
                <Row className="my-4">
                    <Col md={
                        {
                            size:9,
                            offset:1
                        }
                    }>
                        <h4>Comments ( { post ? post?.comments?.length : 0 } ) </h4>

                        {
                            post && post?.comments?.map( (com,index)=>(
                                <Card className="mt-2" key={index}>
                                    <CardBody>
                                        <CardText>
                                            BY <b>{com.userName}</b> on <b>{ printDate(post.createdAt)}</b>
                                            <Button 
                                                disabled={ disableDelete(com.userId,post.user.userId) } 
                                                onClick={ ()=> deleteComment(com.commentID)}
                                                style={ {float:'right'} } 
                                                outline color="dark"  
                                                size="sm"

                                                >Delete</Button>
                                        </CardText>

                                        <CardText>
                                            <h5>{com.content}</h5>
                                        </CardText>

                                    </CardBody>
                                </Card>
                            ) )
                        }
{/* submit comment */}
                        <Card className="mt-2">
                            <CardBody>
                                <Input 
                                    type="textarea" 
                                    placeholder="Comment Something Here  -->Login : Required<--  "
                                    value={comment.content}
                                    onChange={(event)=>setComment( {content:event.target.value } )} />

                                <Button  disabled={!isLoggedIn() | (comment.content.trim()==='')} onClick={submitComment} className="mt-2" color="warning">Submit</Button>

                            </CardBody>
                        </Card>

                    </Col>
                </Row>

            </Container>
        </Base>
    )
}

export default PostPage