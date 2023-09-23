import React, {  useContext, useEffect, useState  } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, CardBody, Col, Container, Row, Table } from 'reactstrap'
import Base from '../../Component/Base'
import ViewUserProfile from '../../Component/user/ViewUserProfile'
import UsersPost from '../../Component/user/UsersPost'
import { getUserbyId } from '../../Services/user-service'
import { Link } from 'react-router-dom'
import UserProfile from '../UserProfile'
import userContext from '../../context/userContext'

const  ProfileInfo=()=> {


  const [user,setUser] =useState( null )

  const userContextData=useContext(userContext)
  //console.log(user)

  useEffect( ()=>{

    setUser(userContextData.user)

  },[])

  // const userView=()=>{

  //   return(

  //     <Row>
  //       <Col md={ { size:8, offset: 2} }>
  //         <div>
  //            <ViewUserProfile user={user} />
  //         </div>
  //         <div className=' mt-3'>
  //           <Card className='border-0'>
  //             <CardBody>
  //               <Button>User Category</Button>
  //               <Button className='ms-5' tag={Link} to={`/profile/user-posts`}>User Post</Button>
  //             </CardBody>
  //           </Card>
  //         </div>
  //       </Col>
  //     </Row>
  //   )
  // }

  return (
    <div>
      { user ? <UserProfile/> :'Loading User Date .!!' }
    </div>
  )
}

export default ProfileInfo
