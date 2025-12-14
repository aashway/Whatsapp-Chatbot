import React, { useState } from "react";
import api from "../api/axios";

export default function SendMessages() {
  const [campaignName, setCampaignName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const token = localStorage.getItem("token");

  const handleSend = async (e) => {
    e.preventDefault();

    if (!campaignName || !message) {
      alert("Campaign name and message required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/messages/send-bulk",
        { name: campaignName, message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResult(res.data);
      setCampaignName("");
      setMessage("");
    } catch (error) {
      alert(error.response?.data?.error || "Failed to send campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Create Campaign</h1>

      <form
        onSubmit={handleSend}
        className="bg-gray-800 p-6 rounded-lg space-y-4 w-1/2"
      >
        <input
          type="text"
          placeholder="Campaign Name"
          className="w-full p-3 bg-gray-700 rounded"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
        />

        <textarea
          className="w-full p-3 bg-gray-700 rounded"
          rows="5"
          placeholder="Campaign message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Sending..." : "Start Campaign"}
        </button>
      </form>

      {result && (
        <div className="bg-gray-800 mt-6 p-4 rounded-lg w-1/2">
          <h2 className="text-xl font-bold mb-2">Campaign Result</h2>
          <p>Campaign ID: {result.campaignId}</p>
          <p>Total Contacts: {result.totalContacts}</p>
          <p>Sent Count: {result.sentCount}</p>
        </div>
      )}
    </div>
  );
}
