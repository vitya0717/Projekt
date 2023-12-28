import { BrowserRouter as Router, NavLink, Routes, Route, json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Login({ setSeverityMessage, openAlert, setSeverity, currentLoginLevel, setLoginLevel }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Az effektus csak akkor fut le, ha a komponens mountolódik vagy a currentLoginLevel megváltozik
    if (currentLoginLevel !== 'Visitor') {
      navigate('/');
      setSeverity('warning');
      setSeverityMessage('Már be vagy jelentkezve!');
      openAlert();
    }
  }, [currentLoginLevel, navigate, setSeverity, setSeverityMessage, openAlert]);

  return currentLoginLevel === 'Visitor' ? (
    <div style={{ width: '500px', height: '500px', backgroundColor: '#222224' }} className="container mt-5 pt-4 light-theme-text">
      <h3 className="text-center">Bejelentkezés</h3>
      <form className="container mt-3 mb-3 pt-4 p-4" style={{ width: '400px', height: '400px', backgroundColor: '#222224' }} data-bs-theme="dark">
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
            var email = document.getElementById('loginEmailInput').value;
            var password = document.getElementById('loginPasswordInput').value;

            if (password !== '' && email.includes('@') && email !== '') {
              var postObject = {
                email: email,
                password: password
              };

              const res = await axios.post('https://localhost:7165/webshop/auth/login', postObject);

              if (res.data.statusCode !== 200) {
                setSeverity('error');
                setSeverityMessage(res.data.responseMessage);
                openAlert();
                return;

              } else {
                localStorage.setItem('token', res.data.data);
                var data = jwtDecode(localStorage.getItem('token'));
                setLoginLevel(data.role);
                setSeverity('success');
                setSeverityMessage(res.data.responseMessage);
                openAlert();
                navigate('/');
              }
            }
          }}
          className="btn button-secondary"
          type="submit"
        >
          Bejelentkezés
        </button>

        <p className="mt-4">Nincs fiókod? <NavLink to="/register">Regisztrálj</NavLink></p>

      </form>
    </div>
  ) : null;
}