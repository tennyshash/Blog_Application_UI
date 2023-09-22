import React, { useEffect, useState }   from 'react'
import { toast } from 'react-toastify'
import { Form } from "reactstrap"
import { Button, Card, CardBody,  CardFooter,  CardHeader,  Container,  Input,  Label,  Table } from 'reactstrap'
import { getCurrentUser, isLoggedIn } from '../../auth'
import { loadPostByUser, loadSinglePost } from '../../Services/post-service'
import { getUserbyId, updateUserService } from '../../Services/user-service'

const ViewUserProfile = ( {user }) => {


    const [loggedUser ,setLoggedUser]=useState(null)
    const [login,setLogin] = useState(false)
    const [updateUser,setUpdateUser]= useState(user)

    useEffect( ()=>{

        setLoggedUser(getCurrentUser())
        setLogin(isLoggedIn())

    },[])

    const handleChange=(event,fieldName)=>{
      setUpdateUser( { 
        ...updateUser,
        [fieldName]:event.target.value}
      )
    }

    const tableData=()=>{
      return(
        <Table responsive striped hover bordered={true} className='mt-5'>
            {/* <thead>
              <tr>
                <th>Subject</th>
                <th>Info</th>
                <th>Actions</th>
              </tr>
            </thead> */}
            <tbody>
              {/* <tr>
                <td >
                  User-ID
                </td>
                <td>
                  {user.userId}
                </td>
              </tr> */}
              <tr>
                <td >
                  User Name
                </td>
                <td>
                  {user.name}
                </td>
              </tr>
              <tr>
                <td >
                  User Email
                </td>
                <td>
                  {user.email}
                </td>
              </tr>
              <tr>
                <td >
                  About
                </td>
                <td>
                  {user.about}
                </td>
              </tr>
              <tr>
                <td>
                  ROLE
                </td>
                <td>
                  {user?.roles?.map( (role)=>{
                    return (
                      <div >
                        {role.roleName}
                      </div>
                    )
                  } )
                  }
                </td>
              </tr>
            </tbody>
          </Table>
      )
    }
    const tableDataUpdate=(event)=>{
      return(
        <div>
        <Table responsive striped hover bordered={true} className='mt-5'>
          {/* {JSON.stringify(updateUser)} */}
            <tbody>
              <tr>
                <td>
                  ROLE
                </td>
                <td>
                  {updateUser?.roles?.map( (role)=>{
                    return (
                      <div >
                        {role.roleName}
                      </div>
                    )
                  } )
                  }
                </td>
              </tr>
              <tr>
                <td >
                  User Email
                </td>
                <td>
                  {updateUser?.email}
                </td>
              </tr>
              <tr>
                <td >
                  User Name
                </td>
                <td>
                <Input 
                  type="text" 
                  id="name"
                  name="name"
                  value={updateUser?.name}
                  onChange={ (event)=> handleChange(event,'name') }  
                  />
                </td>
              </tr>
              
              <tr>
                <td >
                  About User
                </td>
                <td>
                  <Input 
                    type="text" 
                    id="about"
                    name="about"
                    value={updateUser?.about}
                    onChange={ (event)=> handleChange(event,'about') }  
                  />
                </td>
              </tr>
              <tr>
                <td >
                  User Password
                </td>
                <td>
                  <Input 
                    type="password" 
                    id="password"
                    name="password"
                    placeholder='Min 3 Char & Max 10'
                    onChange={ (event)=> handleChange(event,'password') }  
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <Button color='warning' className=''  style={{float:'left'}} onClick={ handleUpdateProfile}>Update Profile </Button>
          </div>
          
          
      )
    }

    const handleUpdateProfile=()=>{
      console.log(updateUser)

      updateUserService(updateUser.userId,updateUser)
        .then( data=>{

          console.log(data)
          toast.success("Profile Updated")

        }).catch( error=>{

          console.log(error)
          toast.error("Try Again ..!")
        })
    }
    
  return (
    <div>
      <Card className='mt-3  border-0'  outline color='secondary' >
        <CardBody>
          <CardHeader>
            {
              (loggedUser?.userId == user.userId) ? <h3 style={{ textAlign: 'center' }} >Welcome User : {user.name} </h3> : <h3 > User's Profile : {user.name} </h3> 
            }
          </CardHeader>
        
          {
              (loggedUser?.userId == user.userId ) ? tableDataUpdate() : tableData() 
          }
          
          
        </CardBody>
      </Card>
    </div>
  )
}

export default ViewUserProfile
