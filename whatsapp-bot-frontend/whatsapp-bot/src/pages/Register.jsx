import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // after successful register redirect to login
      navigate("/");

    } catch (err) {
      console.log(err.response?.data);
      // later we will add nice UI error messages
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          className="w-full p-3 rounded bg-gray-700"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          Register
        </button>

        <p className="text-center text-sm">
          Already registered?
          <a href="/" className="text-blue-400 pl-2">Login</a>
        </p>
      </form>
    </div>
  );
}
