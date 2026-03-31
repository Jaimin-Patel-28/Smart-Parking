import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Both are in src/app, so this is correct
import { BrowserRouter } from "react-router-dom";
import "./index.css"; // Move up one level to find index.css in src
import { AuthProvider } from "../Authentication-UI/Context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
