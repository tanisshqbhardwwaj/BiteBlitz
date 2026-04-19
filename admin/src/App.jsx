import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Login from "./components/Login/Login";
// import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const envUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const url = envUrl.endsWith("/") ? envUrl.slice(0, -1) : envUrl;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user has previously logged in during this session
    const authStatus = localStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // If not authenticated, only show the Login screen
  if (!isAuthenticated) {
    return (
      <>
        <ToastContainer />
        <Login setAuth={setIsAuthenticated} />
      </>
    );
  }

  // If authenticated, show the normal Admin Dashboard
  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />

        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
