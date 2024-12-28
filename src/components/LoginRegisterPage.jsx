import React, { useState } from "react";
import axios from "axios";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // Login API Call
        const response = await axios.post("http://localhost:3000/users/login", {
          username,
          password,
        });
        // Save token or handle login
        localStorage.setItem("authToken", response.data.token);
        alert("Login successful!");
        // Redirect to the homepage
        window.location.href = "/";
      } else {
        // Register API Call
        await axios.post("http://localhost:3000/users/register", {
          username,
          email,
          password,
        });
        alert("Registration successful! Please log in.");
        setIsLogin(true); // Switch to Login mode
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};
const fetchProtectedData = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    alert("Unauthorized! Please log in.");
    window.location.href = "/users/login";
    return;
  }

  try {
    const response = await axios.get("http://localhost:3000/protected-data", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default LoginRegisterPage;
