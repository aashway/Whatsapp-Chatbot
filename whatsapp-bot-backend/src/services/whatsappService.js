// src/services/whatsappService.js

import axios from "axios";

export const sendWhatsAppMessage = async (phoneNumber, message) => {
  try {
    const url = `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_ID}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "text",
      text: { body: message },
    };

    const headers = {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    };

    const res = await axios.post(url, payload, { headers });

    console.log("📩 Message sent:", phoneNumber, "->", message);

    return res.data;
  } catch (err) {
    console.error("❌ WhatsApp API Error:", err.response?.data || err.message);
    return null;
  }
};
