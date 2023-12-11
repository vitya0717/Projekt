import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";

export default function Login() {
    return(
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
            <NavLink to={'/mainpage'} className="btn btn-secondary">
              <span>Bejelentkezés</span>
            </NavLink>
          </form>
        </div>
    );
}