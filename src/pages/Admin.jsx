
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Col, Container, Input, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap'
import { isAdmin } from '../auth'
import Base from '../Component/Base'
import { deleteUserService, loadAllUserservie, updateRole } from '../Services/user-service'

function Admin() {

  const navigate=useNavigate()

  const [roleID,setRoleID]=useState(102)
  const [rName,setRName]=useState(null)

  const [allUser,setAllUser]=useState({
    content:[], // as intially we get null so we were getting error so we took empty array
    lastPage:false,
    pageNumber:'',
    pageSize:'',
    totalElements:'',
    totalPages:''
})

    useEffect( ()=>{

        changePage(0)

    },[] )

    const changePage=(pageNumber=0,pageSize=8)=>{

        if(pageNumber>allUser.pageNumber && allUser.lastPage)   return
        if(pageNumber<allUser.pageNumber && allUser.pageNumber==0)   return

        loadAllUserservie(pageNumber,pageSize).then(data=>{
            
            setAllUser( data)
            window.scroll(0,0)

        }).catch(error =>{
            toast.error("Error -->Un-Authorised ..! ")
            navigate('/')
        })
    }

  const deleteUser=(userid)=>{

    // console.log(userid)

    //api CAll
    deleteUserService(userid)
      .then( data =>{
          //console.log(data)
          toast("User Deleted")

          let newUserContent =allUser.content.filter(u=>u.userId!=userid)
          setAllUser({...allUser,content: newUserContent })

          window.location.reload(true)

      }).catch( error=>{

          console.log(error)
          toast.error("Unable to Delete")
          
      })
}
  const toAdmin=(userId)=>{

    updateRole(userId,101)
      .then( data=>{
        console.log(data)
        toast.success("Profile Updated")
      })
      .catch(error=>{
        console.log(error)
        toast.error("Failed")

      })

      window.location.reload(true)

  }

  const toNormal=(userId)=>{

    updateRole(userId,102)
      .then( data=>{
        console.log(data)
        toast.success("Profile Updated")
      })
      .catch(error=>{
        console.log(error)
        toast.error("Failed")

      })
      window.location.reload(true)

  }
  
  return (
    <Base>
      <div className="container-fluid">
        <Row>
            <Col md={ 
                    {size:12}
                } >

                <h3 className='mt-3 ms-4  border-0' > User Count : {allUser.totalElements} </h3> 

                {
                  <Container className='mt-2 ms-5' >
                    <Card>
                      <CardBody>
                        <Table hover striped responsive size='sm' >
                          <thead>
                            <th> User ID </th>
                            <th> User Name </th>
                            <th > User Email </th>
                            <th> User Role </th>
                            <th className='text-center'> Action </th>
                          </thead>
                          <tbody className='mt-1'>
                            {
                              allUser.content.map( (user,index)=>(
                                <tr className='mt-1' key={index}>
                                  <td>{user.userId}</td>
                                  <td>{user.name}</td>
                                  <td ><Link className='mt-1' style={{ color: 'black' }} to={`/user-profile/user-posts/${user.userId}`}>{user.email}</Link></td>
                                  <td>{
                                    user.roles.map( (role)=>{
                                      return (
                                        <div>{role.roleName}</div>
                                      )
                                    })
                                  }</td>
                                  <td className='text-center'> 
                                    <Button className='' onClick={ ()=>deleteUser(user.userId) } > Delete</Button>
                                    <Button className='mt-1 ms-5'  size='sm' onClick={ ()=>toAdmin(user.userId) } > Admin</Button>
                                    <Button className='mt-1 ms-5' size='sm' onClick={ ()=>toNormal(user.userId) } > Normal</Button>
                                  </td>
                                </tr>
                              ) )
                            }
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Container>
                } 

{/* Pagination                 */}

                <Container className="mt-2">
                  <Pagination >
                      <PaginationItem onClick={ ()=> changePage(allUser.pageNumber-1)} disabled ={allUser.pageNumber==0}>
                          <PaginationLink previous>
                              Previous
                          </PaginationLink>
                      </PaginationItem>

                      {
                          [ ...Array(allUser.totalPages)].map( (item,index)=>(
                              <PaginationItem onClick={ ()=>changePage(index) } active={index==[allUser.pageNumber]} key={index}>
                                  <PaginationLink>
                                      {index+1}
                                  </PaginationLink>
                              </PaginationItem>
                          ) ) 
                      }

                      <PaginationItem onClick={ ()=> changePage(allUser.pageNumber+1)} disabled ={allUser.lastPage}>
                          <PaginationLink next>
                              Next
                          </PaginationLink>
                      </PaginationItem>
                  </Pagination>
                </Container>
            </Col>
        </Row>
      </div>
    </Base>
  )
}

export default Admin