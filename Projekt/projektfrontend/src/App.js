import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Products from "./Products";
import { jwtDecode } from "jwt-decode";

import AdminPage from "./AdminPage";
import UserPage from "./UserPage";
import HomePage from "./HomePage";
import Nav from "./Nav";


function App() {

  const ROLES = {
    Visitior: "Visitor",
    User: "User",
    Admin: "Admin",
    Hacker: "Hacker"
  }
  const userData = localStorage.getItem("token");

  const [currentLoginLevel, setLoginLevel] = useState(userData === null ? ROLES.Visitior : ROLES[jwtDecode(userData).role]);

  return (
    <BrowserRouter>
      {currentLoginLevel === "User" ?
        <Nav currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} /> : <div>csicska jacko</div>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />} />
        <Route path="/user" element={<UserPage currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />} />
        <Route path="/login" element={<Login currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
