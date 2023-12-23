import React from 'react'

const AdminPage = ({currentLoginLevel, setLoginLevel}) => {
  return (
    currentLoginLevel === "Admin" ?
    <div style={{color:"red"}}>Admin</div> : <div>You are not authorized!</div>
  )
}

export default AdminPage;