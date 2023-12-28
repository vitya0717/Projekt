import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    return (
        <div style={{ width: "500px", height: "550px", backgroundColor: "#222224" }} className="container mt-5 pt-4 light-theme-text">
            <h3 className="text-center">Regisztráció</h3>
            <span className="d-block text-center">Feltételezzük, hogy minden adat megfelelő</span>
            <form
                className="container mt-3 mb-3 pt-4 p-4" style={{ width: "400px", height: "400px", backgroundColor: "#222224" }} data-bs-theme="dark">
                <div className="mb-4">
                    <label htmlFor="registerUsernameInput" className="form-label">Felhasználónév</label>
                    <input type="text" className="form-control" id="registerUsernameInput" aria-describedby="usernameHelp" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="registerEmailInput" className="form-label">Email cím</label>
                    <input type="email" className="form-control" id="registerEmailInput" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="registerPasswordInput" className="form-label">Jelszó</label>
                    <input type="password" className="form-control" id="registerPasswordInput" required />
                </div>
                <button
                    onClick={async (e) => {
                        e.persist();
                        e.preventDefault();
                        var username = document.getElementById("registerUsernameInput").value;
                        var password = document.getElementById("registerPasswordInput").value;
                        var email = document.getElementById("registerEmailInput").value;

                        if (username != "" && password != "" && email.includes("@") && email != "") {
                            var postObject = {
                                username: username,
                                password: password,
                                email: email
                            };
                            await axios.post("https://localhost:7165/webshop/auth/register", postObject)
                                .then((res) => {
                                    if (res.data.statusCode == 200) {
                                        navigate('/login');
                                    }
                                });
                        }
                    }} className="btn button-secondary" type="submit">Regisztráció</button>
            </form>
        </div>
    );
}