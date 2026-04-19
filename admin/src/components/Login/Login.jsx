import React, { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password === "admin") {
      localStorage.setItem("adminAuth", "true");
      setAuth(true);
      toast.success("Welcome to the Admin Dashboard!");
    } else {
      toast.error("Incorrect Password. Access Denied.");
      setPassword("");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2 className="admin-login-title">Admin Access</h2>
        <p className="admin-login-subtitle">Please enter your master password</p>
        <form onSubmit={onSubmitHandler} className="admin-login-form">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="admin-login-input"
            autoFocus
          />
          <button type="submit" className="admin-login-button">
            UNLOCK
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
