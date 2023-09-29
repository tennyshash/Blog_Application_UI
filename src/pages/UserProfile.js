import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../Component/Base'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Col,  Label,  Row,  } from 'reactstrap'
import ViewUserProfile from '../Component/user/ViewUserProfile'
import { followUser, getUserbyId, unfollowUser } from '../../src/Services/user-service'
import { getCurrentUser, isAdmin, isLoggedIn } from '../auth'
import { toast } from 'react-toastify'

const UserProfile = () => {

    const { userId } =useParams()
    const [user,setUser] =useState( null )
    const [loggedUser,setLoggedUser]=useState(null)

  useEffect( ()=>{

      getUserbyId(userId)
        .then( data=>{
          //console.log(data)
          setUser({...data})

        })
      
        setLoggedUser(getCurrentUser())

        setIsClicked()

  },[])

  const [isClicked,setIsClicked]=useState(false)

  const handleClick=(followerId,followingId)=>{

    isClicked ? handleUnFollow(followerId,followingId) : handleFollow(followerId,followingId) 
    setIsClicked(!isClicked)

  }
  const handleUnFollow=(followerId,followingId)=>{
      unfollowUser(followerId,followingId)
        .then( data=>{
          console.log(data)
          toast.success(data.message)

          window.location.reload(true)
        })
        .catch( error=>{
          console.log(error)
          toast.error("Error")
        })
  }
  const handleFollow=(followerId,followingId)=>{
      followUser(followerId,followingId)
        .then(data=>{

          console.log(data)
          toast.success(data.message)

          setLoggedUser( {...loggedUser,following:[...loggedUser.following,user] })
          setUser( {...user,followers:[...user.followers,loggedUser] })
          
          // console.log(loggedUser)
          // console.log(user)

          //window.location.reload(true)

        }).catch(error=>{
          console.log(error)
          toast.error("Error")
        })

  }

  const userView=()=>{

    return(

      <div>
        <Row>
          <Col md={ { size:8, offset: 2} }>
            <div>
              <ViewUserProfile user={user} />
            </div>
          </Col>
          <Col md={ {size:2}} className='mt-3'>
            <Row md={2}>
              <Button className='ms-3 mt-3' tag={Link} to={`/user-profile/user-posts/${user.userId}`}>User Post</Button>

{/*  Follow User Button    */}              
              {
                  isLoggedIn() && (
                    loggedUser.userId!=user.userId ?
                    <Button 
                      onClick={()=>handleClick(loggedUser.userId,user.userId)} 
                      color='warning' 
                      style={{float:'right'}} 
                      className='ms-3 mt-3'> 
                      <i style={ {color:'black'}}> Follow User</i></Button>
                    :   ''
                  )
              }
              
              {   
                isLoggedIn() ?  
                <>
                  <Button outline color='warning' className='ms-3 mt-3' tag={Link} > <i style={ {color:'black'}}> Followers : {user.followers.length} </i></Button>
                  <Button outline color='warning' className='ms-3 mt-3' tag={Link} > <i style={ {color:'black'}}> Following : {user.following.length} </i></Button>
                </> :''
              }
              
            </Row>
            
            {/* <Row md={2}>
              {
                  isAdmin() ?
                  <Button className='ms-3 mt-3' color='danger' tag={Link} to={`/user/admin`}>Admin </Button> : ''

              }
            </Row> */}
            
          </Col>
        </Row>
      </div>
    )
  }


  return (
    <div>
        <Base>
            { user ? userView() :'Loading User Date .!!' }
        </Base>
    </div>
  )
}

export default UserProfile