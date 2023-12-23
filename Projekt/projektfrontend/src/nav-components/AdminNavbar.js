import React from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const AdminNavbar = ({ userData, currentLoginLevel, setLoginLevel }) => {
    var user = jwtDecode(userData);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
            <div className='container-fluid'>

                <Link to="/" className="navbar-brand">BazsiX</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link">Műveletek</Link>
                        </li>
                    </ul>
                    <div className='d-flex align-items-center dropstart'>
                        <ul className="navbar-nav navbar-light me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown ">
                                <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Fiókom
                                </button>
                                <ul className="dropdown-menu dropdown-menu-start">
                                    <span className='p-2'><i className="bi bi-person" /> Üdv, {user.name}</span>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className="nav-item">
                                        <Link to="/orders" className="nav-link p-2"><i className="bi bi-cart4" /> Rendeléseim</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/settings" className="nav-link p-2"><i className="bi bi-gear" /> Profil beállítások</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className="nav-item">
                                        <Link title='Kijelentkezés' to="/logout" className="nav-link p-2"><i className="bi bi-box-arrow-right" />  Kijelentkezés</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AdminNavbar