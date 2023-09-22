import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../Component/Base'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, Col,  Row,  } from 'reactstrap'
import ViewUserProfile from '../Component/user/ViewUserProfile'
import { getUserbyId } from '../../src/Services/user-service'
import { getCurrentUser } from '../auth'

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

  },[])

  const userView=()=>{

    return(

      <div>
        <Row>
          <Col md={ { size:8, offset: 2} }>
            <div>
              <ViewUserProfile user={user} />
            </div>
          </Col>
          <Col md={ {size:2}}>
            <Row md={2}>
              <Button className='ms-3 mt-3' tag={Link} to={`/user-profile/user-posts/${user.userId}`}>User Post</Button>
            </Row>
            <Row md={2}>
              {
                loggedUser?.userId == userId ?
                  <Button className='ms-3 mt-3' tag={Link} to={`/user-profile/user-category/${user.userId}`}>User Category</Button> : ''

              }
            </Row>
            
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