import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home"; // 不需要再去多寫 index.js

// ReactDOM 幫我們把寫好的東西放到畫面上
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
);