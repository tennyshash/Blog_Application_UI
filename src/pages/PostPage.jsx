import { useEffect } from "react"
import { FaThumbsUp } from "react-icons/fa";
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Card, CardBody, CardText, Col, Container, Input, Label, Row } from "reactstrap"
import { getCurrentUser, isLoggedIn } from "../auth"
import Base from "../Component/Base"
import { BASE_URL } from "../Services/helper"
import { loadSinglePost } from "../Services/post-service"
import { createComment, deleteCommentfromServer } from "../Services/comment-service"
import { getLikesonPost, likesPost, unlikePost } from "../Services/like-service"
import { IconContext } from "react-icons";
import UserProfile from "./UserProfile";
import { followUser, unfollowUser } from "../Services/user-service";

const PostPage=()=>{

    const {postID}=useParams()
    const [post,setPost]=useState(null)
    const [comment,setComment] =useState({
        content:''
    })

    const [totalLikes,setTotalLikes]=useState(null)
    const [loggedUser,setLoggedUser]=useState(undefined)

    useEffect ( ()=>{

        post && (

            getLikesonPost(post.postID)
                .then(data =>{

                    setTotalLikes(data.length)
                    console.log(data)

                }).catch( error =>{
                    console.log(error)
                })
        )
            
    })

    useEffect( ()=> {

        setLoggedUser(getCurrentUser())

        // load post of postID
        loadSinglePost(postID).then(data=>{

            setTotalLikes(data.likes.length)
            console.log(data);
            setPost(data)

        }).catch( error=>{

            console.log(error)
            toast.error(error.response?.data.message)
            //toast.error("Error in Loading Post")
        })

    },[])


    //console.log(loggedUser)

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

                window.location.reload(true)

            }).catch( error=>{

                toast.error(error.response.data.message)
                console.log(error)
                //toast.error(error)

            })
            

    }

    const [isLike,setIsLike]=useState(false)
    const [colour,setColour]=useState('black')
    
/* Methods For Likes    */
    const handleClick=(postID)=>{
        //console.log(loggedUser)

        console.log(isLike)

        isLike ? handleDislike(postID) : handlelike(postID) 
        setIsLike(!isLike)

    }

    const handlelike=(postID)=>{
        //console.log(post)

        likesPost(loggedUser.userId,postID)
            .then(data=>{

                setColour("cornflowerblue");
                //setLike(post.likes.length)
                
                // setPost({
                //     ...post,likes:[...post.likes,data]
                // })

                data.likes?.map( (like)=>{
                    if(like.userID===getCurrentUser()?.userId){
                        setColour("cornflowerblue")
                        setIsLike(true)
                    }
                })

                setTotalLikes(post.likes.length)
                    // console.log(data)
                    // console.log(post)

                toast.success("Liked")

            }).catch(error=>{
                console.log(error)
                toast.error(error)
            })

    }
    const handleDislike=(postID)=>{

        unlikePost(loggedUser.userId,postID)
            .then(data=>{

                setColour("black")
                //setLike(post.likes.length)

                console.log(data)
                toast.success("Un-Liked")

            }).catch(error=>{
                console.log(error)
                toast.error(error.response.data)
            })

    }

/*  Method For Follow   */

const [isClicked,setIsClicked]=useState(false)

const handleClickFollow=(followerId,followingId)=>{

    isClicked ? handleUnFollow(followerId,followingId) : handleFollow(followerId,followingId) 
    setIsClicked(!isClicked)

  }
  const handleUnFollow=(followerId,followingId)=>{
      unfollowUser(followerId,followingId)
        .then( data=>{
          //console.log(data)
          toast.success(data.message)

        })
        .catch( error=>{
          //console.log(error)
          toast.error("Error")
        })
  }
  const handleFollow=(followerId,followingId)=>{
      followUser(followerId,followingId)
        .then(data=>{

          //console.log(data)
          toast.success(data.message)

        }).catch(error=>{
          //console.log(error)
          toast.error("Error")
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
                                            Posted BY <b><Link to={`/user-profile/${post.user.userId}` } style={{ color: 'black' }}>{post.user.name}</Link></b> on <b>{ printDateTime(post.createdAt)}</b>
{/*  Follow User Button    */}              {
                                                isLoggedIn() && (
                                                    loggedUser.userId!=post.user.userId ?
                                                    <Button  
                                                        onClick={()=> handleClickFollow(loggedUser.userId,post.user.userId)}
                                                        color='warning' 
                                                        style={{float:'right'}}> 
                                                        <i style={ {color:'black'}}> Follow User</i></Button>
                                                    :   ''
                                                )
                                            }
                                            
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
                <Row className="my-4">
                    <Col md={2}>
{/* Button for likes */}
                        {
                            getCurrentUser() ? 
                                <IconContext.Provider value={ { color: colour , size: "3em"}}
                                >
                                    <Row className="ms-2">
                                        <Link onClick={()=>handleClick(post.postID)}>
                                            <FaThumbsUp className="mt-2"  id={'search-icon'}/>
                                        </Link>
                                    </Row>
                                    <Row className="ms-1 mt-2">
                                        <b>Like : {totalLikes}</b>
                                    </Row>
                                </IconContext.Provider>
                            :
                                <IconContext.Provider value={ { color: colour , size: "3em"}}
                                >
                                    <Row className="ms-2">
                                        <Link >
                                            <FaThumbsUp className="mt-2"  id={'search-icon'}/>
                                        </Link>
                                    </Row>
                                    <Row className="ms-1 mt-2">
                                        <b>Like : {totalLikes}</b>
                                    </Row>
                                </IconContext.Provider>
                        }

                    </Col>

 {/* Comment Part Of UI */}
                    <Col md={
                        {
                            size:8,
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