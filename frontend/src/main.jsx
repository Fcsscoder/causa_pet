import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Pages

import Login from "./components/pages/Auth/Login.jsx";
import Register from "./components/pages/Auth/Register.jsx";
import Home from "./components/pages/Home.jsx";
import Error from "./components/pages/Error.jsx";
import AboutUs from "./components/pages/AboutUs.jsx";
import Profile from "./components/pages/Profile.jsx";

// Contexts

import { UserProvider } from "./context/UserContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/entrar",
        element: <Login />,
      },
      {
        path: "/cadastrar",
        element: <Register />,
      },
      {
        path: "/quem-somos",
        element: <AboutUs />,
      },
      {
        path: "/usuario/perfil",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
