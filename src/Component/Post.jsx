import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUser, isLoggedIn } from '../auth'
import userContext from '../context/userContext'

function Post( {post={ title:"This is Default Post Title" , content: " This is Default Post Content"}, deletePost}) {

  const userContextData=useContext(userContext)

  const printDate=(numbers)=>{
    return new Date(numbers).toLocaleString()
  }

  const [loggedUser,setLoggedUser]=useState({})
  const [loggedIn,setLoggedIn]=useState(false)

  useEffect( ()=>{

    setLoggedUser(getCurrentUser())
    setLoggedIn(isLoggedIn())

  },[])


  return (
    
    <Card className='shadow-sm mt-3 '>
        <CardBody>
            <h3>{ post.title } </h3>

            <CardText>
              <h10>Posted BY <b ><Link to={`/user-profile/${post.user.userId}` } style={{ color: 'black' }}>{post.user.name}</Link></b> on <b>{ printDate(post.createdAt)}</b> Update At : <b>{ post.createdAt !== post.updateAt ?  printDate(post.createdAt) : ' Not Yet Updated'}</b>  </h10>

            </CardText>

            <CardText dangerouslySetInnerHTML={ {__html:post?.content?.substring(0,50)+'...'} }>
                
            </CardText>

            <div>
                <Link className='btn btn-secondary' to={'/posts/'+post.postID}> Read More </Link>

                { 
                  userContextData.user.login && ( loggedUser.userId==post.user.userId ) ?
                  <Button onClick={()=> deletePost(post.postID)} color='dark' className='ms-2'> Delete </Button> :''
                }
                { 
                  userContextData.user.login && ( loggedUser.userId==post.user.userId ) ?
                  <Button tag={Link} to={`/user/update-blog/${post.postID}`} color='warning' className='ms-2'> Update </Button> :''
                }
            </div>
        </CardBody>
    </Card>

  )
}

export default Post
