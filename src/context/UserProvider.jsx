import React, { useEffect, useState } from 'react'
import { getCurrentUser, isLoggedIn } from '../auth'
import userContext from './userContext'

function UserProvider( {children} ) {

  const [user,setUser]=useState({
      data:{},
      login:false
    })

  useEffect( ()=>{

    setUser({
      data:getCurrentUser(),
      login: isLoggedIn()
    })
    
  },[])

  return (

    <userContext.Provider value={{user,setUser}}>
        {children}
    </userContext.Provider>

  )
}

export default UserProvider