import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("token");
  
  if (userData !== null) {
    localStorage.removeItem("token");
  }
  useEffect(() => {
    setTimeout(() => {
        navigate("/");
        window.location.reload(false);
    }, 2000);
  }, [userData]);

  return (
    <div style={{ color: "green" }}>
      Sikeresen kijelentkeztél! Átirányítunk, ha nem irányít át, akkor kattints <Link to="/login">ide</Link>
    </div>
  );
};

export default Logout;