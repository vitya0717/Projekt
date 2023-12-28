import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Logout = ({ setSeverityMessage, openAlert, setSeverity, setLoginLevel }) => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("token");

  if (userData !== null) {
    localStorage.removeItem("token");
    console.log("Kijelentkezett");
  }
  useEffect(() => {
    navigate("/");
    setLoginLevel("Visitor");
    setSeverity("success");
    setSeverityMessage("Sikeresen kijelentkeztél!");
    openAlert();
  }, [userData]);

  return (
    <div style={{ color: "green" }}>
      Sikeresen kijelentkeztél! Átirányítunk, ha nem irányít át, akkor kattints <Link to="/login">ide</Link>
    </div>
  );
};

export default Logout;