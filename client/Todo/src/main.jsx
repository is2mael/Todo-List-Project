import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import React from "react"; // Tambahkan baris ini

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Nvabar.jsx";
import CreateTodo from "./pages/Create Todo.jsx";
import Detail from "./pages/Detail.jsx";
import Edit from "./pages/Edit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
    <Navbar />,
    <Home />,
    </>
  },
  {
    path: "/create",
    element:
    <>
    <Navbar />,
    <CreateTodo />,
    </>
  },
  {
    path: "/detail/:id",
    element:
    <>
    <Navbar />,
    <Detail />,
    </>
  },
  {
    path: "/edit/:id",
    element:
    <>
    <Navbar />,
    <Edit />
    </>
  }
]);

createRoot(document.getElementById("root")).render(
  <>
  <RouterProvider router={router} />
  </>
  
);
