import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const [stats, setStats] = useState({
    totalContacts: 0,
    repliedContacts: 0,
    convertedContacts: 0,
    totalConversations: 0,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  async function loadStats() {
    const token = localStorage.getItem("token");

    try {
      const res = await api.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(res.data);
    } catch (error) {
      console.log("Dashboard stats error:", error);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* WELCOME */}
      <div className="text-lg mb-10">
        Welcome, <span className="font-bold text-blue-400">{email}</span> 👋
      </div>

      {/* DASHBOARD STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg text-gray-400">Total Contacts</h2>
          <p className="text-4xl font-bold">{stats.totalContacts}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg text-gray-400">Replied Contacts</h2>
          <p className="text-4xl font-bold">{stats.repliedContacts}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg text-gray-400">Converted Contacts</h2>
          <p className="text-4xl font-bold">{stats.convertedContacts}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg col-span-full">
          <h2 className="text-lg text-gray-400">Total Conversations</h2>
          <p className="text-4xl font-bold">{stats.totalConversations}</p>
        </div>

      </div>

      {/* BUTTONS */}
      <div className="flex gap-4">
        <a
          href="/contacts"
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Manage Contacts
        </a>

        <button
          onClick={() => navigate("/send")}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Send Messages
        </button>
        <button
  onClick={() => navigate("/conversations")}
  className="bg-purple-600 px-4 py-2 rounded mt-4"
>
  View Conversations
</button>
<button
  onClick={() => navigate("/campaigns")}
  className="bg-purple-600 px-4 py-2 rounded"
>
  Campaigns
</button>


      </div>

    </div>
  );
}
