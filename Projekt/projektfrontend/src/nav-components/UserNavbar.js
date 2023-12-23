import React from 'react'
import { Link } from 'react-router-dom'

const UserNavbar = ({currentLoginLevel, setLoginLevel}) => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
              <div className="container-fluid">
                   <Link to="/" className="navbar-brand">Home</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                              <Link to="/user" className="nav-link">User page</Link>
                          </li>
                      </ul>
                  </div>
              </div>
              {currentLoginLevel}
      </nav>
  )
}

export default UserNavbar