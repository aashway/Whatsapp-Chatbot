import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Conversations() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);

  const token = localStorage.getItem("token");

  // 🔄 Load conversations
  const loadConversations = async () => {
    try {
      const res = await api.get("/conversations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(res.data);

      // 🔁 keep selected contact updated
      if (selected) {
        const updated = res.data.find((c) => c.id === selected.id);
        if (updated) setSelected(updated);
      }
    } catch (err) {
      console.error("Failed to load conversations", err);
    }
  };

  // ⏱ Auto refresh every 5 seconds
  useEffect(() => {
    loadConversations();
    const interval = setInterval(loadConversations, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-white flex">
      {/* LEFT: Contacts */}
      <div className="w-1/3 border-r border-gray-700 overflow-y-auto">
        <h2 className="text-xl font-bold p-4 border-b border-gray-700">
          Contacts
        </h2>

        {contacts.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelected(c)}
            className={`p-4 cursor-pointer border-b border-gray-800 hover:bg-gray-800 ${
              selected?.id === c.id ? "bg-gray-800" : ""
            }`}
          >
            <div className="font-semibold">{c.name || "Unknown"}</div>
            <div className="text-sm text-gray-400">
              {c.countryCode} {c.phoneNumber}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: Chat */}
      <div className="w-2/3 flex flex-col">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a contact to view conversation
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-700 font-bold">
              {selected.name || "Unknown"} ({selected.phoneNumber})
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
              {selected.conversations.length === 0 && (
                <div className="text-gray-400">No messages yet</div>
              )}

              {selected.conversations.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white self-start"
                      : "bg-green-600 text-white self-end"
                  }`}
                >
                  <div className="text-xs opacity-70 mb-1">
                    {msg.role === "user" ? "Customer" : "Bot"}
                  </div>
                  {msg.message}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
