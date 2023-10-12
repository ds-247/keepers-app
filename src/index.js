import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Panel from "./components/Panel";
import Login from "./components/SignIn";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Panel />
  </React.StrictMode>
);
