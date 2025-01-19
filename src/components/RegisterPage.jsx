import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./LoginPage";

const RegisterForm = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="form-container">
      <h2>Login</h2>
      <button onClick={() => LoginPage()}>Login with Auth0</button>
      <br />
      <h2>Register</h2>
      <button onClick={() => loginWithRedirect({ screen_hint: "signup" })}>
        Register with Auth0
      </button>
    </div>
  );
};

export default RegisterForm;
