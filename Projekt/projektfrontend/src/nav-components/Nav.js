import React from 'react'
import { useEffect } from 'react'

import AdminNavbar from './AdminNavbar'
import UserNavbar from './UserNavbar'
import VisitorNavbar from './VisitorNavbar'



const Nav = ({userData, setUserData, currentLoginLevel, setLoginLevel}) => {

  useEffect(() => {
  }, [currentLoginLevel])

  return (
    currentLoginLevel === "Admin" ? 
    <AdminNavbar userData={userData} setUserData={setUserData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} /> : 
    currentLoginLevel === "User" ? <UserNavbar userData={userData} setUserData={setUserData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} /> : 
    <VisitorNavbar userData={userData} setUserData={setUserData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />
  )
}

export default Nav