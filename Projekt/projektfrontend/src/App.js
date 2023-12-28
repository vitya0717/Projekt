import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./function-components/Login";
import { jwtDecode } from "jwt-decode";
import HomePage from "./page-components/HomePage";
import Nav from "./nav-components/Nav";
import Logout from "./function-components/Logout";
import UserSettings from "./page-components/UserSettings";
import UserOrders from "./page-components/UserOrders";
import { Alert, Snackbar } from "@mui/material";
import Cart from "./page-components/Cart";
import Register from "./function-components/Register";
import OrderConfirmModal from "./function-components/OrderConfirmModal";



function App() {

  const ROLES = {
    Visitior: "Visitor",
    User: "User",
    Admin: "Admin",
  }

  const userData = localStorage.getItem("token");
  const [currentLoginLevel, setLoginLevel] = useState(userData === null ? ROLES.Visitior : ROLES[jwtDecode(userData).role]);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [severityMessage, setSeverityMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [count, setCounter] = useState(0);
  const [cart, setCart] = useState([]);

  const openAlert = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleCounter = () => {
    setCounter((a) => a+1);
  }

  useEffect(() => {
    if(userData) {
      setCart(JSON.parse(localStorage.getItem(`mycart-${jwtDecode(userData).userId}`)) || []);
    }
  },[count])

  return (
    <BrowserRouter>
      <Nav products={products} userData={userData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />
      <Routes>
        <Route path="/" element={<HomePage cart={cart} setCart={setCart} handleCounter={handleCounter} products={products} setProducts={setProducts} setSeverityMessage={setSeverityMessage} openAlert={openAlert} setSeverity={setSeverity} />} />
        <Route path="/login" element={<Login setSeverityMessage={setSeverityMessage} openAlert={openAlert} setSeverity={setSeverity} userData={userData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />} />
        <Route path="/register" element={<Register setSeverityMessage={setSeverityMessage} openAlert={openAlert} setSeverity={setSeverity} userData={userData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />} />
        <Route path="/logout" element={<Logout setSeverityMessage={setSeverityMessage} openAlert={openAlert} setSeverity={setSeverity} userData={userData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />} />
        <Route path="/settings" element={<UserSettings cart={cart} setCart={setCart} setSeverityMessage={setSeverityMessage} openAlert={openAlert} setSeverity={setSeverity} userData={userData} currentLoginLevel={currentLoginLevel} setLoginLevel={setLoginLevel} />} />
        <Route path="/orders" element={<UserOrders cart={cart} setCart={setCart} userData={userData} handleCounter={handleCounter} products={products} setProducts={setProducts} setSeverityMessage={setSeverityMessage} openAlert={openAlert} setSeverity={setSeverity} />} />
      </Routes>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {severityMessage}
        </Alert>
      </Snackbar>
      <Cart cart={cart} setCart={setCart} userData={userData} handleCounter={handleCounter} products={products} setProducts={setProducts} setSeverityMessage={setSeverityMessage} openAlert={openAlert} setSeverity={setSeverity} />
    </BrowserRouter>

  );
}

export default App;
