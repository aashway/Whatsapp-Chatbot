import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const loadCampaigns = async () => {
    const res = await api.get("/campaigns", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCampaigns(res.data);
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  // CREATE campaign
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !message) return alert("Name & message required");

    try {
      setLoading(true);
      await api.post(
        "/campaigns",
        { name, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setName("");
      setMessage("");
      loadCampaigns();
    } catch (err) {
      alert("Campaign create failed");
    } finally {
      setLoading(false);
    }
  };

  // EXECUTE campaign
  const handleSend = async (id) => {
    try {
      await api.post(
        `/campaigns/${id}/send`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadCampaigns();
    } catch (err) {
      alert("Send failed");
    }
  };

  return (
    <div className="p-10 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Campaign Dashboard</h1>

      {/* CREATE CAMPAIGN */}
      <form
        onSubmit={handleCreate}
        className="bg-gray-800 p-5 rounded mb-8 w-1/2 space-y-4"
      >
        <h2 className="text-xl font-bold">Create Campaign</h2>

        <input
          className="w-full p-2 bg-gray-700 rounded"
          placeholder="Campaign Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full p-2 bg-gray-700 rounded"
          rows="4"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-green-600 px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Campaign"}
        </button>
      </form>

      {/* DASHBOARD */}
      <div className="space-y-4">
        {campaigns.map((c) => (
          <div key={c.id} className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-bold">{c.name}</h2>
            <p>Status: {c.status}</p>
            <p>Sent: {c.sentCount}/{c.totalContacts}</p>
            <p>Replies: {c.repliedCount}</p>
            <p>Converted: {c.convertedCount}</p>

            {c.status === "pending" && (
              <button
                onClick={() => handleSend(c.id)}
                className="mt-3 bg-blue-600 px-3 py-1 rounded"
              >
                Send Campaign
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
