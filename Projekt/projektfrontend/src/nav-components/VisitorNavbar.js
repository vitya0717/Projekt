import React from 'react'
import { Link } from 'react-router-dom'

const VisitorNavbar = ({currentLoginLevel, setLoginLevel}) => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
              <div className="container-fluid">
                   <Link to="/" className="navbar-brand">BazsiX</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
              </div>
      </nav>
  )
}

export default VisitorNavbar