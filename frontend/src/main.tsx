import React from "react";
import ReactDOM from "react-dom/client";
import App from "./index.tsx";
import Bookshelf from "./bookshelf.tsx";
import "./index.css";
import AppBar from "./components/appbar.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router basename="/">
      <AppBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
