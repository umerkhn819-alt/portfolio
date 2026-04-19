import React from "react";
import ReactDOM from "react-dom/client";
import { registerGsapPlugins } from "./animations/gsapSetup";
import App from "./App.jsx";
import "./index.css";

registerGsapPlugins();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
