import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import SendMessages from "./pages/SendMessages";
import Conversations from "./pages/Conversations";
import ProtectedRoute from "./components/ProtectedRoute";
import Campaigns from "./pages/Campaigns";



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
        <Route path="/send" element={<SendMessages />} />
<Route
  path="/conversations"
  element={
    <ProtectedRoute>
      <Conversations />
    </ProtectedRoute>
  }
/>
<Route path="/campaigns" element={<Campaigns />} />
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
