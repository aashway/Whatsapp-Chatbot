import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";


export default function App() {

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/" />;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
  path="/contacts"
  element={
    <ProtectedRoute>
      <Contacts />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}
