import React from "react";
import ReactDOM from "react-dom/client";
// Supports weights 200-800
import "@fontsource-variable/dosis";
import "@fontsource-variable/dosis/wght.css";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/metepecPokeTrainers">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
