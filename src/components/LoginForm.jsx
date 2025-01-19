import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginForm = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <div>You are logged in!</div>;
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <button onClick={() => loginWithRedirect()}>Login with Auth0</button>
    </div>
  );
};

export default LoginForm;
