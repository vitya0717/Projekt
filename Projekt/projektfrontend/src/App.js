import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to={`/login`} className="nav-link">
                  <span className="nav-link">Bejelentkezés</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={`/reg`} className="nav-link">
                  <span className="nav-link">Regisztráció</span>
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

export default App;
