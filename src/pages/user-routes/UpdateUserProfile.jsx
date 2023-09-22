import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Base from '../../Component/Base'
import ViewUserProfile from '../../Component/user/ViewUserProfile'
import { getUserbyId } from '../../Services/user-service'

const UpdateUserProfile = () => {

  const [user,setUser]= useState(null)
  const {userId} = useParams()

  const laodUser=(userId)=>{
    getUserbyId(userId)
      .then(data =>{
        console.log(data)
        setUser({...data})
      })
  }

  useEffect( ()=>{

    console.log("Success")
    laodUser(userId)

  },[])

  return (
    <Base>
    
    </Base>
  )
}

export default UpdateUserProfile