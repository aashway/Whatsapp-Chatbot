import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="h-screen bg-gray-900 text-white p-10">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="text-lg">
        Welcome, <span className="font-bold text-blue-400">{email}</span> 👋
      </div>
<div className="mt-10">
  <a
    href="/contacts"
    className="bg-blue-600 px-4 py-2 rounded"
  >
    Manage Contacts
  </a>
</div>

    </div>
  );
}
