import "./App.css";

import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Layout Components

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Message from "./components/Message";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/entrar" || location.pathname === "/cadastrar";
  return (
    <>
      <div className="overflow-hidden">
        {!hideLayout && <Navbar />}
        <Message />
        <Outlet />
        {!hideLayout && <Footer />}
      </div>
    </>
  );
}

export default App;
