import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import Login from "./Login";
import Register from "./Register";
import Products from "./Products";

function App() {
  var loggedInUser = JSON.parse(sessionStorage.getItem("userData"));
  const [isLoggedIn, setLoggedIn] = useState();
  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink id="loginNav" to={`/login`} className="nav-link">
                  <span className="nav-link">Bejelentkezés</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink id="registerNav" to={`/reg`} className="nav-link">
                  <span className="nav-link">Regisztráció</span>
                </NavLink>
              </li>
              <li>
                <NavLink id="productsNav" to={'/products'} className="invisible nav-link">
                  <span className="nav-link">Termékek</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
