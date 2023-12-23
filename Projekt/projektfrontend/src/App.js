import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./function-components/Login";
import { jwtDecode } from "jwt-decode";

import AdminPage from "./page-components/AdminPage";
import UserPage from "./page-components/UserPage";
import HomePage from "./page-components/HomePage";
import Nav from "./nav-components/Nav";
import Logout from "./function-components/Logout";
import UserSettings from "./page-components/UserSettings";
import UserOrders from "./page-components/UserOrders";
import { Button, Alert, Snackbar } from "@mui/material";



function App() {

  const ROLES = {
    Visitior: "Visitor",
    User: "User",
    Admin: "Admin",
    Hacker: "Hacker"
  }

  const userData = localStorage.getItem("token");

  const [currentLoginLevel, setLoginLevel] = useState(userData === null ? ROLES.Visitior : ROLES[jwtDecode(userData).role]);

  const [open, setOpen] = useState(false);

  const [severity, setSeverity] = useState("success");

  const [severityMessage, setSeverityMessage] = useState(""); 

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <BrowserRouter>
      <Nav userData={userData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage userData={userData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />} />
        <Route path="/user" element={<UserPage userData={userData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />} />
        <Route path="/login" element={<Login userData={userData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />} />
        <Route path="/logout" element={<Logout userData={userData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />} />
        <Route path="/settings" element={<UserSettings setSeverityMessage={setSeverityMessage} handleClick={handleClick} setSeverity={setSeverity} userData={userData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />} />
        <Route path="/orders" element={<UserOrders userData={userData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />} />
      </Routes>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {severityMessage}
        </Alert>
      </Snackbar>
    </BrowserRouter>
    
  );
}

export default App;
