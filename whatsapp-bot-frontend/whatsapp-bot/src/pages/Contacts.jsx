import React, { useState, useEffect } from "react";
import api from "../api/axios";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  async function loadContacts() {
    const token = localStorage.getItem("token");

    const res = await api.get("/contacts", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setContacts(res.data);
  }

  async function handleAddContact(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await api.post(
        "/contacts",
        { name, number },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setName("");
      setNumber("");
      loadContacts();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add contact");
    }
  }

  async function handleDelete(id) {
  console.log("deleting id:", id);   // 👈 add this

  const token = localStorage.getItem("token");

  await api.delete(`/contacts/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});


  loadContacts();
}


  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Contacts</h1>

      {/* ADD CONTACT FORM */}
      <form
        onSubmit={handleAddContact}
        className="bg-gray-800 p-4 rounded-lg space-y-3 mb-8"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 rounded bg-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="WhatsApp Number"
          className="w-full p-2 rounded bg-gray-700"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <button className="bg-blue-600 px-4 py-2 rounded">
          Add Contact
        </button>
      </form>

      {/* CONTACT LIST */}
      <div className="bg-gray-800 p-4 rounded-lg">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="flex justify-between border-b border-gray-700 py-2"
          >
            <span>{c.name || "-"} - {c.phoneNumber}</span>

            <button
              onClick={() => handleDelete(c.id)
}

              className="text-red-400 hover:text-red-200"
            >
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
