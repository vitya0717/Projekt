import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

const UserNavbar = ({ userData }) => {
    var user = userData === null ? null : jwtDecode(userData);
    useEffect(() => {
        var items = JSON.parse(localStorage.getItem(`mycart-${user.userId}`));
        if (items !== null) {
            if (document.getElementById("cartSize").classList.contains("visually-hidden") && items.length >= 1) {
                document.getElementById("cartSize").classList.remove("visually-hidden");
            } 

            if(!document.getElementById("cartSize").classList.contains("visually-hidden") && items.length === 0) {
                document.getElementById("cartSize").classList.add("visually-hidden");
            }

            document.getElementById("cartSize").innerText = items.length;
        }
    })
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand p-3 border-end">BazsiX</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarcontent" aria-controls="navbarcontent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarcontent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item p-3">
                            <Link to="/" className="nav-link"><i className="bi bi-house" /> Főoldal</Link>
                        </li>
                        <li className="nav-item p-3">
                            <Link data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" className="nav-link position-relative"> <i className="bi bi-basket2-fill" />
                                <span id='cartSize' className="visually-hidden position-absolute top-2 start-100 translate-middle badge rounded-pill bg-primary">
                                    0
                                </span>
                                Kosaram</Link>
                        </li>
                        <li className="nav-item p-3">
                            <Link to="/orders" className="nav-link"><i className="bi bi-cart4" /> Rendeléseim</Link>
                        </li>
                        <li className="nav-item p-3">
                            <Link to="/settings" className="nav-link"><i className="bi bi-gear" /> Profil beállítások</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className='nav-item p-3'>
                            <Link to="/logout" className="nav-link"><i className="bi bi-box-arrow-right" /> Kijelentkezés</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default UserNavbar