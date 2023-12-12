import { BrowserRouter as Router, NavLink, Routes, Route, json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div style={{ width: "500px", height: "500px", backgroundColor: "#222224" }} className="container mt-5 pt-4 light-theme-text">
      <h3 className="text-center">Bejelentkezés</h3>
      <form className="container mt-3 mb-3 pt-4 p-4" style={{ width: "400px", height: "400px", backgroundColor: "#222224" }} data-bs-theme="dark">
        <div className="mb-4">
          <label htmlFor="loginEmailInput" className="form-label">Email cím</label>
          <input type="email" className="form-control" id="loginEmailInput" aria-describedby="emailHelp" />
        </div>
        <div className="mb-5">
          <label htmlFor="loginPasswordInput" className="form-label">Jelszó</label>
          <input type="password" className="form-control" id="loginPasswordInput" />
        </div>
        <button
          onClick={async (e) => {
            e.persist();
            e.preventDefault();
            var email = document.getElementById("loginEmailInput").value;
            var password = document.getElementById("loginPasswordInput").value;

            if (password != "" && email.includes("@") && email != "") {
              var postObject = {
                email: email,
                password: password
              };
              await axios.post("https://localhost:7165/webshop/auth/login", postObject)
                .then((res) => {
                  if (res.data.statusCode == 200) {
                    sessionStorage.setItem("userData", JSON.stringify(res.data.data))
                    navigate('/products');
                  } 
                });
            }
          }}
          className="btn button-secondary" type="submit">Bejelentkezés</button>
      </form>
    </div>
  );
}