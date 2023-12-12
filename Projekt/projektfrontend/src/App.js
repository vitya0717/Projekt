import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import Login from "./Login";
import Register from "./Register";

function App() {
  var loggedInUser = JSON.parse(sessionStorage.getItem("userData"));
  const [reloadComponent, requestReloadComponent] = useState([]);
  useEffect(() => {
  }, [loggedInUser])
  if (loggedInUser != null) {
    return (
      <div>
        <Router>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li>
                  <NavLink id="productsNav" to={'/products'} className="nav-link">
                    <span className="nav-link">Termékek</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink style={{ right: "0px", position: "absolute" }} className="disabled nav-link">
                    <span className="nav-link">Köszöntelek, {loggedInUser.username}</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reg" element={<Register />} />
          </Routes>
        </Router>
      </div>
    );
  } else {
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
            <Route path="/login" element={<Login />} />
            <Route path="/reg" element={<Register />} />
          </Routes>
        </Router>
      </div>
    );
  }

}

export default App;
