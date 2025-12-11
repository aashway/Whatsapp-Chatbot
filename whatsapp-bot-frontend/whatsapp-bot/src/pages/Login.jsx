import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
  if(localStorage.getItem("token")) {
    navigate("/dashboard");
  }
}, []);


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
localStorage.setItem("userEmail", email);


      navigate("/dashboard");  // directly navigate

    } catch (err) {
      console.log(err);
      // optionally show error inside UI later
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          className="w-full p-3 rounded bg-gray-700"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 rounded bg-gray-700"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded"
        >
          Login
        </button>

        <p className="text-center text-sm">
          Don't have an account?
          <a href="/register" className="text-blue-400 pl-2">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
