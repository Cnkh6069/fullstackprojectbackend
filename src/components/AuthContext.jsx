// AuthContext.js
import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (userName, password) => {
    // Replace this with a real API call for authentication
    if (userName === "admin" && password === "password") {
      setIsAuthenticated(true);
      navigate("/"); // Redirect to home page on successful login
    } else {
      alert("Invalid credentials!");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
