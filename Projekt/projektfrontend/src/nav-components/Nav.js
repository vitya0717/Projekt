import React from 'react'

import AdminNavbar from './AdminNavbar'
import UserNavbar from './UserNavbar'
import VisitorNavbar from './VisitorNavbar'



const Nav = ({userData, currentLoginLevel, setLoginLevel}) => {
  return (
    currentLoginLevel === "Admin" ? 
    <AdminNavbar userData={userData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} /> : 
    currentLoginLevel === "User" ? <UserNavbar currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} /> : 
    <VisitorNavbar currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />
  )
}

export default Nav