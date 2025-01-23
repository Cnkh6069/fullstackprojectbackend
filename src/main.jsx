import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
// require("dotenv").config();

// Access environment variables
const domain = import.meta.env.VITE_SOME_DOMAIN;
const clientId = import.meta.env.VITE_SOME_CLIENT_ID;

//Debugging: Ensure environment variables are loaded
console.log("Auth0 Domain:", domain);
console.log("Auth0 Client ID:", clientId);

// Render the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
